
'use client';

import * as React from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Film, Music, UploadCloud, X, Loader2, Image as ImageIcon, Video, ImagePlus, Ghost, RectangleHorizontal, RectangleVertical, Square, Play, Pause, Crown } from 'lucide-react';
import type { VisualLayer, OverlayLayer, RenderingStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import LayerCard from './layer-card';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';

type AspectRatio = '16:9' | '9:16' | '1:1';
type Resolution = '720p' | '1080p';

type LayerSelectorProps = {
  backgroundLayers: VisualLayer[];
  visualizerLayers: VisualLayer[];
  overlayLayers: OverlayLayer[];
  demosceneLayers: VisualLayer[];
  activeLayers: string[];
  onToggleLayer: (id: string) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadedFile: File | null;
  onClearFile: () => void;
  renderingStatus: RenderingStatus;
  onCustomFileChange: (event: ChangeEvent<HTMLInputElement>, type: 'bg-image' | 'bg-video' | 'logo' | 'sprite') => void;
  customBgImageFile: File | null;
  customBgVideoFile: File | null;
  customLogoFile: File | null;
  customSpriteFile: File | null;
  onClearCustomFile: (type: 'bg-image' | 'bg-video' | 'logo' | 'sprite') => void;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (value: AspectRatio) => void;
  resolution: Resolution;
  onResolutionChange: (value: Resolution) => void;
  className?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isPro: boolean;
  onUpgrade: () => void;
  isSubmitting: boolean;
  renderButton?: React.ReactNode;
  isMobile: boolean;
};


function LayerSelector({
  backgroundLayers,
  visualizerLayers,
  overlayLayers,
  demosceneLayers,
  activeLayers,
  onToggleLayer,
  onFileChange,
  uploadedFile,
  onClearFile,
  renderingStatus,
  onCustomFileChange,
  customBgImageFile,
  customBgVideoFile,
  customLogoFile,
  customSpriteFile,
  onClearCustomFile,
  aspectRatio,
  onAspectRatioChange,
  resolution,
  onResolutionChange,
  className,
  isPlaying,
  onTogglePlay,
  isPro,
  onUpgrade,
  isSubmitting,
  renderButton,
  isMobile,
}: LayerSelectorProps) {
  
  const isProcessing = renderingStatus === 'rendering' || renderingStatus === 'uploading' || isSubmitting;

  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4">
          <Accordion type="multiple" defaultValue={['format', 'audio-upload', 'custom']} className="w-full">
              <AccordionItem value="format">
                <div className="relative border-b">
                  <AccordionTrigger>Format</AccordionTrigger>
                  <div className="absolute right-12 top-1/2 -translate-y-1/2 -mt-2 z-10 pointer-events-none">
                    <span className="pointer-events-auto">
                      {renderButton}
                    </span>
                  </div>
                </div>
                <AccordionContent className="pt-4 space-y-4">
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground">Aspect Ratio</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAspectRatioChange('16:9')}
                          data-active={aspectRatio === '16:9'}
                          className="flex-col h-auto py-2 text-muted-foreground data-[active=true]:border-primary data-[active=true]:text-foreground"
                        >
                            <div className="flex items-center"><RectangleHorizontal className="mr-2 h-4 w-4" /> 16:9</div>
                            <span className="text-xs">Landscape</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAspectRatioChange('9:16')}
                          data-active={aspectRatio === '9:16'}
                          className="flex-col h-auto py-2 text-muted-foreground data-[active=true]:border-primary data-[active=true]:text-foreground"
                        >
                            <div className="flex items-center"><RectangleVertical className="mr-2 h-4 w-4" /> 9:16</div>
                            <span className="text-xs">Portrait</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAspectRatioChange('1:1')}
                          data-active={aspectRatio === '1:1'}
                          className="flex-col h-auto py-2 text-muted-foreground data-[active=true]:border-primary data-[active=true]:text-foreground"
                        >
                            <div className="flex items-center"><Square className="mr-2 h-4 w-4" /> 1:1</div>
                            <span className="text-xs">Square</span>
                        </Button>
                    </div>
                  </div>
                      <div>
                        <Label className="text-xs font-semibold text-muted-foreground">Resolution</Label>
                        <RadioGroup 
                            value={resolution} 
                            onValueChange={(val: string) => onResolutionChange(val as Resolution)} 
                            className="grid grid-cols-2 gap-2 mt-1.5"
                            disabled={isProcessing}
                        >
                            <div>
                                <RadioGroupItem value="720p" id="res-720" className="sr-only peer" />
                                <Label htmlFor="res-720" className="flex h-full flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
                                    <span className="font-bold text-sm">720p</span>
                                    <span className="text-xs text-muted-foreground">1280x720</span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="1080p" id="res-1080" className="sr-only peer" />
                                <Label 
                                    htmlFor="res-1080"
                                    className={cn(
                                        "relative flex h-full flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                                    )}
                                >
                                    <span className="font-bold text-sm">1080p</span>
                                    <span className="text-xs text-muted-foreground">
                                        1920x1080 (Full HD)
                                    </span>
                                </Label>
                            </div>
                        </RadioGroup>
                      </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="audio-upload">
                <AccordionTrigger>Upload Audio</AccordionTrigger>
                <AccordionContent className="pt-4">
                   {uploadedFile ? (
                      <div className="flex items-center justify-between gap-2 p-2.5 pl-4 rounded-md border text-sm bg-secondary/50">
                          <div className='flex items-center gap-3 truncate'>
                              <Music className="h-5 w-5 text-primary flex-shrink-0" />
                              <span className="truncate">{uploadedFile.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={onTogglePlay} className="h-7 w-7 flex-shrink-0" disabled={isProcessing}>
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={onClearFile} className="h-7 w-7 flex-shrink-0" disabled={isProcessing}>
                                <X className="h-4 w-4" />
                            </Button>
                          </div>
                      </div>
                  ) : (
                      <Label htmlFor="mp3-upload" className="relative block w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                              {renderingStatus === 'uploading' ? (
                                  <>
                                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                                      <span className='text-sm'>Uploading...</span>
                                  </>
                              ) : (
                                  <>
                                      <UploadCloud className="h-8 w-8" />
                                      <span className="mt-2 text-sm font-semibold">Click to upload MP3</span>
                                  </>
                              )}
                          </div>
                          <Input id="mp3-upload" type="file" className="sr-only" onChange={onFileChange} accept="audio/mpeg" disabled={isProcessing} />
                      </Label>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="backgrounds">
                  <AccordionTrigger>Backgrounds</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-3">
                      {backgroundLayers.map((layer) => (
                        <LayerCard 
                          key={layer.id}
                          layer={layer}
                          isSelected={activeLayers.includes(layer.id)}
                          onToggle={onToggleLayer}
                          isProcessing={isProcessing}
                        />
                      ))}
                    </div>
                  </AccordionContent>
              </AccordionItem>
              <AccordionItem value="visualizers">
                  <AccordionTrigger>Visualizers</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-3">
                      {visualizerLayers.map((layer) => (
                        <LayerCard 
                          key={layer.id}
                          layer={layer}
                          isSelected={activeLayers.includes(layer.id)}
                          onToggle={onToggleLayer}
                          isProcessing={isProcessing}
                        />
                      ))}
                    </div>
                  </AccordionContent>
              </AccordionItem>
              <AccordionItem value="demoscene">
                  <AccordionTrigger>Effects</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-3">
                      {demosceneLayers.map((layer) => (
                        <LayerCard 
                          key={layer.id}
                          layer={layer}
                          isSelected={activeLayers.includes(layer.id)}
                          onToggle={onToggleLayer}
                          isProcessing={isProcessing}
                        />
                      ))}
                    </div>
                  </AccordionContent>
              </AccordionItem>
              <AccordionItem value="overlays">
                  <AccordionTrigger>Overlays</AccordionTrigger>
                  <AccordionContent>
                      <div className="space-y-4">
                        {overlayLayers.map((overlay) => {
                          const isSelected = activeLayers.includes(overlay.id);
                          return (
                            <div key={overlay.id} className={cn("rounded-md p-3 transition-colors", isSelected ? 'bg-primary/10' : 'bg-secondary/30' )}>
                              <div className="flex items-center space-x-3">
                                <Checkbox id={overlay.id} checked={isSelected} onCheckedChange={() => onToggleLayer(overlay.id)} disabled={isProcessing} />
                                <Label htmlFor={overlay.id} className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                    {overlay.name}
                                </Label>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                  </AccordionContent>
              </AccordionItem>
               <AccordionItem value="custom">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-primary" />
                    Custom Assets
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bg-image-upload" className="text-xs font-semibold">Background Image</Label>
                      {customBgImageFile ? (
                        <div className="flex items-center justify-between gap-2 p-2 pl-3 mt-1 rounded-md border text-sm bg-secondary/50">
                          <div className='flex items-center gap-2 truncate'>
                            <ImageIcon className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="truncate text-xs">{customBgImageFile.name}</span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => onClearCustomFile('bg-image')} className="h-6 w-6 flex-shrink-0" disabled={isProcessing}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Label htmlFor="bg-image-upload" className="relative block w-full border border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors p-3 mt-1 text-center text-muted-foreground">
                          <span className="text-xs font-semibold">Click to upload Image</span>
                          <Input id="bg-image-upload" type="file" className="sr-only" onChange={(e) => onCustomFileChange(e, 'bg-image')} accept="image/*" disabled={isProcessing} />
                        </Label>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="bg-video-upload" className="text-xs font-semibold">Background Video</Label>
                      {customBgVideoFile ? (
                        <div className="flex items-center justify-between gap-2 p-2 pl-3 mt-1 rounded-md border text-sm bg-secondary/50">
                          <div className='flex items-center gap-2 truncate'>
                            <Video className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="truncate text-xs">{customBgVideoFile.name}</span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => onClearCustomFile('bg-video')} className="h-6 w-6 flex-shrink-0" disabled={isProcessing}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Label htmlFor="bg-video-upload" className="relative block w-full border border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors p-3 mt-1 text-center text-muted-foreground">
                          <span className="text-xs font-semibold">Click to upload MP4</span>
                          <Input id="bg-video-upload" type="file" className="sr-only" onChange={(e) => onCustomFileChange(e, 'bg-video')} accept="video/mp4" disabled={isProcessing} />
                        </Label>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="logo-upload" className="text-xs font-semibold">Overlay Logo</Label>
                      {customLogoFile ? (
                        <div className="flex items-center justify-between gap-2 p-2 pl-3 mt-1 rounded-md border text-sm bg-secondary/50">
                          <div className='flex items-center gap-2 truncate'>
                            <ImagePlus className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="truncate text-xs">{customLogoFile.name}</span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => onClearCustomFile('logo')} className="h-6 w-6 flex-shrink-0" disabled={isProcessing}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Label htmlFor="logo-upload" className="relative block w-full border border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors p-3 mt-1 text-center text-muted-foreground">
                          <span className="text-xs font-semibold">Click to upload Logo</span>
                          <Input id="logo-upload" type="file" className="sr-only" onChange={(e) => onCustomFileChange(e, 'logo')} accept="image/png, image/jpeg, image/svg+xml" disabled={isProcessing} />
                        </Label>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="sprite-upload" className="text-xs font-semibold">Sprite Animation</Label>
                      {customSpriteFile ? (
                        <div className="flex items-center justify-between gap-2 p-2 pl-3 mt-1 rounded-md border text-sm bg-secondary/50">
                          <div className='flex items-center gap-2 truncate'>
                            <Ghost className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="truncate text-xs">{customSpriteFile.name}</span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => onClearCustomFile('sprite')} className="h-6 w-6 flex-shrink-0" disabled={isProcessing}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Label htmlFor="sprite-upload" className="relative block w-full border border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors p-3 mt-1 text-center text-muted-foreground">
                          <span className="text-xs font-semibold">Click to upload PNG</span>
                          <Input id="sprite-upload" type="file" className="sr-only" onChange={(e) => onCustomFileChange(e, 'sprite')} accept="image/png" disabled={isProcessing} />
                        </Label>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </Card>
  );
}

export default React.memo(LayerSelector);
    



