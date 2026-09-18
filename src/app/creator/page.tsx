
'use client';

import { useState, type ChangeEvent, useCallback, memo, lazy, Suspense, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import LayerSelector from '@/components/synth/layer-selector';
import type { RenderingStatus, EffectConfigs, ProjectConfiguration, VisualizationProject, LayerTransform } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { 
  backgroundLayers, 
  visualizerLayers, 
  demosceneLayers, 
  overlayLayers, 
  customLayers, 
  initialEffectConfigs 
} from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Film, Loader2 } from 'lucide-react';
import ProjectManager from '@/components/synth/project-manager';

const VisualPreview = lazy(() => import('@/components/synth/visual-preview'));
const LayerSettings = lazy(() => import('@/components/synth/layer-settings'));

const PreviewSkeleton = () => <Skeleton className="w-full aspect-video" />;
const ControlsSkeleton = () => <Skeleton className="w-full h-full rounded-lg" />;

type AspectRatio = '16:9' | '9:16' | '1:1';
type Resolution = '720p' | '1080p';

function CreatorPage() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const router = useRouter();
  
  const [renderingStatus, setRenderingStatus] = useState<RenderingStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const [activeLayers, setActiveLayers] = useState<string[]>([]);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [resolution, setResolution] = useState<Resolution>('720p');

  const [customBgImage, setCustomBgImage] = useState<{file: File, url: string} | null>(null);
  const [customBgVideo, setCustomBgVideo] = useState<{file: File, url: string} | null>(null);
  const [customLogo, setCustomLogo] = useState<{file: File, url: string} | null>(null);
  const [customSprite, setCustomSprite] = useState<{file: File, url: string} | null>(null);

  const [effectConfigs, setEffectConfigs] = useState<EffectConfigs>(initialEffectConfigs);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const posterImage = PlaceHolderImages.find(img => img.id === 'final-video');

  // --- Project Save/Load Logic ---
  const [savedProjects, setSavedProjects] = useState<VisualizationProject[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('projects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  const handleSaveProject = useCallback(async (name: string) => {
    if (savedProjects.length >= 3) {
      toast({ title: "Save Slots Full", description: "Please delete a project to save a new one.", variant: "destructive" });
      return;
    }

    const configuration: ProjectConfiguration = {
      activeLayers,
      effectConfigs,
      aspectRatio,
      resolution,
    };

    const newProject: VisualizationProject = {
      id: Date.now().toString(),
      name: name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      configuration: JSON.stringify(configuration),
    };

    const updatedProjects = [...savedProjects, newProject];
    setSavedProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    toast({ title: "Project Saved!", description: `"${name}" has been saved.` });
  }, [activeLayers, effectConfigs, aspectRatio, resolution, savedProjects, toast]);

  const handleLoadProject = useCallback((project: VisualizationProject) => {
    try {
      const configuration: ProjectConfiguration = JSON.parse(project.configuration);
      setActiveLayers(configuration.activeLayers);
      setEffectConfigs(configuration.effectConfigs);
      setAspectRatio(configuration.aspectRatio);
      setResolution(configuration.resolution || '720p');
      toast({ title: "Project Loaded", description: `"${project.name}" has been loaded into the editor.` });
    } catch (e) {
      console.error("Failed to load project", e);
      toast({ title: "Load Failed", description: "The project data seems to be corrupted.", variant: "destructive"});
    }
  }, [toast]);

  const handleDeleteProject = useCallback((projectId: string) => {
    const updatedProjects = savedProjects.filter(p => p.id !== projectId);
    setSavedProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    toast({ title: "Project Deleted", description: "The project has been removed." });
  }, [savedProjects, toast]);
  // --- End Project Logic ---

  useEffect(() => {
    if (uploadedFile) {
        const audio = new Audio(URL.createObjectURL(uploadedFile));
        audioRef.current = audio;
        setAudioElement(audio);
        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => setIsPlaying(false);

        // Cleanup function
        return () => {
            audio.pause();
            URL.revokeObjectURL(audio.src);
            audioRef.current = null;
            setAudioElement(null);
            setIsPlaying(false);
        }
    } else {
        setAudioElement(null);
    }
  }, [uploadedFile]);

  const handleTogglePlay = useCallback(() => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        }
    }
  }, [isPlaying]);

  const handleAspectRatioChange = useCallback((value: AspectRatio) => {
    setAspectRatio(value);
  }, []);

  const handleResolutionChange = useCallback((value: Resolution) => {
    if (isMobile && value === '1080p') {
      toast({
        title: "Performance Warning",
        description: "1080p rendering on mobile devices can be slow and may cause issues. If you experience problems, please switch back to 720p.",
      });
    }
    setResolution(value);
  }, [isMobile, toast]);

  const handleToggleLayer = useCallback((layerId: string, force?: boolean) => {
    setActiveLayers(prev => {
        const isSelected = prev.includes(layerId);
        
        if (force === true) {
            return isSelected ? prev : [...prev, layerId];
        }
        if (force === false) {
            return isSelected ? prev.filter(id => id !== layerId) : prev;
        }
        // Toggle
        return isSelected ? prev.filter(id => id !== layerId) : [...prev, layerId];
    });
  }, []);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'audio/mpeg') {
      setUploadedFile(file);
      setRenderingStatus('ready');
      toast({
        title: "File Ready",
        description: `${file.name} is ready for visualization.`,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload an MP3 file.",
      })
    }
  }, [toast]);

  const clearFile = useCallback(() => {
    setUploadedFile(null);
    setFinalVideoUrl(null);
    setRenderingStatus('idle');
  }, []);

  const handleCustomFileChange = useCallback((event: ChangeEvent<HTMLInputElement>, type: 'bg-image' | 'bg-video' | 'logo' | 'sprite') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const payload = { file, url };

    if (type === 'bg-image') {
      setCustomBgImage(payload);
      handleToggleLayer('custom-bg-image', true);
      if (customBgVideo) {
        URL.revokeObjectURL(customBgVideo.url);
        setCustomBgVideo(null);
        handleToggleLayer('custom-bg-video', false);
      }
    } else if (type === 'bg-video') {
      setCustomBgVideo(payload);
      handleToggleLayer('custom-bg-video', true);
      if (customBgImage) {
        URL.revokeObjectURL(customBgImage.url);
        setCustomBgImage(null);
        handleToggleLayer('custom-bg-image', false);
      }
    } else if (type === 'logo') {
      setCustomLogo(payload);
      handleToggleLayer('custom-logo', true);
    } else if (type === 'sprite') {
        setCustomSprite(payload);
        handleToggleLayer('custom-sprite', true);
    }
     toast({
        title: "Asset Uploaded",
        description: `${file.name} is ready to be used.`,
      })
  }, [customBgImage, customBgVideo, handleToggleLayer, toast]);

  const handleClearCustomFile = useCallback((type: 'bg-image' | 'bg-video' | 'logo' | 'sprite') => {
    if (type === 'bg-image' && customBgImage) {
      URL.revokeObjectURL(customBgImage.url);
      setCustomBgImage(null);
      handleToggleLayer('custom-bg-image', false);
    } else if (type === 'bg-video' && customBgVideo) {
      URL.revokeObjectURL(customBgVideo.url);
      setCustomBgVideo(null);
      handleToggleLayer('custom-bg-video', false);
    } else if (type === 'logo' && customLogo) {
      URL.revokeObjectURL(customLogo.url);
      setCustomLogo(null);
      handleToggleLayer('custom-logo', false);
    } else if (type === 'sprite' && customSprite) {
        URL.revokeObjectURL(customSprite.url);
        setCustomSprite(null);
        handleToggleLayer('custom-sprite', false);
    }
  }, [customBgImage, customBgVideo, customLogo, customSprite, handleToggleLayer]);

  const isPro = true;

  const handleRender = useCallback(() => {
    if (!uploadedFile) {
      toast({
        variant: "destructive",
        title: "No Audio File",
        description: "Please upload an MP3 file before rendering.",
      })
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }
    // This is the key change to tear down the preview's audio context
    setAudioElement(null); 
    
    setRenderingStatus('rendering');
    setFinalVideoUrl(null);
  }, [uploadedFile, toast]);
  
  const handleRenderComplete = useCallback((videoUrl: string) => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    setFinalVideoUrl(videoUrl);
    setRenderingStatus('complete');
    const audio = new Audio('/sfx.wav');
    audio.play();
     toast({
        title: "Render Complete!",
        description: "Your video is ready for download.",
      });
  }, [toast]);

  const handleDownload = useCallback(async () => {
    if (!finalVideoUrl) {
        toast({
            variant: "destructive",
            title: "No video to download",
            description: "The video has not been generated yet.",
        });
        return;
    }

    toast({
        title: "Downloading...",
        description: "Your video will begin downloading shortly.",
    });

    try {
        const fetchRes = await fetch(finalVideoUrl);
        const blob = await fetchRes.blob();
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'synthsnap-video.mp4';
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Download failed:", error);
        toast({
            variant: "destructive",
            title: "Download Failed",
            description: "There was an issue downloading your video.",
        });
    }
  }, [finalVideoUrl, toast]);
  
  const handleReorderLayer = useCallback((index: number, direction: 'up' | 'down') => {
    setActiveLayers(prev => {
        const newLayers = [...prev];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newLayers.length) {
            return newLayers; // Can't move further
        }
        [newLayers[index], newLayers[targetIndex]] = [newLayers[targetIndex], newLayers[index]];
        return newLayers;
    });
  }, []);
  
  const handleConfigChange = useCallback(<K extends keyof EffectConfigs>(
    key: K,
    value: EffectConfigs[K]
  ) => {
    setEffectConfigs(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleColorChange = useCallback((layerId: string, color: string, index: number) => {
    setEffectConfigs(prev => {
      const newColors = [...(prev.colors[layerId] || [])];
      newColors[index] = color;
      return {
        ...prev,
        colors: {
          ...prev.colors,
          [layerId]: newColors,
        }
      }
    });
  }, []);
  
  const handleVisualizerTransformChange = useCallback((
    layerId: string,
    key: keyof LayerTransform,
    value: number
  ) => {
    setEffectConfigs((prev) => {
        const existingTransforms = prev.visualizerTransforms || {};
        const existingTransformForLayer = existingTransforms[layerId] || { size: 100, rotation: 0, offsetX: 0, offsetY: 0 };
        
        return { 
            ...prev, 
            visualizerTransforms: {
                ...existingTransforms,
                [layerId]: {
                    ...existingTransformForLayer,
                    [key]: value,
                }
            } 
        };
    });
  }, []);

  const handleUpgrade = useCallback(() => {
    router.push('/#pricing');
  }, [router]);

  const noEffectsSelected = activeLayers.length === 0 && !customBgImage && !customBgVideo && !customLogo;
  const isProcessing = renderingStatus === 'rendering' || renderingStatus === 'uploading' || isSubmitting;
  
  const renderButton = (
    <Button onClick={handleRender} disabled={!uploadedFile || isProcessing}>
        {isProcessing && renderingStatus === 'rendering' ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
            <Film className="mr-2 h-5 w-5" />
        )}
        Render Video
    </Button>
  );

  const visualPreviewComponent = (
    <Suspense fallback={<PreviewSkeleton />}>
      <VisualPreview 
        status={renderingStatus}
        onDownload={handleDownload}
        videoUrl={finalVideoUrl}
        posterUrl={posterImage?.imageUrl}
        finalVideoHint={posterImage?.imageHint}
        uploadedFile={uploadedFile}
        onRenderComplete={handleRenderComplete}
        activeLayers={activeLayers}
        noEffectsSelected={noEffectsSelected}
        effectConfigs={effectConfigs}
        customBgImageURL={customBgImage?.url}
        customBgVideoURL={customBgVideo?.url}
        customLogoURL={customLogo?.url}
        customSpriteURL={customSprite?.url}
        aspectRatio={aspectRatio}
        resolution={resolution}
        audioElement={audioElement}
        isPro={isPro}
      />
    </Suspense>
  );
  
  if (isMobile === undefined) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading creator studio...</p>
      </div>
    );
  }

  return (
    <div className="bg-background lg:h-screen lg:flex lg:flex-col">
      <Header 
        page="creator"
        mobilePreview={
          isMobile ? (
            <div className={cn(
              "w-full bg-card",
              aspectRatio === '16:9' && 'aspect-video',
              aspectRatio === '9:16' && 'aspect-[9/16]',
              aspectRatio === '1:1' && 'aspect-square'
            )}>
              {visualPreviewComponent}
            </div>
          ) : undefined
        }
      />
      
      <main className="w-full max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8 lg:flex-1 lg:overflow-hidden">
        <div className="h-full w-full lg:flex lg:flex-row lg:gap-8">
          
          {/* Left Column (Preview) */}
          <div className="hidden lg:flex lg:w-7/12 flex-col justify-center items-center">
            <div className="relative w-full h-full bg-card rounded-lg flex items-center justify-center">
                <div
                    className={cn(
                        "relative max-w-full max-h-full",
                        aspectRatio === '16:9' && 'aspect-video',
                        aspectRatio === '9:16' && 'aspect-[9/16]',
                        aspectRatio === '1:1' && 'aspect-square'
                    )}
                >
                    {visualPreviewComponent}
                </div>
            </div>
          </div>
          
          {/* Right Column (Controls) */}
          <div className="mt-8 lg:mt-0 lg:w-5/12 lg:flex lg:flex-col lg:min-h-0">
            <div className="flex-1 flex flex-col min-h-0 gap-4">
              <Tabs defaultValue="layers" className="flex flex-col flex-1 min-h-0 w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="layers">Layers</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                
                {/* Custom Tab Content implementation to keep components mounted */}
                <TabsContent value="layers" forceMount className="flex-1 mt-4 min-h-0 data-[state=inactive]:hidden">
                    <LayerSelector
                        backgroundLayers={backgroundLayers}
                        visualizerLayers={visualizerLayers}
                        overlayLayers={overlayLayers}
                        demosceneLayers={demosceneLayers}
                        activeLayers={activeLayers}
                        onToggleLayer={handleToggleLayer}
                        onFileChange={handleFileChange}
                        uploadedFile={uploadedFile}
                        onClearFile={clearFile}
                        renderingStatus={renderingStatus}
                        onCustomFileChange={handleCustomFileChange}
                        onClearCustomFile={handleClearCustomFile}
                        customBgImageFile={customBgImage?.file || null}
                        customBgVideoFile={customBgVideo?.file || null}
                        customLogoFile={customLogo?.file || null}
                        customSpriteFile={customSprite?.file || null}
                        aspectRatio={aspectRatio}
                        onAspectRatioChange={handleAspectRatioChange}
                        resolution={resolution}
                        onResolutionChange={handleResolutionChange}
                        className="h-full"
                        isPlaying={isPlaying}
                        onTogglePlay={handleTogglePlay}
                        isPro={isPro}
                        onUpgrade={handleUpgrade}
                        isSubmitting={isSubmitting}
                        renderButton={renderButton}
                        isMobile={isMobile}
                    />
                </TabsContent>
                <TabsContent value="settings" forceMount className="flex-1 mt-4 min-h-0 data-[state=inactive]:hidden">
                  <Suspense fallback={<ControlsSkeleton />}>
                      <LayerSettings
                          allLayers={[...backgroundLayers, ...visualizerLayers, ...overlayLayers, ...demosceneLayers, ...customLayers]}
                          activeLayers={activeLayers}
                          effectConfigs={effectConfigs}
                          onConfigChange={handleConfigChange}
                          onColorChange={handleColorChange}
                          onReorderLayer={handleReorderLayer}
                          onVisualizerTransformChange={handleVisualizerTransformChange}
                          isProcessing={isProcessing}
                          className="h-full"
                      />
                  </Suspense>
                </TabsContent>
                 <TabsContent value="projects" forceMount className="flex-1 mt-4 min-h-0 data-[state=inactive]:hidden">
                  <Suspense fallback={<ControlsSkeleton />}>
                    <ProjectManager 
                      isPro={isPro}
                      onUpgrade={handleUpgrade}
                      savedProjects={savedProjects ?? []}
                      onSaveProject={handleSaveProject}
                      onLoadProject={handleLoadProject}
                      onDeleteProject={handleDeleteProject}
                      isProcessing={isSubmitting}
                      className="h-full"
                    />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default memo(CreatorPage);
