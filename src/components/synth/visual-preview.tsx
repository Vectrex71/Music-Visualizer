
'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Music, Wand2 } from 'lucide-react';
import type { RenderingStatus, EffectConfigs, LayerProps, DrawFunction, LayerConfig } from '@/lib/types';
import { cn } from '@/lib/utils';
import { overlayLayers } from '@/lib/config';

type AspectRatio = '16:9' | '9:16' | '1:1';
type Resolution = '720p' | '1080p';

type VisualPreviewProps = {
  status: RenderingStatus;
  onDownload: () => void;
  onRenderComplete: (url: string) => void;
  uploadedFile: File | null;
  videoUrl?: string | null;
  posterUrl?: string;
  finalVideoHint?: string;
  activeLayers: string[];
  noEffectsSelected: boolean;
  effectConfigs: EffectConfigs;
  customBgImageURL?: string | null;
  customBgVideoURL?: string | null;
  customLogoURL?: string | null;
  customSpriteURL?: string | null;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  audioElement: HTMLAudioElement | null;
  isPro: boolean;
};

function VisualPreview({ 
  status, 
  onDownload,
  videoUrl, 
  posterUrl, 
  finalVideoHint,
  uploadedFile,
  onRenderComplete,
  activeLayers,
  noEffectsSelected,
  effectConfigs,
  customBgImageURL,
  customBgVideoURL,
  customLogoURL,
  customSpriteURL,
  aspectRatio,
  resolution,
  audioElement,
  isPro,
}: VisualPreviewProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const drawFunctionsRef = useRef<{ [key: string]: DrawFunction | null }>({});
  
  // Refs to hold the latest values for the animation loop without restarting it
  const activeLayersRef = useRef<string[]>(activeLayers);
  const effectConfigsRef = useRef<EffectConfigs>(effectConfigs);
  const layerConfigsRef = useRef<{ [key: string]: LayerConfig }>({});

  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const logoImageRef = useRef<HTMLImageElement | null>(null);
  const spriteImageRef = useRef<HTMLImageElement | null>(null);
  const watermarkLogoRef = useRef<HTMLImageElement | null>(null);

  const analyserRef = useRef<AnalyserNode | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 });

  // Update refs when props change
  useEffect(() => {
    activeLayersRef.current = activeLayers;
    effectConfigsRef.current = effectConfigs;
    
    // Pre-calculate layer-specific configs for the loop
    const { visualizerTransforms, ...restOfConfigs } = effectConfigs;
    const configs: { [key: string]: LayerConfig } = {};
    activeLayers.forEach(layerId => {
        configs[layerId] = {
            ...restOfConfigs,
            visualizerTransform: visualizerTransforms?.[layerId],
        };
    });
    layerConfigsRef.current = configs;
  }, [activeLayers, effectConfigs]);

  useEffect(() => {
    const baseWidth720 = 1280;
    const baseHeight720 = 720;
    const squareDim720 = 720;

    const baseWidth1080 = 1920;
    const baseHeight1080 = 1080;
    const squareDim1080 = 1080;

    // Default to 720p, only use 1080p if explicitly set AND user is pro
    const use1080p = resolution === '1080p' && isPro;

    const baseWidth = use1080p ? baseWidth1080 : baseWidth720;
    const baseHeight = use1080p ? baseHeight1080 : baseHeight720;
    const squareDim = use1080p ? squareDim1080 : squareDim720;


    if (aspectRatio === '16:9') {
        setCanvasSize({ width: baseWidth, height: baseHeight });
    } else if (aspectRatio === '9:16') {
        setCanvasSize({ width: baseHeight, height: baseWidth });
    } else if (aspectRatio === '1:1') {
        setCanvasSize({ width: squareDim, height: squareDim });
    }
  }, [aspectRatio, resolution, isPro]);

  // Performance: Pre-calculate layer-specific configs only when needed.
  const layerConfigs = useMemo(() => {
    const { visualizerTransforms, ...restOfConfigs } = effectConfigs;
    const configs: { [key: string]: LayerConfig } = {};
    activeLayers.forEach(layerId => {
        configs[layerId] = {
            ...restOfConfigs,
            visualizerTransform: visualizerTransforms?.[layerId],
        };
    });
    return configs;
  }, [effectConfigs, activeLayers]);

  // Effect to load drawing functions on demand
  useEffect(() => {
    const loadDrawFunction = async (layerId: string) => {
      if (drawFunctionsRef.current[layerId] !== undefined) return;

      drawFunctionsRef.current[layerId] = null; // Mark as loading/failed initially

      try {
        let module: { [key: string]: DrawFunction };
        switch (layerId) {
          case 'neon-grid': module = await import('@/lib/visual-layers/drawNeonGrid'); drawFunctionsRef.current[layerId] = module.drawNeonGrid; break;
          case 'starfield': module = await import('@/lib/visual-layers/drawStarfield'); drawFunctionsRef.current[layerId] = module.drawStarfield; break;
          case 'plasma': module = await import('@/lib/visual-layers/drawLavaLamp'); drawFunctionsRef.current[layerId] = module.drawLavaLamp; break;
          case 'tunnel': module = await import('@/lib/visual-layers/drawTunnel'); drawFunctionsRef.current[layerId] = module.drawTunnel; break;
          case 'matrix': module = await import('@/lib/visual-layers/drawMatrix'); drawFunctionsRef.current[layerId] = module.drawMatrix; break;
          case 'lissajous': module = await import('@/lib/visual-layers/drawLissajous'); drawFunctionsRef.current[layerId] = module.drawLissajous; break;
          case 'waveform': module = await import('@/lib/visual-layers/drawWaveform'); drawFunctionsRef.current[layerId] = module.drawWaveform; break;
          case 'spectrum': module = await import('@/lib/visual-layers/drawSpectrumBars'); drawFunctionsRef.current[layerId] = module.drawSpectrumBars; break;
          case 'pulsing': module = await import('@/lib/visual-layers/drawPulsingEffect'); drawFunctionsRef.current[layerId] = module.drawPulsingEffect; break;
          case 'circular-spectrum': module = await import('@/lib/visual-layers/drawCircularSpectrum'); drawFunctionsRef.current[layerId] = module.drawCircularSpectrum; break;
          case 'particles': module = await import('@/lib/visual-layers/drawParticleExplosions'); drawFunctionsRef.current[layerId] = module.drawParticleExplosions; break;
          case 'spirograph': module = await import('@/lib/visual-layers/drawSpirograph'); drawFunctionsRef.current[layerId] = module.drawSpirograph; break;
          case 'scanlines': module = await import('@/lib/visual-layers/drawScanlines'); drawFunctionsRef.current[layerId] = module.drawScanlines; break;
          case 'vhs-noise': module = await import('@/lib/visual-layers/drawVhsNoise'); drawFunctionsRef.current[layerId] = module.drawVhsNoise; break;
          case 'water-ripples': module = await import('@/lib/visual-layers/drawWaterRipples'); drawFunctionsRef.current[layerId] = module.drawWaterRipples; break;
          case 'text-scroller': module = await import('@/lib/visual-layers/drawTextScroller'); drawFunctionsRef.current[layerId] = module.drawTextScroller; break;
          case 'vignette': module = await import('@/lib/visual-layers/drawVignette'); drawFunctionsRef.current[layerId] = module.drawVignette; break;
          case 'copper-bars': module = await import('@/lib/visual-layers/drawCopperBars'); drawFunctionsRef.current[layerId] = module.drawCopperBars; break;
          case 'solid-cubes': module = await import('@/lib/visual-layers/drawSolidCubes'); drawFunctionsRef.current[layerId] = module.drawSolidCubes; break;
          case 'glenz-vectors': module = await import('@/lib/visual-layers/drawGlenzVectors'); drawFunctionsRef.current[layerId] = module.drawGlenzVectors; break;
          case 'checkerboard': module = await import('@/lib/visual-layers/drawCheckerboard'); drawFunctionsRef.current[layerId] = module.drawCheckerboard; break;
          case 'torus': module = await import('@/lib/visual-layers/drawTorus'); drawFunctionsRef.current[layerId] = module.drawTorus; break;
          case 'boids': module = await import('@/lib/visual-layers/drawBoidsFlocking'); drawFunctionsRef.current[layerId] = module.drawBoidsFlocking; break;
          case 'custom-bg-image': module = await import('@/lib/visual-layers/drawCustomImage'); drawFunctionsRef.current[layerId] = module.drawCustomImage; break;
          case 'custom-bg-video': module = await import('@/lib/visual-layers/drawCustomVideo'); drawFunctionsRef.current[layerId] = module.drawCustomVideo; break;
          case 'custom-logo': module = await import('@/lib/visual-layers/drawCustomLogo'); drawFunctionsRef.current[layerId] = module.drawCustomLogo; break;
          case 'wave-circle': module = await import('@/lib/visual-layers/drawWaveformCircle'); drawFunctionsRef.current[layerId] = module.drawWaveformCircle; break;
          case 'vector-ball': module = await import('@/lib/visual-layers/drawVectorBall'); drawFunctionsRef.current[layerId] = module.drawVectorBall; break;
          case 'strobe': module = await import('@/lib/visual-layers/drawStrobe'); drawFunctionsRef.current[layerId] = module.drawStrobe; break;
          case 'phyllotaxis': module = await import('@/lib/visual-layers/drawPhyllotaxis'); drawFunctionsRef.current[layerId] = module.drawPhyllotaxis; break;
          case 'polygonal-sphere': module = await import('@/lib/visual-layers/drawPolygonalSphere'); drawFunctionsRef.current[layerId] = module.drawPolygonalSphere; break;
          case 'flower-of-life': module = await import('@/lib/visual-layers/drawFlowerOfLife'); drawFunctionsRef.current[layerId] = module.drawFlowerOfLife; break;
          case 'text-particles': module = await import('@/lib/visual-layers/drawTextParticles'); drawFunctionsRef.current[layerId] = module.drawTextParticles; break;
          case 'greets': module = await import('@/lib/visual-layers/drawGreets'); drawFunctionsRef.current[layerId] = module.drawGreets; break;
          case 'film-grain': module = await import('@/lib/visual-layers/drawFilmGrain'); drawFunctionsRef.current[layerId] = module.drawFilmGrain; break;
          case 'crt-glitch': module = await import('@/lib/visual-layers/drawCrtGlitch'); drawFunctionsRef.current[layerId] = module.drawCrtGlitch; break;
          case 'custom-sprite': module = await import('@/lib/visual-layers/drawSpriteAnimation'); drawFunctionsRef.current[layerId] = module.drawSpriteAnimation; break;
          case 'reactive-text': module = await import('@/lib/visual-layers/drawReactiveText'); drawFunctionsRef.current[layerId] = module.drawReactiveText; break;
        }
      } catch (e) {
        console.error(`Failed to load layer module for ${layerId}:`, e);
      }
    };
    
    activeLayers.forEach(loadDrawFunction);

    // Cleanup: Remove drawing functions for layers that are no longer active
    // to free up memory and prevent potential residual lag.
    Object.keys(drawFunctionsRef.current).forEach(layerId => {
      if (!activeLayers.includes(layerId)) {
        delete drawFunctionsRef.current[layerId];
      }
    });

  }, [activeLayers]);


  // Initialize image elements on the client to prevent SSR errors
  useEffect(() => {
    if (!bgImageRef.current) {
        bgImageRef.current = new Image();
    }
    if (!logoImageRef.current) {
        logoImageRef.current = new Image();
    }
    if (!spriteImageRef.current) {
        spriteImageRef.current = new Image();
    }
    if (!watermarkLogoRef.current) {
        watermarkLogoRef.current = new Image();
        watermarkLogoRef.current.src = '/entertainerlogo.png';
    }
  }, []);

  useEffect(() => {
    if (customBgImageURL && bgImageRef.current) {
      bgImageRef.current.src = customBgImageURL;
    }
  }, [customBgImageURL]);

  useEffect(() => {
    if (customBgVideoURL) {
      if (!bgVideoRef.current) {
        bgVideoRef.current = document.createElement('video');
        bgVideoRef.current.loop = true;
        bgVideoRef.current.muted = true;
        bgVideoRef.current.playsInline = true;
      }
      bgVideoRef.current.src = customBgVideoURL;
      bgVideoRef.current.play().catch(e => console.error("Video play failed:", e));
    } else if (bgVideoRef.current) {
      bgVideoRef.current.pause();
      bgVideoRef.current.src = '';
    }
    return () => {
      if (bgVideoRef.current) {
        bgVideoRef.current.pause();
        bgVideoRef.current = null;
      }
    };
  }, [customBgVideoURL]);

  useEffect(() => {
    if (customLogoURL && logoImageRef.current) {
      logoImageRef.current.src = customLogoURL;
    }
  }, [customLogoURL]);
  
  useEffect(() => {
    if (customSpriteURL && spriteImageRef.current) {
      spriteImageRef.current.src = customSpriteURL;
    }
  }, [customSpriteURL]);

  // Setup Web Audio API for live preview
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let sourceNode: MediaElementAudioSourceNode | null = null;

    if (audioElement) {
        try {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            
            sourceNode = audioContext.createMediaElementSource(audioElement);
            sourceNode.connect(analyser);
            analyser.connect(audioContext.destination);

            analyserRef.current = analyser;
        } catch(e) {
            console.error("Error setting up live audio analysis:", e);
            analyserRef.current = null;
        }
    } else {
        analyserRef.current = null;
    }

    return () => {
        if (sourceNode) {
            sourceNode.disconnect();
        }
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
        }
        analyserRef.current = null;
    };
  }, [audioElement]);

  const drawWatermark = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (isPro || !watermarkLogoRef.current || watermarkLogoRef.current.naturalWidth === 0) {
        return;
    }

    const { width, height } = ctx.canvas;

    ctx.save();
    
    const logoHeight = 50; 
    const logoWidth = (watermarkLogoRef.current.naturalWidth / watermarkLogoRef.current.naturalHeight) * logoHeight;
    const FONT_SIZE = 24;
    
    ctx.font = `bold ${FONT_SIZE}px "Space Grotesk", sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textBaseline = 'middle';
    
    const text = "Music Visualizer";
    
    const padding = 20; 
    const spacing = 10;
    
    // Y position for bottom-left.
    const y = height - padding - (logoHeight / 2);

    // Draw Logo
    const logoX = padding;
    const logoY = y - (logoHeight / 2);
    ctx.drawImage(watermarkLogoRef.current, logoX, logoY, logoWidth, logoHeight);

    // Draw Text
    const textX = logoX + logoWidth + spacing;
    const textY = y;
    ctx.fillText(text, textX, textY);
    
    ctx.restore();
  }


  // EFFECT 1: Live Preview Animation
  useEffect(() => {
    if (status !== 'idle' && status !== 'ready') {
      return; 
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let frameCount = 0;
    let animationIsActive = true;
    const bufferLength = analyserRef.current ? analyserRef.current.frequencyBinCount : 128;
    const freqDataArray = new Uint8Array(bufferLength);
    const timeDataArray = new Uint8Array(bufferLength);

    const animate = () => {
      if (!animationIsActive) return;
      
      frameCount++;
      
      if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(freqDataArray);
          analyserRef.current.getByteTimeDomainData(timeDataArray);
      } else {
        // Generate synthetic audio data
        for (let i = 0; i < bufferLength; i++) {
          const timePhase = frameCount * 0.05;
          const freqPhase = frameCount * 0.02;
          timeDataArray[i] = 128 + Math.sin(i / 10 + timePhase) * 30;
          if (i < 5) {
              freqDataArray[i] = 180 + Math.sin(freqPhase * (i+1)) * 50 + (Math.random() * 25);
          } else {
              freqDataArray[i] = 30 + (Math.sin(i / 5 + freqPhase) * 20) + (Math.random() * 20);
          }
        }
      }

      const layerProps: Omit<LayerProps, 'config'> = {
        ctx,
        freqData: freqDataArray,
        timeData: timeDataArray,
        frameCount,
        width: canvas.width,
        height: canvas.height,
        customImageElement: bgImageRef.current,
        customVideoElement: bgVideoRef.current,
        customLogoElement: logoImageRef.current,
        customSpriteElement: spriteImageRef.current,
      };
      
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Use Refs to get the latest layers and configs without restarting the loop
      // Draw layers in specific order: Background -> Visualizer -> Demoscene -> Overlay
      // This ensures effects like CRT Glitch and Film Grain are applied on top of everything else.
      const sortedLayers = [...activeLayersRef.current].sort((a, b) => {
        const isOverlayA = overlayLayers.some(l => l.id === a);
        const isOverlayB = overlayLayers.some(l => l.id === b);
        if (isOverlayA && !isOverlayB) return 1;
        if (!isOverlayA && isOverlayB) return -1;
        return 0;
      });

      sortedLayers.forEach(layerId => {
        const drawFunc = drawFunctionsRef.current[layerId];
        if (drawFunc) {
          try {
            ctx.save();
            drawFunc({ ...layerProps, config: layerConfigsRef.current[layerId] });
          } catch (e) {
            console.error(`Error in layer ${layerId}:`, e);
          } finally {
            ctx.restore();
          }
        }
      });
      
      drawWatermark(ctx, frameCount);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      animationIsActive = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [status, canvasSize, audioElement, isPro]); // Reduced dependencies to prevent frequent restarts


  // EFFECT 2: Final Video Rendering
  useEffect(() => {
    if (status !== 'rendering' || !uploadedFile) {
      return;
    }
    
    // Aggressively stop the preview audio to free up resources.
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    let audioContext: AudioContext;
    let source: AudioBufferSourceNode;
    let animationIsActive = true;
    let mediaRecorder: MediaRecorder;

    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      try {
        audioContext = new AudioContext();
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        
        const freqDataArray = new Uint8Array(analyser.frequencyBinCount);
        const timeDataArray = new Uint8Array(analyser.frequencyBinCount);
        
        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        const audioDestination = audioContext.createMediaStreamDestination();
        source.connect(analyser);
        source.connect(audioDestination);
        
        const canvasStream = canvas.captureStream(30);
        const combinedStream = new MediaStream([
          ...canvasStream.getVideoTracks(),
          ...audioDestination.stream.getAudioTracks()
        ]);

        const recordedChunks: Blob[] = [];
        const bitrate = resolution === '1080p' ? 15000000 : 8000000;
        mediaRecorder = new MediaRecorder(combinedStream, {
          mimeType: 'video/mp4',
          videoBitsPerSecond: bitrate,
        });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) recordedChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/mp4' });
          const url = URL.createObjectURL(blob);
          onRenderComplete(url);
        };

        let frameCount = 0;
        
        const draw = () => {
          if (!animationIsActive) return;

          frameCount++;
          analyser.getByteFrequencyData(freqDataArray);
          analyser.getByteTimeDomainData(timeDataArray);
          
          const layerProps: Omit<LayerProps, 'config'> = {
            ctx,
            freqData: freqDataArray,
            timeData: timeDataArray,
            frameCount,
            width: canvas.width,
            height: canvas.height,
            customImageElement: bgImageRef.current,
            customVideoElement: bgVideoRef.current,
            customLogoElement: logoImageRef.current,
            customSpriteElement: spriteImageRef.current,
          };

          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const sortedLayers = [...activeLayers].sort((a, b) => {
              const isOverlayA = overlayLayers.some(l => l.id === a);
              const isOverlayB = overlayLayers.some(l => l.id === b);
              if (isOverlayA && !isOverlayB) return 1;
              if (!isOverlayA && isOverlayB) return -1;
              return 0;
          });

          sortedLayers.forEach(layerId => {
              const drawFunc = drawFunctionsRef.current[layerId];
              if (drawFunc) {
                  try {
                      ctx.save();
                      drawFunc({ ...layerProps, config: layerConfigs[layerId] });
                  } catch (e) {
                      console.error(`Error rendering layer "${layerId}":`, e);
                  } finally {
                      ctx.restore();
                  }
              }
          });
          
          drawWatermark(ctx, frameCount);

          animationFrameId.current = requestAnimationFrame(draw);
        };

        source.onended = () => {
          animationIsActive = false;
          if (mediaRecorder?.state === 'recording') mediaRecorder.stop();
          if (audioContext?.state !== 'closed') {
            setTimeout(() => { try { audioContext.close(); } catch(e) {} }, 500);
          }
        };
        
        mediaRecorder.start();
        source.start();
        draw();

      } catch (e) {
          console.error("Error setting up rendering pipeline:", e);
      }
    };

    render();

    return () => {
      animationIsActive = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (source?.buffer) try { source.stop(); } catch(e) {}
      if (mediaRecorder?.state === 'recording') try { mediaRecorder.stop(); } catch(e) {}
      if (audioContext && audioContext.state !== 'closed') try { audioContext.close(); } catch(e) {}
    };
  }, [status, uploadedFile, onRenderComplete, activeLayers, layerConfigs, customBgImageURL, customBgVideoURL, customLogoURL, customSpriteURL, isPro, audioElement, canvasSize]);

  // When the video is done, show the video player.
  if (status === 'complete' && videoUrl) {
    return (
      <div className="w-full h-full group relative bg-card rounded-lg overflow-hidden flex justify-center items-center">
        <video 
          src={videoUrl}
          poster={posterUrl}
          data-ai-hint={finalVideoHint}
          className="w-full h-full object-contain"
          controls
          autoPlay
          playsInline
        />
        <div className="absolute bottom-4 right-4">
          <Button onClick={onDownload} size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download Video
          </Button>
        </div>
      </div>
    );
  }
  
  // For all other states (idle, ready, rendering), show the live canvas with optional overlays.
  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden flex justify-center items-center bg-black">
      <canvas 
        ref={canvasRef} 
        width={canvasSize.width} 
        height={canvasSize.height} 
        className="max-w-full max-h-full"
      ></canvas>
      
      {/* Rendering indicator */}
      {status === 'rendering' && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center text-white pointer-events-none z-10 p-4">
           <img src="/wait.gif" alt="Rendering..." className="w-1/3 max-w-[150px] object-contain" />
           <p className="mt-4 text-xl font-semibold animate-pulse">Rendering Video...</p>
           <p className="mt-2 text-sm text-white/80 max-w-md">
             For performance reasons, the rendering process is silent.
             You can switch tabs, but <strong>please do not close this window</strong> until the process is complete. We&apos;ll notify you as soon as your video is ready.
           </p>
        </div>
      )}
      
      {/* Placeholder text when canvas is empty */}
      {(status === 'idle' || status === 'ready') && (
        <div className={cn(
          "absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 ease-in-out",
          noEffectsSelected ? "opacity-100" : "opacity-0",
          !noEffectsSelected && 'bg-transparent'
        )}>
          {status === 'idle' ? (
            <>
              <Wand2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">Your Canvas Awaits</h3>
              <p className="mt-1 text-sm text-muted-foreground">Upload an MP3 and select your visual layers to begin.</p>
            </>
          ) : (
            <>
              <Music className="mx-auto h-12 w-12 text-accent" />
              <h3 className="mt-4 text-lg font-medium text-foreground">Audio Ready</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Select your layers to see a live preview.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(VisualPreview);
