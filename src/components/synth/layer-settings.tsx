
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { VisualLayer, OverlayLayer, EffectConfigs, LayerTransform } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dices, ArrowUp, ArrowDown, Settings2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  neonGridConfigurableLayers,
  colorConfigurableLayers,
  textConfigurableLayers,
  directionConfigurableLayers,
  speedConfigurableLayers,
  plasmaConfigurableLayers,
  pulsingConfigurableLayers,
  copperExtraConfigurableLayers,
  solidCubesConfigurableLayers,
  torusConfigurableLayers,
  logoConfigurableLayers,
  spriteLayerConfigurableLayers,
  bgMediaConfigurableLayers,
  tunnelConfigurableLayers,
  matrixConfigurableLayers,
  scanlinesConfigurableLayers,
  ripplesConfigurableLayers,
  lissajousConfigurableLayers,
  vignetteConfigurableLayers,
  vectorBallConfigurableLayers,
  strobeConfigurableLayers,
  visualizerTransformableLayers,
  checkerboardConfigurableLayers,
  phyllotaxisConfigurableLayers,
  polygonalSphereConfigurableLayers,
  flowerOfLifeConfigurableLayers,
  textParticlesConfigurableLayers,
  starfieldConfigurableLayers,
  waveformConfigurableLayers,
  greetsConfigurableLayers,
  filmGrainConfigurableLayers,
  crtGlitchConfigurableLayers,
  reactiveTextConfigurableLayers,
  multiColorConfig,
  fontOptions,
  lissajousShapeOptions,
  vectorBallShapeOptions,
  polySphereShapeOptions
} from '@/lib/config';

type LayerSettingsPanelProps = {
  allLayers: (VisualLayer | OverlayLayer)[];
  activeLayers: string[];
  effectConfigs: EffectConfigs;
  onConfigChange: <K extends keyof EffectConfigs>(key: K, value: EffectConfigs[K]) => void;
  onColorChange: (layerId: string, color: string, index: number) => void;
  onReorderLayer: (index: number, direction: 'up' | 'down') => void;
  onVisualizerTransformChange: (layerId: string, key: keyof LayerTransform, value: number) => void;
  isProcessing: boolean;
  className?: string;
};


function LayerSettings({
  allLayers,
  activeLayers,
  effectConfigs,
  onConfigChange,
  onColorChange,
  onReorderLayer,
  onVisualizerTransformChange,
  isProcessing,
  className,
}: LayerSettingsPanelProps) {

  const hasSettingsForLayer = (layerId: string) => {
    return colorConfigurableLayers.includes(layerId) ||
           textConfigurableLayers.includes(layerId) ||
           directionConfigurableLayers.includes(layerId) ||
           speedConfigurableLayers.includes(layerId) ||
           plasmaConfigurableLayers.includes(layerId) ||
           pulsingConfigurableLayers.includes(layerId) ||
           copperExtraConfigurableLayers.includes(layerId) ||
           solidCubesConfigurableLayers.includes(layerId) ||
           torusConfigurableLayers.includes(layerId) ||
           logoConfigurableLayers.includes(layerId) ||
           spriteLayerConfigurableLayers.includes(layerId) ||
           bgMediaConfigurableLayers.includes(layerId) ||
           neonGridConfigurableLayers.includes(layerId) ||
           tunnelConfigurableLayers.includes(layerId) ||
           matrixConfigurableLayers.includes(layerId) ||
           scanlinesConfigurableLayers.includes(layerId) ||
           ripplesConfigurableLayers.includes(layerId) ||
           lissajousConfigurableLayers.includes(layerId) ||
           vignetteConfigurableLayers.includes(layerId) ||
           vectorBallConfigurableLayers.includes(layerId) ||
           strobeConfigurableLayers.includes(layerId) ||
           checkerboardConfigurableLayers.includes(layerId) ||
           phyllotaxisConfigurableLayers.includes(layerId) ||
           polygonalSphereConfigurableLayers.includes(layerId) ||
           flowerOfLifeConfigurableLayers.includes(layerId) ||
           starfieldConfigurableLayers.includes(layerId) ||
           waveformConfigurableLayers.includes(layerId) ||
           textParticlesConfigurableLayers.includes(layerId) ||
           greetsConfigurableLayers.includes(layerId) ||
           filmGrainConfigurableLayers.includes(layerId) ||
           crtGlitchConfigurableLayers.includes(layerId) ||
           reactiveTextConfigurableLayers.includes(layerId) ||
           visualizerTransformableLayers.includes(layerId);
  }

  if (activeLayers.length === 0) {
    return (
        <Card className={cn("flex h-full flex-col", className)}>
            <CardHeader>
                <CardTitle>Active Layers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <Settings2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 font-semibold">Select a layer</h3>
                    <p className="mt-1 text-sm">to configure it here.</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className={cn("flex h-full flex-col", className)}>
        <CardHeader>
            <CardTitle>Active Layers</CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 space-y-4">
            {activeLayers.map((layerId, index) => {
              const layer = allLayers.find(l => l.id === layerId);
              if (!layer) return null;

              const showSettings = hasSettingsForLayer(layerId);
              const isBgMediaSelected = bgMediaConfigurableLayers.includes(layerId);
              
              const isTransformable = visualizerTransformableLayers.includes(layerId);
              const transformConfig = isTransformable ? (effectConfigs.visualizerTransforms?.[layerId] || { size: 100, rotation: 0, offsetX: 0, offsetY: 0 }) : null;

              const maxSize = layer.id === 'vector-ball' ? 300 : 200;

              return (
                <div key={layer.id} className="space-y-4 rounded-lg border bg-background/30">
                  <div className="flex items-center justify-between p-4">
                      <h3 className="font-semibold text-lg">{layer.name}</h3>
                      <div className="flex items-center gap-1">
                          <Button
                              variant="ghost" size="icon"
                              onClick={() => onReorderLayer(index, 'up')}
                              disabled={index === 0 || isProcessing}
                              className="h-8 w-8"
                          >
                              <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                              variant="ghost" size="icon"
                              onClick={() => onReorderLayer(index, 'down')}
                              disabled={index === activeLayers.length - 1 || isProcessing}
                              className="h-8 w-8"
                          >
                              <ArrowDown className="h-4 w-4" />
                          </Button>
                      </div>
                  </div>
                    
                  {showSettings && (
                    <div className="px-4 pb-4 pt-0 space-y-4 border-t [transform:translateZ(0)]">
                       {reactiveTextConfigurableLayers.includes(layer.id) && effectConfigs.reactiveTextConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="reactive-text-input">Text</Label>
                                <Input id="reactive-text-input" value={effectConfigs.reactiveTextConfig.text} onChange={(e) => onConfigChange('reactiveTextConfig', {...effectConfigs.reactiveTextConfig, text: e.target.value})} className="h-9" disabled={isProcessing} />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="reactive-text-font-select">Font Family</Label>
                                <Select value={effectConfigs.reactiveTextConfig.fontFamily} onValueChange={(value) => onConfigChange('reactiveTextConfig', {...effectConfigs.reactiveTextConfig, fontFamily: value})} disabled={isProcessing}>
                                  <SelectTrigger id="reactive-text-font-select"><SelectValue placeholder="Select a font" /></SelectTrigger>
                                  <SelectContent>{fontOptions.map(font => (<SelectItem key={font.value} value={font.value} style={{fontFamily: font.value}}>{font.label}</SelectItem>))}</SelectContent>
                                </Select>
                            </div>
                             <Separator/>
                              <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="reactive-text-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                                <Switch
                                    id="reactive-text-rainbow-switch"
                                    checked={effectConfigs.reactiveTextConfig.rainbow}
                                    onCheckedChange={(checked) => onConfigChange('reactiveTextConfig', {...effectConfigs.reactiveTextConfig, rainbow: checked})}
                                    disabled={isProcessing}
                                />
                              </div>
                          </div>
                       )}
                       {spriteLayerConfigurableLayers.includes(layer.id) && effectConfigs.spriteLayerConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="sprite-count-input">Anzahl</Label>
                                <div className="relative w-16">
                                    <Input id="sprite-count-input" type="number" className="w-full h-8 text-right" min={1} max={12} step={1} value={effectConfigs.spriteLayerConfig.count} onChange={(e) => { const val = parseInt(e.target.value); if (!isNaN(val)) { onConfigChange('spriteLayerConfig', { ...effectConfigs.spriteLayerConfig, count: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={1} max={12} step={1} value={[effectConfigs.spriteLayerConfig.count]} onValueChange={([val]) => onConfigChange('spriteLayerConfig', { ...effectConfigs.spriteLayerConfig, count: val })} disabled={isProcessing} />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="sprite-size-input">Grösse</Label>
                                <div className="relative w-16">
                                    <Input id="sprite-size-input" type="number" className="w-full h-8 pr-6 text-right" min={1} max={50} step={1} value={effectConfigs.spriteLayerConfig.size} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('spriteLayerConfig', { ...effectConfigs.spriteLayerConfig, size: val }) }}} disabled={isProcessing} />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider min={1} max={50} step={1} value={[effectConfigs.spriteLayerConfig.size]} onValueChange={([val]) => onConfigChange('spriteLayerConfig', { ...effectConfigs.spriteLayerConfig, size: val })} disabled={isProcessing} />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="sprite-speed-input">Geschwindigkeit</Label>
                                <div className="relative w-16">
                                    <Input id="sprite-speed-input" type="number" className="w-full h-8 text-right" min={0.1} max={10} step={0.1} value={effectConfigs.spriteLayerConfig.speed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('spriteLayerConfig', { ...effectConfigs.spriteLayerConfig, speed: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.1} max={10} step={0.1} value={[effectConfigs.spriteLayerConfig.speed]} onValueChange={([val]) => onConfigChange('spriteLayerConfig', { ...effectConfigs.spriteLayerConfig, speed: val })} disabled={isProcessing} />
                          </div>
                          <Separator/>
                           <div className="flex flex-col space-y-2 pt-2">
                              <Label>Bewegungsmodus</Label>
                              <RadioGroup value={effectConfigs.spriteLayerConfig.mode} onValueChange={(value) => onConfigChange('spriteLayerConfig', { ...effectConfigs.spriteLayerConfig, mode: value as any })} className="pt-1 space-y-2" disabled={isProcessing}>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="dvd-bounce" id={`sprite-mode-dvd`} /><Label htmlFor={`sprite-mode-dvd`} className="font-normal leading-none cursor-pointer">DVD Bounce</Label></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="hover" id={`sprite-mode-hover`} /><Label htmlFor={`sprite-mode-hover`} className="font-normal leading-none cursor-pointer">Hover</Label></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="left-right" id={`sprite-mode-lr`} /><Label htmlFor={`sprite-mode-lr`} className="font-normal leading-none cursor-pointer">Left to Right</Label></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="top-bottom" id={`sprite-mode-tb`} /><Label htmlFor={`sprite-mode-tb`} className="font-normal leading-none cursor-pointer">Top to Bottom</Label></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="zoom" id={`sprite-mode-zoom`} /><Label htmlFor={`sprite-mode-zoom`} className="font-normal leading-none cursor-pointer">Zoom</Label></div>
                              </RadioGroup>
                          </div>
                        </div>
                       )}
                       {phyllotaxisConfigurableLayers.includes(layer.id) && effectConfigs.phyllotaxisConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="phy-dotsize-input">Dot Size</Label>
                                <div className="relative w-16">
                                  <Input id="phy-dotsize-input" type="number" className="w-full h-8 text-right" min={0.5} max={10} step={0.1} value={effectConfigs.phyllotaxisConfig.dotSize} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('phyllotaxisConfig', { ...effectConfigs.phyllotaxisConfig, dotSize: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.5} max={10} step={0.1} value={[effectConfigs.phyllotaxisConfig.dotSize]} onValueChange={([val]) => onConfigChange('phyllotaxisConfig', { ...effectConfigs.phyllotaxisConfig, dotSize: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="phy-divergence-input">Divergence</Label>
                                <div className="relative w-16">
                                  <Input id="phy-divergence-input" type="number" className="w-full h-8 pr-6 text-right" min={137} max={138} step={0.01} value={effectConfigs.phyllotaxisConfig.divergence} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('phyllotaxisConfig', { ...effectConfigs.phyllotaxisConfig, divergence: val }) }}} disabled={isProcessing} />
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">°</span>
                                </div>
                              </div>
                              <Slider min={137} max={138} step={0.01} value={[effectConfigs.phyllotaxisConfig.divergence]} onValueChange={([val]) => onConfigChange('phyllotaxisConfig', { ...effectConfigs.phyllotaxisConfig, divergence: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="phy-speed-input">Speed</Label>
                                <div className="relative w-16">
                                  <Input id="phy-speed-input" type="number" className="w-full h-8 text-right" min={0.1} max={10} step={0.1} value={effectConfigs.phyllotaxisConfig.speed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('phyllotaxisConfig', { ...effectConfigs.phyllotaxisConfig, speed: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.1} max={10} step={0.1} value={[effectConfigs.phyllotaxisConfig.speed]} onValueChange={([val]) => onConfigChange('phyllotaxisConfig', { ...effectConfigs.phyllotaxisConfig, speed: val })} disabled={isProcessing} />
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="phy-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                                <Switch
                                    id="phy-rainbow-switch"
                                    checked={effectConfigs.phyllotaxisConfig.rainbow}
                                    onCheckedChange={(checked) => onConfigChange('phyllotaxisConfig', { ...effectConfigs.phyllotaxisConfig, rainbow: checked })}
                                    disabled={isProcessing}
                                />
                            </div>
                          </div>
                       )}

                       {polygonalSphereConfigurableLayers.includes(layer.id) && effectConfigs.polygonalSphereConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="poly-speed-input">Rotation Speed</Label>
                                <div className="relative w-16">
                                  <Input id="poly-speed-input" type="number" className="w-full h-8 text-right" min={0} max={5} step={0.1} value={effectConfigs.polygonalSphereConfig.rotationSpeed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('polygonalSphereConfig', { ...effectConfigs.polygonalSphereConfig, rotationSpeed: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0} max={5} step={0.1} value={[effectConfigs.polygonalSphereConfig.rotationSpeed]} onValueChange={([val]) => onConfigChange('polygonalSphereConfig', { ...effectConfigs.polygonalSphereConfig, rotationSpeed: val })} disabled={isProcessing} />
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Label htmlFor={`polysphere-shape-select-${layer.id}`}>Shape</Label>
                              <Select value={effectConfigs.polygonalSphereConfig.shape} onValueChange={(value: any) => onConfigChange('polygonalSphereConfig', {...effectConfigs.polygonalSphereConfig, shape: value})} disabled={isProcessing}>
                                <SelectTrigger id={`polysphere-shape-select-${layer.id}`}><SelectValue placeholder="Select a shape" /></SelectTrigger>
                                <SelectContent>{polySphereShapeOptions.map(shape => (<SelectItem key={shape.value} value={shape.value}>{shape.label}</SelectItem>))}</SelectContent>
                              </Select>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between pt-2">
                              <Label htmlFor="poly-wireframe-switch" className="cursor-pointer">Wireframe</Label>
                              <Switch id="poly-wireframe-switch" checked={effectConfigs.polygonalSphereConfig.wireframe} onCheckedChange={(checked) => onConfigChange('polygonalSphereConfig', { ...effectConfigs.polygonalSphereConfig, wireframe: checked })} disabled={isProcessing} />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="poly-rainbow-switch" className={cn("cursor-pointer", !effectConfigs.polygonalSphereConfig.wireframe && 'text-muted-foreground')}>Rainbow (Wireframe only)</Label>
                                <Switch 
                                    id="poly-rainbow-switch" 
                                    checked={effectConfigs.polygonalSphereConfig.rainbow} 
                                    onCheckedChange={(checked) => onConfigChange('polygonalSphereConfig', { ...effectConfigs.polygonalSphereConfig, rainbow: checked })} 
                                    disabled={isProcessing || !effectConfigs.polygonalSphereConfig.wireframe}
                                />
                            </div>
                          </div>
                       )}

                       {flowerOfLifeConfigurableLayers.includes(layer.id) && effectConfigs.flowerOfLifeConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="fol-speed-input">Rotation Speed</Label>
                                <div className="relative w-16">
                                  <Input id="fol-speed-input" type="number" className="w-full h-8 text-right" min={-5} max={5} step={0.1} value={effectConfigs.flowerOfLifeConfig.rotationSpeed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('flowerOfLifeConfig', { ...effectConfigs.flowerOfLifeConfig, rotationSpeed: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={-5} max={5} step={0.1} value={[effectConfigs.flowerOfLifeConfig.rotationSpeed]} onValueChange={([val]) => onConfigChange('flowerOfLifeConfig', { ...effectConfigs.flowerOfLifeConfig, rotationSpeed: val })} disabled={isProcessing} />
                            </div>
                             <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="fol-linewidth-input">Line Width</Label>
                                <div className="relative w-16">
                                  <Input id="fol-linewidth-input" type="number" className="w-full h-8 text-right" min={0.5} max={10} step={0.1} value={effectConfigs.flowerOfLifeConfig.lineWidth} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('flowerOfLifeConfig', { ...effectConfigs.flowerOfLifeConfig, lineWidth: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.5} max={10} step={0.1} value={[effectConfigs.flowerOfLifeConfig.lineWidth]} onValueChange={([val]) => onConfigChange('flowerOfLifeConfig', { ...effectConfigs.flowerOfLifeConfig, lineWidth: val })} disabled={isProcessing} />
                            </div>
                             <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="fol-petals-input">Petal Count</Label>
                                <div className="relative w-16">
                                  <Input id="fol-petals-input" type="number" className="w-full h-8 text-right" min={3} max={12} step={1} value={effectConfigs.flowerOfLifeConfig.petalCount} onChange={(e) => { const val = parseInt(e.target.value); if (!isNaN(val)) { onConfigChange('flowerOfLifeConfig', { ...effectConfigs.flowerOfLifeConfig, petalCount: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={3} max={12} step={1} value={[effectConfigs.flowerOfLifeConfig.petalCount]} onValueChange={([val]) => onConfigChange('flowerOfLifeConfig', { ...effectConfigs.flowerOfLifeConfig, petalCount: val })} disabled={isProcessing} />
                            </div>
                             <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="fol-glow-input">Glow Intensity</Label>
                                <div className="relative w-16">
                                  <Input id="fol-glow-input" type="number" className="w-full h-8 text-right" min={0} max={50} step={1} value={effectConfigs.flowerOfLifeConfig.glowIntensity} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('flowerOfLifeConfig', { ...effectConfigs.flowerOfLifeConfig, glowIntensity: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0} max={50} step={1} value={[effectConfigs.flowerOfLifeConfig.glowIntensity]} onValueChange={([val]) => onConfigChange('flowerOfLifeConfig', { ...effectConfigs.flowerOfLifeConfig, glowIntensity: val })} disabled={isProcessing} />
                            </div>
                          </div>
                       )}

                       {starfieldConfigurableLayers.includes(layer.id) && effectConfigs.starfieldConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="star-speed-input">Speed</Label>
                                <div className="relative w-16">
                                  <Input id="star-speed-input" type="number" className="w-full h-8 text-right" min={0.1} max={10} step={0.1} value={effectConfigs.starfieldConfig.speed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, speed: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.1} max={10} step={0.1} value={[effectConfigs.starfieldConfig.speed]} onValueChange={([val]) => onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, speed: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="star-rotation-input">Rotation</Label>
                                <div className="relative w-16">
                                  <Input id="star-rotation-input" type="number" className="w-full h-8 pr-6 text-right" min={-180} max={180} step={1} value={effectConfigs.starfieldConfig.rotation} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, rotation: val }) }}} disabled={isProcessing} />
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">°</span>
                                </div>
                              </div>
                              <Slider min={-180} max={180} step={1} value={[effectConfigs.starfieldConfig.rotation]} onValueChange={([val]) => onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, rotation: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="star-size-input">Star Size</Label>
                                <div className="relative w-16">
                                  <Input id="star-size-input" type="number" className="w-full h-8 text-right" min={0.1} max={10} step={0.1} value={effectConfigs.starfieldConfig.starSize} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, starSize: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.1} max={10} step={0.1} value={[effectConfigs.starfieldConfig.starSize]} onValueChange={([val]) => onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, starSize: val })} disabled={isProcessing} />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="star-shape-select">Star Shape</Label>
                                <Select value={effectConfigs.starfieldConfig.shape} onValueChange={(value: any) => onConfigChange('starfieldConfig', {...effectConfigs.starfieldConfig, shape: value})} disabled={isProcessing}>
                                  <SelectTrigger id="star-shape-select"><SelectValue placeholder="Select a shape" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="point">Point (Circle)</SelectItem>
                                    <SelectItem value="square">Square</SelectItem>
                                    <SelectItem value="triangle">Triangle</SelectItem>
                                  </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="star-spread-x-input">Spread X (Width)</Label>
                                <div className="relative w-16">
                                  <Input id="star-spread-x-input" type="number" className="w-full h-8 pr-6 text-right" min={10} max={500} step={1} value={effectConfigs.starfieldConfig.spreadX} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, spreadX: val }) }}} disabled={isProcessing} />
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider min={10} max={500} step={1} value={[effectConfigs.starfieldConfig.spreadX]} onValueChange={([val]) => onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, spreadX: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="star-spread-y-input">Spread Y (Height)</Label>
                                <div className="relative w-16">
                                  <Input id="star-spread-y-input" type="number" className="w-full h-8 pr-6 text-right" min={10} max={500} step={1} value={effectConfigs.starfieldConfig.spreadY} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, spreadY: val }) }}} disabled={isProcessing} />
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider min={10} max={500} step={1} value={[effectConfigs.starfieldConfig.spreadY]} onValueChange={([val]) => onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, spreadY: val })} disabled={isProcessing} />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="star-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                                <Switch id="star-rainbow-switch" checked={effectConfigs.starfieldConfig.rainbow} onCheckedChange={(checked) => onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, rainbow: checked })} disabled={isProcessing} />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="star-reactive-switch" className="cursor-pointer">Music Reactive (Bass Jump)</Label>
                                <Switch id="star-reactive-switch" checked={effectConfigs.starfieldConfig.reactive} onCheckedChange={(checked) => onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, reactive: checked })} disabled={isProcessing} />
                            </div>
                            {effectConfigs.starfieldConfig.reactive && (
                              <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-center">
                                  <Label htmlFor="star-reactive-intensity-input">Reactive Intensity</Label>
                                  <div className="relative w-16">
                                      <Input id="star-reactive-intensity-input" type="number" className="w-full h-8 text-right" min={0} max={1} step={0.05} value={effectConfigs.starfieldConfig.reactiveSensitivity} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, reactiveSensitivity: val }) }}} disabled={isProcessing} />
                                  </div>
                                </div>
                                <Slider min={0} max={1} step={0.05} value={[effectConfigs.starfieldConfig.reactiveSensitivity]} onValueChange={([val]) => onConfigChange('starfieldConfig', { ...effectConfigs.starfieldConfig, reactiveSensitivity: val })} disabled={isProcessing} />
                              </div>
                            )}
                          </div>
                       )}

                       {textParticlesConfigurableLayers.includes(layer.id) && effectConfigs.textParticlesConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="text-particles-input">Text</Label>
                                <Input id="text-particles-input" value={effectConfigs.textParticlesConfig.text} onChange={(e) => onConfigChange('textParticlesConfig', {...effectConfigs.textParticlesConfig, text: e.target.value})} className="h-9" disabled={isProcessing} />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="text-particles-font-select">Font Family</Label>
                                <Select value={effectConfigs.textParticlesConfig.fontFamily} onValueChange={(value) => onConfigChange('textParticlesConfig', {...effectConfigs.textParticlesConfig, fontFamily: value})} disabled={isProcessing}>
                                  <SelectTrigger id="text-particles-font-select"><SelectValue placeholder="Select a font" /></SelectTrigger>
                                  <SelectContent>{fontOptions.map(font => (<SelectItem key={font.value} value={font.value} style={{fontFamily: font.value}}>{font.label}</SelectItem>))}</SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="text-particles-fontsize-input">Font Size</Label>
                                <div className="relative w-16">
                                    <Input id="text-particles-fontsize-input" type="number" className="w-full h-8 pr-6 text-right" min={12} max={128} step={1} value={effectConfigs.textParticlesConfig.fontSize} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, fontSize: val }) }}} disabled={isProcessing} />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">px</span>
                                </div>
                              </div>
                              <Slider min={12} max={128} step={1} value={[effectConfigs.textParticlesConfig.fontSize]} onValueChange={([val]) => onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, fontSize: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="text-particles-speed-input">Speed</Label>
                                <div className="relative w-16">
                                    <Input id="text-particles-speed-input" type="number" className="w-full h-8 text-right" min={0.1} max={10} step={0.1} value={effectConfigs.textParticlesConfig.speed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, speed: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.1} max={10} step={0.1} value={[effectConfigs.textParticlesConfig.speed]} onValueChange={([val]) => onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, speed: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="text-particles-spread-input">Spread (Origin Point)</Label>
                                <div className="relative w-16">
                                    <Input id="text-particles-spread-input" type="number" className="w-full h-8 pr-6 text-right" min={0} max={100} step={1} value={effectConfigs.textParticlesConfig.spread} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, spread: val }) }}} disabled={isProcessing} />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider min={0} max={100} step={1} value={[effectConfigs.textParticlesConfig.spread]} onValueChange={([val]) => onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, spread: val })} disabled={isProcessing} />
                              <p className="text-[10px] text-muted-foreground">0% = Single Point (Firework), 100% = Full Screen</p>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="text-particles-sensitivity-input">Music Sensitivity</Label>
                                <div className="relative w-16">
                                    <Input id="text-particles-sensitivity-input" type="number" className="w-full h-8 text-right" min={0} max={1} step={0.05} value={effectConfigs.textParticlesConfig.sensitivity} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, sensitivity: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0} max={1} step={0.05} value={[effectConfigs.textParticlesConfig.sensitivity]} onValueChange={([val]) => onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, sensitivity: val })} disabled={isProcessing} />
                              <p className="text-[10px] text-muted-foreground">Higher = more constant spraying</p>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="text-particles-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                                <Switch
                                    id="text-particles-rainbow-switch"
                                    checked={effectConfigs.textParticlesConfig.rainbow}
                                    onCheckedChange={(checked) => onConfigChange('textParticlesConfig', { ...effectConfigs.textParticlesConfig, rainbow: checked })}
                                    disabled={isProcessing}
                                />
                            </div>
                          </div>
                       )}

                       {waveformConfigurableLayers.includes(layer.id) && effectConfigs.waveformConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="waveform-amplitude-input">Intensity (Amplitude)</Label>
                                <div className="relative w-16">
                                  <Input id="waveform-amplitude-input" type="number" className="w-full h-8 text-right" min={0.1} max={3} step={0.1} value={effectConfigs.waveformConfig.amplitude} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('waveformConfig', { ...effectConfigs.waveformConfig, amplitude: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.1} max={3} step={0.1} value={[effectConfigs.waveformConfig.amplitude]} onValueChange={([val]) => onConfigChange('waveformConfig', { ...effectConfigs.waveformConfig, amplitude: val })} disabled={isProcessing} />
                            </div>
                          </div>
                       )}

                       {greetsConfigurableLayers.includes(layer.id) && effectConfigs.greetsConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="greets-text-input">Text (one line per entry)</Label>
                                <Textarea id="greets-text-input" value={effectConfigs.greetsConfig.textLines.join('\n')} onChange={(e) => onConfigChange('greetsConfig', {...effectConfigs.greetsConfig, textLines: e.target.value.split('\n')})} disabled={isProcessing} rows={3} />
                            </div>
                             <div className="flex flex-col space-y-2">
                                <Label htmlFor="greets-font-select">Font Family</Label>
                                <Select value={effectConfigs.greetsConfig.fontFamily} onValueChange={(value) => onConfigChange('greetsConfig', {...effectConfigs.greetsConfig, fontFamily: value})} disabled={isProcessing}>
                                  <SelectTrigger id="greets-font-select"><SelectValue placeholder="Select a font" /></SelectTrigger>
                                  <SelectContent>{fontOptions.map(font => (<SelectItem key={font.value} value={font.value} style={{fontFamily: font.value}}>{font.label}</SelectItem>))}</SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="greets-fontsize-input">Font Size</Label>
                                <div className="relative w-16">
                                    <Input id="greets-fontsize-input" type="number" className="w-full h-8 pr-6 text-right" min={10} max={72} step={1} value={effectConfigs.greetsConfig.fontSize} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('greetsConfig', { ...effectConfigs.greetsConfig, fontSize: val }) }}} disabled={isProcessing} />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">px</span>
                                </div>
                              </div>
                              <Slider min={10} max={72} step={1} value={[effectConfigs.greetsConfig.fontSize]} onValueChange={([val]) => onConfigChange('greetsConfig', { ...effectConfigs.greetsConfig, fontSize: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="greets-speed-input">Speed</Label>
                                <div className="relative w-16">
                                  <Input id="greets-speed-input" type="number" className="w-full h-8 text-right" min={0.1} max={10} step={0.1} value={effectConfigs.greetsConfig.speed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('greetsConfig', { ...effectConfigs.greetsConfig, speed: val }) }}} disabled={isProcessing} />
                                </div>
                              </div>
                              <Slider min={0.1} max={10} step={0.1} value={[effectConfigs.greetsConfig.speed]} onValueChange={([val]) => onConfigChange('greetsConfig', { ...effectConfigs.greetsConfig, speed: val })} disabled={isProcessing} />
                            </div>
                             <Separator/>
                              <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="greets-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                                <Switch id="greets-rainbow-switch" checked={effectConfigs.greetsConfig.rainbow} onCheckedChange={(checked) => onConfigChange('greetsConfig', { ...effectConfigs.greetsConfig, rainbow: checked })} disabled={isProcessing} />
                              </div>
                          </div>
                       )}

                       {filmGrainConfigurableLayers.includes(layer.id) && effectConfigs.filmGrainConfig && (
                         <div className="space-y-3 rounded-lg border p-4 mt-4">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="film-grain-intensity-input">Intensity</Label>
                              <div className="relative w-16">
                                <Input id="film-grain-intensity-input" type="number" className="w-full h-8 text-right" min={0} max={1} step={0.05} value={effectConfigs.filmGrainConfig.intensity} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('filmGrainConfig', { ...effectConfigs.filmGrainConfig, intensity: val }) }}} disabled={isProcessing} />
                              </div>
                            </div>
                            <Slider min={0} max={1} step={0.05} value={[effectConfigs.filmGrainConfig.intensity]} onValueChange={([val]) => onConfigChange('filmGrainConfig', { ...effectConfigs.filmGrainConfig, intensity: val })} disabled={isProcessing} />
                         </div>
                       )}

                       {crtGlitchConfigurableLayers.includes(layer.id) && effectConfigs.crtGlitchConfig && (
                         <div className="space-y-3 rounded-lg border p-4 mt-4">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="crt-glitch-intensity-input">Intensity</Label>
                              <div className="relative w-16">
                                <Input id="crt-glitch-intensity-input" type="number" className="w-full h-8 text-right" min={0} max={1} step={0.05} value={effectConfigs.crtGlitchConfig.intensity} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('crtGlitchConfig', { ...effectConfigs.crtGlitchConfig, intensity: val }) }}} disabled={isProcessing} />
                              </div>
                            </div>
                            <Slider min={0} max={1} step={0.05} value={[effectConfigs.crtGlitchConfig.intensity]} onValueChange={([val]) => onConfigChange('crtGlitchConfig', { ...effectConfigs.crtGlitchConfig, intensity: val })} disabled={isProcessing} />
                         </div>
                       )}
                       {strobeConfigurableLayers.includes(layer.id) && effectConfigs.strobeConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="flex flex-col space-y-2">
                                <Label>Mode</Label>
                                <RadioGroup
                                    value={effectConfigs.strobeConfig.mode}
                                    onValueChange={(value) => onConfigChange('strobeConfig', { ...effectConfigs.strobeConfig, mode: value as any })}
                                    className="pt-2 space-y-2"
                                    disabled={isProcessing}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="audio" id={`strobe-mode-audio-${layer.id}`} />
                                        <Label htmlFor={`strobe-mode-audio-${layer.id}`} className="font-normal leading-none cursor-pointer">Audio Reactive</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="timed" id={`strobe-mode-timed-${layer.id}`} />
                                        <Label htmlFor={`strobe-mode-timed-${layer.id}`} className="font-normal leading-none cursor-pointer">Timed</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {effectConfigs.strobeConfig.mode === 'audio' && (
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="strobe-threshold-input">Bass Threshold</Label>
                                        <div className="relative w-16">
                                            <Input
                                                id="strobe-threshold-input"
                                                type="number" className="w-full h-8 pr-6 text-right"
                                                min={0} max={100} step={1}
                                                value={effectConfigs.strobeConfig.bassThreshold}
                                                onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('strobeConfig', { ...effectConfigs.strobeConfig, bassThreshold: val }) }}}
                                                disabled={isProcessing}
                                            />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                        </div>
                                    </div>
                                    <Slider
                                        min={0} max={100} step={1}
                                        value={[effectConfigs.strobeConfig.bassThreshold]}
                                        onValueChange={([val]) => onConfigChange('strobeConfig', { ...effectConfigs.strobeConfig, bassThreshold: val })}
                                        disabled={isProcessing}
                                    />
                                </div>
                            )}
                            
                            {effectConfigs.strobeConfig.mode === 'timed' && (
                              <>
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="strobe-speed-input">Speed</Label>
                                        <div className="relative w-16">
                                            <Input
                                                id="strobe-speed-input"
                                                type="number" className="w-full h-8 pr-6 text-right"
                                                min={1} max={30} step={1}
                                                value={effectConfigs.strobeConfig.speed}
                                                onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('strobeConfig', { ...effectConfigs.strobeConfig, speed: val }) }}}
                                                disabled={isProcessing}
                                            />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">Hz</span>
                                        </div>
                                    </div>
                                    <Slider
                                        min={1} max={30} step={1}
                                        value={[effectConfigs.strobeConfig.speed]}
                                        onValueChange={([val]) => onConfigChange('strobeConfig', { ...effectConfigs.strobeConfig, speed: val })}
                                        disabled={isProcessing}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between pt-2">
                                    <Label htmlFor="strobe-random-switch" className="cursor-pointer">Random Interval</Label>
                                    <Switch
                                        id="strobe-random-switch"
                                        checked={effectConfigs.strobeConfig.randomInterval}
                                        onCheckedChange={(checked) => onConfigChange('strobeConfig', { ...effectConfigs.strobeConfig, randomInterval: checked })}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </>
                            )}
                        </div>
                       )}
                      {vignetteConfigurableLayers.includes(layer.id) && effectConfigs.vignetteConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="vignette-color">Color</Label>
                                <Input
                                    id="vignette-color"
                                    type="color"
                                    value={effectConfigs.vignetteConfig.color}
                                    onChange={(e) => onConfigChange('vignetteConfig', { ...effectConfigs.vignetteConfig, color: e.target.value })}
                                    className="h-8 w-14 p-0.5 cursor-pointer"
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="vignette-intensity-input">Intensity</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="vignette-intensity-input"
                                            type="number" className="w-full h-8 pr-6 text-right"
                                            min={0} max={100} step={1}
                                            value={effectConfigs.vignetteConfig.intensity}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('vignetteConfig', { ...effectConfigs.vignetteConfig, intensity: val }) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={0} max={100} step={1}
                                    value={[effectConfigs.vignetteConfig.intensity]}
                                    onValueChange={([val]) => onConfigChange('vignetteConfig', { ...effectConfigs.vignetteConfig, intensity: val })}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="vignette-size-input">Size</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="vignette-size-input"
                                            type="number" className="w-full h-8 pr-6 text-right"
                                            min={0} max={100} step={1}
                                            value={effectConfigs.vignetteConfig.size}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('vignetteConfig', { ...effectConfigs.vignetteConfig, size: val }) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={0} max={100} step={1}
                                    value={[effectConfigs.vignetteConfig.size]}
                                    onValueChange={([val]) => onConfigChange('vignetteConfig', { ...effectConfigs.vignetteConfig, size: val })}
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>
                      )}
                       {vectorBallConfigurableLayers.includes(layer.id) && effectConfigs.vectorBallConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="vectorball-speed-input">Rotation Speed</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="vectorball-speed-input"
                                            type="number" className="w-full h-8 text-right"
                                            min={0.1} max={5} step={0.1}
                                            value={effectConfigs.vectorBallConfig.rotationSpeed}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('vectorBallConfig', { ...effectConfigs.vectorBallConfig, rotationSpeed: val }) }}}
                                            disabled={isProcessing}
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={0.1} max={5} step={0.1}
                                    value={[effectConfigs.vectorBallConfig.rotationSpeed]}
                                    onValueChange={([val]) => onConfigChange('vectorBallConfig', { ...effectConfigs.vectorBallConfig, rotationSpeed: val })}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="vectorball-dotsize-input">Dot Size</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="vectorball-dotsize-input"
                                            type="number" className="w-full h-8 text-right"
                                            min={0.5} max={5} step={0.1}
                                            value={effectConfigs.vectorBallConfig.dotSize}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('vectorBallConfig', { ...effectConfigs.vectorBallConfig, dotSize: val }) }}}
                                            disabled={isProcessing}
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={0.5} max={5} step={0.1}
                                    value={[effectConfigs.vectorBallConfig.dotSize]}
                                    onValueChange={([val]) => onConfigChange('vectorBallConfig', { ...effectConfigs.vectorBallConfig, dotSize: val })}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor={`vectorball-shape-select-${layer.id}`}>Shape</Label>
                                <Select
                                    value={effectConfigs.vectorBallConfig.shape}
                                    onValueChange={(value: 'circle' | 'square' | 'triangle') => onConfigChange('vectorBallConfig', {...effectConfigs.vectorBallConfig, shape: value})}
                                    disabled={isProcessing}
                                >
                                    <SelectTrigger id={`vectorball-shape-select-${layer.id}`}>
                                        <SelectValue placeholder="Select a shape" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {vectorBallShapeOptions.map(shape => (
                                        <SelectItem key={shape.value} value={shape.value}>
                                            {shape.label}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="vectorball-reactive-switch" className="cursor-pointer">React to Music</Label>
                                <Switch
                                    id="vectorball-reactive-switch"
                                    checked={effectConfigs.vectorBallConfig.musicReactive}
                                    onCheckedChange={(checked) => onConfigChange('vectorBallConfig', { ...effectConfigs.vectorBallConfig, musicReactive: checked })}
                                    disabled={isProcessing}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="vectorball-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                                <Switch
                                    id="vectorball-rainbow-switch"
                                    checked={effectConfigs.vectorBallConfig.rainbow}
                                    onCheckedChange={(checked) => onConfigChange('vectorBallConfig', { ...effectConfigs.vectorBallConfig, rainbow: checked })}
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>
                      )}
                      {isTransformable && transformConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor={`${layer.id}-size-input`}>Size</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id={`${layer.id}-size-input`}
                                            type="number"
                                            className="w-full h-8 pr-6 text-right"
                                            min={10} max={maxSize} step={1}
                                            value={transformConfig.size}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onVisualizerTransformChange(layer.id, 'size', val) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={10} max={maxSize} step={1}
                                    value={[transformConfig.size]}
                                    onValueChange={([val]) => onVisualizerTransformChange(layer.id, 'size', val)}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor={`${layer.id}-rotation-input`}>Rotation</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id={`${layer.id}-rotation-input`}
                                            type="number"
                                            className="w-full h-8 pr-6 text-right"
                                            min={-360} max={360} step={1}
                                            value={transformConfig.rotation}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onVisualizerTransformChange(layer.id, 'rotation', val) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">°</span>
                                    </div>
                                </div>
                                <Slider
                                    min={-360} max={360} step={1}
                                    value={[transformConfig.rotation]}
                                    onValueChange={([val]) => onVisualizerTransformChange(layer.id, 'rotation', val)}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor={`${layer.id}-offsetx-input`}>X Offset</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id={`${layer.id}-offsetx-input`}
                                            type="number"
                                            className="w-full h-8 pr-6 text-right"
                                            min={-100} max={100} step={1}
                                            value={transformConfig.offsetX}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onVisualizerTransformChange(layer.id, 'offsetX', val) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={-100} max={100} step={1}
                                    value={[transformConfig.offsetX]}
                                    onValueChange={([val]) => onVisualizerTransformChange(layer.id, 'offsetX', val)}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor={`${layer.id}-offsety-input`}>Y Offset</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id={`${layer.id}-offsety-input`}
                                            type="number"
                                            className="w-full h-8 pr-6 text-right"
                                            min={-100} max={100} step={1}
                                            value={transformConfig.offsetY}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onVisualizerTransformChange(layer.id, 'offsetY', val) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={-100} max={100} step={1}
                                    value={[transformConfig.offsetY]}
                                    onValueChange={([val]) => onVisualizerTransformChange(layer.id, 'offsetY', val)}
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>
                      )}
                      {pulsingConfigurableLayers.includes(layer.id) && effectConfigs.pulsingConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                          <div className="flex flex-col space-y-2">
                              <Label>Shape</Label>
                              <RadioGroup
                                  value={effectConfigs.pulsingConfig.shape}
                                  onValueChange={(value) => onConfigChange('pulsingConfig', { ...effectConfigs.pulsingConfig, shape: value as any })}
                                  className="pt-2 space-y-2"
                                  disabled={isProcessing}
                              >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="circle" id={`shape-circle-${layer.id}`} />
                                    <Label htmlFor={`shape-circle-${layer.id}`} className="font-normal leading-none cursor-pointer">Circle</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="square" id={`shape-square-${layer.id}`} />
                                    <Label htmlFor={`shape-square-${layer.id}`} className="font-normal leading-none cursor-pointer">Square</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="triangle" id={`shape-triangle-${layer.id}`} />
                                    <Label htmlFor={`shape-triangle-${layer.id}`} className="font-normal leading-none cursor-pointer">Triangle</Label>
                                  </div>
                              </RadioGroup>
                          </div>
                           <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="pulsing-speed-input">Speed</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="pulsing-speed-input"
                                            type="number" className="w-full h-8 text-right"
                                            min={0.1} max={5} step={0.1}
                                            value={effectConfigs.pulsingConfig.speed}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('pulsingConfig', { ...effectConfigs.pulsingConfig, speed: val }) }}}
                                            disabled={isProcessing}
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={0.1} max={5} step={0.1}
                                    value={[effectConfigs.pulsingConfig.speed]}
                                    onValueChange={([val]) => onConfigChange('pulsingConfig', { ...effectConfigs.pulsingConfig, speed: val })}
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>
                      )}
                      {colorConfigurableLayers.includes(layer.id) && effectConfigs.colors[layer.id] && (
                          multiColorConfig[layer.id] 
                          ? (
                              <div className="col-span-full flex flex-col space-y-4 rounded-lg border p-4 mt-4">
                                  {Array.from({ length: multiColorConfig[layer.id].count }).map((_, i) => (
                                      <div key={i} className="flex items-center justify-between">
                                      <Label htmlFor={`${layer.id}-color-${i}`} className={cn(effectConfigs.copperBarsConfig?.rainbow && layer.id === 'copper-bars' ? 'text-muted-foreground' : '')}>{multiColorConfig[layer.id].labels[i]}</Label>
                                      <Input
                                          id={`${layer.id}-color-${i}`}
                                          type="color"
                                          value={effectConfigs.colors[layer.id]?.[i] || ''}
                                          onChange={(e) => onColorChange(layer.id, e.target.value, i)}
                                          className="h-8 w-14 p-0.5 cursor-pointer"
                                          disabled={isProcessing || (layer.id === 'copper-bars' && effectConfigs.copperBarsConfig.rainbow)}
                                      />
                                      </div>
                                  ))}
                              </div>
                          )
                          : (
                              <div className="flex flex-col space-y-2 rounded-lg border p-3 mt-4">
                                  <Label htmlFor={`${layer.id}-color`} className={cn(
                                    (layer.id === 'text-scroller' && effectConfigs.textScrollerConfig.rainbow) ||
                                    (layer.id === 'vector-ball' && effectConfigs.vectorBallConfig.rainbow) ||
                                    (layer.id === 'lissajous' && effectConfigs.lissajousConfig.rainbow) ||
                                    (layer.id === 'greets' && effectConfigs.greetsConfig.rainbow) ||
                                    (layer.id === 'polygonal-sphere' && effectConfigs.polygonalSphereConfig.rainbow) ||
                                    (layer.id === 'phyllotaxis' && effectConfigs.phyllotaxisConfig.rainbow) ||
                                    (layer.id === 'text-particles' && effectConfigs.textParticlesConfig.rainbow) ||
                                    (layer.id === 'reactive-text' && effectConfigs.reactiveTextConfig.rainbow)
                                     ? 'text-muted-foreground' : ''
                                  )}>Color</Label>
                                  <Input
                                      id={`${layer.id}-color`}
                                      type="color"
                                      value={effectConfigs.colors[layer.id]?.[0] || ''}
                                      onChange={(e) => onColorChange(layer.id, e.target.value, 0)}
                                      className="w-full h-9 p-1 cursor-pointer"
                                      disabled={isProcessing || 
                                        (layer.id === 'text-scroller' && effectConfigs.textScrollerConfig.rainbow) ||
                                        (layer.id === 'vector-ball' && effectConfigs.vectorBallConfig.rainbow) ||
                                        (layer.id === 'lissajous' && effectConfigs.lissajousConfig.rainbow) ||
                                        (layer.id === 'greets' && effectConfigs.greetsConfig.rainbow) ||
                                        (layer.id === 'polygonal-sphere' && effectConfigs.polygonalSphereConfig.rainbow) ||
                                        (layer.id === 'phyllotaxis' && effectConfigs.phyllotaxisConfig.rainbow) ||
                                        (layer.id === 'text-particles' && effectConfigs.textParticlesConfig.rainbow) ||
                                        (layer.id === 'reactive-text' && effectConfigs.reactiveTextConfig.rainbow) ||
                                        (layer.id === 'strobe' && effectConfigs.strobeConfig.mode === 'timed' && effectConfigs.strobeConfig.randomInterval)
                                      }
                                  />
                              </div>
                          )
                      )}
                      {textConfigurableLayers.includes(layer.id) && effectConfigs.textScrollerConfig && (
                          <div className="space-y-4 rounded-lg border p-4 mt-4">
                              <div className="col-span-full flex flex-col space-y-2">
                                  <Label htmlFor="scroller-text-input">Scroll Text</Label>
                                  <Input
                                  id="scroller-text-input"
                                  value={effectConfigs.textScrollerConfig.text}
                                  onChange={(e) => onConfigChange('textScrollerConfig', {...effectConfigs.textScrollerConfig, text: e.target.value})}
                                  className="h-9"
                                  disabled={isProcessing}
                                  />
                              </div>
                               <div className="col-span-full flex flex-col space-y-2">
                                  <Label htmlFor="scroller-font-select">Font Family</Label>
                                  <Select
                                    value={effectConfigs.textScrollerConfig.fontFamily}
                                    onValueChange={(value) => onConfigChange('textScrollerConfig', {...effectConfigs.textScrollerConfig, fontFamily: value})}
                                    disabled={isProcessing}
                                  >
                                    <SelectTrigger id="scroller-font-select">
                                      <SelectValue placeholder="Select a font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fontOptions.map(font => (
                                        <SelectItem key={font.value} value={font.value} style={{fontFamily: font.value}}>
                                          {font.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                              </div>
                              <Separator/>
                                <div className="flex items-center justify-between pt-2">
                                    <Label htmlFor="scroller-mode-switch" className="cursor-pointer">Circle Mode</Label>
                                    <Switch
                                    id="scroller-mode-switch"
                                    checked={effectConfigs.textScrollerConfig.mode === 'circle'}
                                    onCheckedChange={(checked) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, mode: checked ? 'circle' : 'sinus' })}
                                    disabled={isProcessing}
                                    />
                                </div>
                                <Separator/>

                              {effectConfigs.textScrollerConfig.mode === 'sinus' ? (
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center">
                                    <Label htmlFor="scroller-sinus-input">Sinus Intensity</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="scroller-sinus-input"
                                            type="number"
                                            className="w-full h-8 text-right"
                                            min={0} max={100} step={1}
                                            value={effectConfigs.textScrollerConfig.sinusIntensity}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, sinusIntensity: val }) }}}
                                            disabled={isProcessing}
                                        />
                                    </div>
                                    </div>
                                    <Slider
                                        min={0} max={100} step={1}
                                        value={[effectConfigs.textScrollerConfig.sinusIntensity]}
                                        onValueChange={([val]) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, sinusIntensity: val })}
                                        disabled={isProcessing}
                                    />
                                </div>
                              ) : (
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="scroller-radius-input">Radius</Label>
                                        <div className="relative w-16">
                                            <Input
                                                id="scroller-radius-input"
                                                type="number" className="w-full h-8 pr-6 text-right"
                                                min={10} max={100} step={1}
                                                value={effectConfigs.textScrollerConfig.circleRadius}
                                                onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, circleRadius: val }) }}}
                                                disabled={isProcessing}
                                            />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                        </div>
                                    </div>
                                    <Slider
                                        min={10} max={100} step={1}
                                        value={[effectConfigs.textScrollerConfig.circleRadius]}
                                        onValueChange={([val]) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, circleRadius: val })}
                                        disabled={isProcessing}
                                    />
                                </div>
                              )}


                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <Label htmlFor="scroller-fontsize-input">Font Size</Label>
                                  <div className="relative w-16">
                                      <Input
                                          id="scroller-fontsize-input"
                                          type="number"
                                          className="w-full h-8 pr-6 text-right"
                                          min={10} max={128} step={1}
                                          value={effectConfigs.textScrollerConfig.fontSize}
                                          onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, fontSize: val }) }}}
                                          disabled={isProcessing}
                                      />
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">px</span>
                                  </div>
                                </div>
                                <Slider
                                    min={10} max={128} step={1}
                                    value={[effectConfigs.textScrollerConfig.fontSize]}
                                    onValueChange={([val]) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, fontSize: val })}
                                    disabled={isProcessing}
                                />
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <Label htmlFor="scroller-speed-input">Speed</Label>
                                  <div className="relative w-16">
                                      <Input
                                          id="scroller-speed-input"
                                          type="number"
                                          className="w-full h-8 text-right"
                                          min={0.1} max={10} step={0.1}
                                          value={effectConfigs.textScrollerConfig.speed}
                                          onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, speed: val }) }}}
                                          disabled={isProcessing}
                                      />
                                  </div>
                                </div>
                                <Slider
                                    min={0.1} max={10} step={0.1}
                                    value={[effectConfigs.textScrollerConfig.speed]}
                                    onValueChange={([val]) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, speed: val })}
                                    disabled={isProcessing}
                                />
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <Label htmlFor="scroller-offsetx-input">X Offset</Label>
                                  <div className="relative w-16">
                                      <Input
                                          id="scroller-offsetx-input"
                                          type="number"
                                          className="w-full h-8 pr-6 text-right"
                                          min={-100} max={100} step={1}
                                          value={effectConfigs.textScrollerConfig.offsetX}
                                          onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, offsetX: val }) }}}
                                          disabled={isProcessing}
                                      />
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                  </div>
                                </div>
                                <Slider
                                    min={-100} max={100} step={1}
                                    value={[effectConfigs.textScrollerConfig.offsetX]}
                                    onValueChange={([val]) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, offsetX: val })}
                                    disabled={isProcessing}
                                />
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <Label htmlFor="scroller-offsety-input">Y Offset</Label>
                                  <div className="relative w-16">
                                      <Input
                                          id="scroller-offsety-input"
                                          type="number"
                                          className="w-full h-8 pr-6 text-right"
                                          min={-100} max={100} step={1}
                                          value={effectConfigs.textScrollerConfig.offsetY}
                                          onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, offsetY: val }) }}}
                                          disabled={isProcessing}
                                      />
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                  </div>
                                </div>
                                <Slider
                                    min={-100} max={100} step={1}
                                    value={[effectConfigs.textScrollerConfig.offsetY]}
                                    onValueChange={([val]) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, offsetY: val })}
                                    disabled={isProcessing}
                                />
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <Label htmlFor="scroller-rotation-input">Rotation</Label>
                                  <div className="relative w-16">
                                      <Input
                                          id="scroller-rotation-input"
                                          type="number"
                                          className="w-full h-8 pr-6 text-right"
                                          min={0} max={360} step={1}
                                          value={effectConfigs.textScrollerConfig.rotation}
                                          onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, rotation: val }) }}}
                                          disabled={isProcessing}
                                      />
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">°</span>
                                  </div>
                                </div>
                                <Slider
                                    min={0} max={360} step={1}
                                    value={[effectConfigs.textScrollerConfig.rotation]}
                                    onValueChange={([val]) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, rotation: val })}
                                    disabled={isProcessing}
                                />
                              </div>
                              <Separator/>
                              <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="scroller-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                                <Switch
                                  id="scroller-rainbow-switch"
                                  checked={effectConfigs.textScrollerConfig.rainbow}
                                  onCheckedChange={(checked) => onConfigChange('textScrollerConfig', { ...effectConfigs.textScrollerConfig, rainbow: checked })}
                                  disabled={isProcessing}
                                />
                              </div>
                          </div>
                      )}
                      {neonGridConfigurableLayers.includes(layer.id) && effectConfigs.neonGridConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="grid-rotation-input">Rotation</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="grid-rotation-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={360} step={1}
                                        value={effectConfigs.neonGridConfig.rotation}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, rotation: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">°</span>
                                </div>
                              </div>
                              <Slider
                                  min={0} max={360} step={1}
                                  value={[effectConfigs.neonGridConfig.rotation]}
                                  onValueChange={([val]) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, rotation: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                           <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="grid-offsetx-input">X Offset</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="grid-offsetx-input"
                                            type="number" className="w-full h-8 pr-6 text-right"
                                            min={-100} max={100} step={1}
                                            value={effectConfigs.neonGridConfig.offsetX}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, offsetX: val }) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={-100} max={100} step={1}
                                    value={[effectConfigs.neonGridConfig.offsetX]}
                                    onValueChange={([val]) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, offsetX: val })}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="grid-offsety-input">Y Offset</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="grid-offsety-input"
                                            type="number" className="w-full h-8 pr-6 text-right"
                                            min={-100} max={100} step={1}
                                            value={effectConfigs.neonGridConfig.offsetY}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, offsetY: val }) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={-100} max={100} step={1}
                                    value={[effectConfigs.neonGridConfig.offsetY]}
                                    onValueChange={([val]) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, offsetY: val })}
                                    disabled={isProcessing}
                                />
                            </div>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center">
                                <Label htmlFor="grid-thickness-input">Thickness</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="grid-thickness-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={0.5} max={10} step={0.1}
                                        value={effectConfigs.neonGridConfig.thickness}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, thickness: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={0.5} max={10} step={0.1}
                                  value={[effectConfigs.neonGridConfig.thickness]}
                                  onValueChange={([val]) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, thickness: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                           <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="grid-scrollspeed-input">Scroll Speed</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="grid-scrollspeed-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={-10} max={10} step={0.1}
                                        value={effectConfigs.neonGridConfig.scrollSpeed}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, scrollSpeed: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={-10} max={10} step={0.1}
                                  value={[effectConfigs.neonGridConfig.scrollSpeed]}
                                  onValueChange={([val]) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, scrollSpeed: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="grid-horizon-input">Horizon</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="grid-horizon-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={100} step={1}
                                        value={effectConfigs.neonGridConfig.horizon}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, horizon: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={0} max={100} step={1}
                                  value={[effectConfigs.neonGridConfig.horizon]}
                                  onValueChange={([val]) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, horizon: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                           <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="grid-perspective-input">Perspective</Label>
                                    <div className="relative w-16">
                                        <Input
                                            id="grid-perspective-input"
                                            type="number" className="w-full h-8 pr-6 text-right"
                                            min={0} max={100} step={1}
                                            value={effectConfigs.neonGridConfig.perspective}
                                            onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, perspective: val }) }}}
                                            disabled={isProcessing}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={0} max={100} step={1}
                                    value={[effectConfigs.neonGridConfig.perspective]}
                                    onValueChange={([val]) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, perspective: val })}
                                    disabled={isProcessing}
                                />
                            </div>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center">
                                <Label htmlFor="grid-wave-input">Wave Amount</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="grid-wave-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={100} step={1}
                                        value={effectConfigs.neonGridConfig.waveAmplitude}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, waveAmplitude: val }) }}}
                                        disabled={isProcessing || !effectConfigs.neonGridConfig.waveEnabled}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={0} max={100} step={1}
                                  value={[effectConfigs.neonGridConfig.waveAmplitude]}
                                  onValueChange={([val]) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, waveAmplitude: val })}
                                  disabled={isProcessing || !effectConfigs.neonGridConfig.waveEnabled}
                              />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between pt-2">
                            <Label htmlFor="grid-wave-switch" className="cursor-pointer">Enable Animation</Label>
                            <Switch
                              id="grid-wave-switch"
                              checked={effectConfigs.neonGridConfig.waveEnabled}
                              onCheckedChange={(checked) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, waveEnabled: checked })}
                              disabled={isProcessing}
                            />
                          </div>
                           <Separator />
                          <div className="flex items-center justify-between pt-2">
                            <Label htmlFor="grid-h-spacing-switch" className="cursor-pointer">Double Horizontal Spacing</Label>
                            <Switch
                                id="grid-h-spacing-switch"
                                checked={effectConfigs.neonGridConfig.doubleHorizontalSpacing}
                                onCheckedChange={(checked) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, doubleHorizontalSpacing: checked })}
                                disabled={isProcessing}
                            />
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <Label htmlFor="grid-v-spacing-switch" className="cursor-pointer">Double Vertical Spacing</Label>
                            <Switch
                                id="grid-v-spacing-switch"
                                checked={effectConfigs.neonGridConfig.doubleVerticalSpacing}
                                onCheckedChange={(checked) => onConfigChange('neonGridConfig', { ...effectConfigs.neonGridConfig, doubleVerticalSpacing: checked })}
                                disabled={isProcessing}
                            />
                          </div>
                        </div>
                      )}
                      {directionConfigurableLayers.includes(layer.id) && (
                          <div className="flex flex-col space-y-2 rounded-lg border p-3">
                              <Label>Direction</Label>
                              <RadioGroup
                                  value={effectConfigs.starfieldDirection}
                                  onValueChange={(value) => onConfigChange('starfieldDirection', value as any)}
                                  className="pt-2 space-y-2"
                                  disabled={isProcessing}
                              >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="forward" id={`dir-fwd-${layer.id}`} />
                                    <Label htmlFor={`dir-fwd-${layer.id}`} className="font-normal leading-none cursor-pointer">Forward</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="left-right" id={`dir-lr-${layer.id}`} />
                                    <Label htmlFor={`dir-lr-${layer.id}`} className="font-normal leading-none cursor-pointer">Left to Right</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="right-left" id={`dir-rl-${layer.id}`} />
                                    <Label htmlFor={`dir-rl-${layer.id}`} className="font-normal leading-none cursor-pointer">Right to Left</Label>
                                  </div>
                              </RadioGroup>
                          </div>
                      )}
                      {speedConfigurableLayers.includes(layer.id) && (
                          <div className="space-y-3 rounded-lg border p-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="boids-speed-input">Speed</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="boids-speed-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={0.5} max={5} step={0.1}
                                        value={effectConfigs.boidsSpeed}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('boidsSpeed', val) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={0.5} max={5} step={0.1}
                                  value={[effectConfigs.boidsSpeed]}
                                  onValueChange={([val]) => onConfigChange('boidsSpeed', val)}
                                  disabled={isProcessing}
                              />
                          </div>
                      )}
                       {plasmaConfigurableLayers.includes(layer.id) && effectConfigs.plasmaConfig && (
                        <div className="space-y-4 rounded-lg border p-4">
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="plasma-size-input">Size</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="plasma-size-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={0.5} max={2} step={0.1}
                                        value={effectConfigs.plasmaConfig.size}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('plasmaConfig', { ...effectConfigs.plasmaConfig, size: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={0.5} max={2} step={0.1}
                                  value={[effectConfigs.plasmaConfig.size]}
                                  onValueChange={([val]) => onConfigChange('plasmaConfig', { ...effectConfigs.plasmaConfig, size: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="plasma-speed-input">Speed</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="plasma-speed-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={0.1} max={5} step={0.1}
                                        value={effectConfigs.plasmaConfig.speed}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('plasmaConfig', { ...effectConfigs.plasmaConfig, speed: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={0.1} max={5} step={0.1}
                                  value={[effectConfigs.plasmaConfig.speed]}
                                  onValueChange={([val]) => onConfigChange('plasmaConfig', { ...effectConfigs.plasmaConfig, speed: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="flex flex-col space-y-2 rounded-lg border p-3">
                              <Label>Mode</Label>
                              <RadioGroup
                                  value={effectConfigs.plasmaConfig.mode}
                                  onValueChange={(value) => onConfigChange('plasmaConfig', { ...effectConfigs.plasmaConfig, mode: value as any })}
                                  className="pt-2 space-y-2"
                                  disabled={isProcessing}
                              >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="2d" id={`plasma-mode-2d-${layer.id}`} />
                                    <Label htmlFor={`plasma-mode-2d-${layer.id}`} className="font-normal leading-none cursor-pointer">2D</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="3d" id={`plasma-mode-3d-${layer.id}`} />
                                    <Label htmlFor={`plasma-mode-3d-${layer.id}`} className="font-normal leading-none cursor-pointer">3D (Depth)</Label>
                                  </div>
                              </RadioGroup>
                          </div>
                        </div>
                      )}
                      {copperExtraConfigurableLayers.includes(layer.id) && effectConfigs.copperBarsConfig && (
                        <div className="space-y-4 rounded-lg border p-4">
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="copper-size-input">Size</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="copper-size-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={10} max={200} step={1}
                                        value={effectConfigs.copperBarsConfig.size}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, size: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={10} max={200} step={1}
                                  value={[effectConfigs.copperBarsConfig.size]}
                                  onValueChange={([val]) => onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, size: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center">
                                <Label htmlFor="copper-speed-input">Speed</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="copper-speed-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={0.1} max={5} step={0.1}
                                        value={effectConfigs.copperBarsConfig.speed}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, speed: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={0.1} max={5} step={0.1}
                                  value={[effectConfigs.copperBarsConfig.speed]}
                                  onValueChange={([val]) => onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, speed: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="copper-thickness-input">Thickness</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="copper-thickness-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={1} max={50} step={1}
                                        value={effectConfigs.copperBarsConfig.thickness}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, thickness: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={1} max={50} step={1}
                                  value={[effectConfigs.copperBarsConfig.thickness]}
                                  onValueChange={([val]) => onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, thickness: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                           <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="copper-rotation-input">Rotation</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="copper-rotation-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={360} step={1}
                                        value={effectConfigs.copperBarsConfig.rotation}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, rotation: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">°</span>
                                </div>
                              </div>
                              <Slider
                                  min={0} max={360} step={1}
                                  value={[effectConfigs.copperBarsConfig.rotation]}
                                  onValueChange={([val]) => onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, rotation: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="copper-offsetx-input">X Offset</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="copper-offsetx-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={-100} max={100} step={1}
                                        value={effectConfigs.copperBarsConfig.offsetX}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, offsetX: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={-100} max={100} step={1}
                                  value={[effectConfigs.copperBarsConfig.offsetX]}
                                  onValueChange={([val]) => onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, offsetX: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="copper-offsety-input">Y Offset</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="copper-offsety-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={-100} max={100} step={1}
                                        value={effectConfigs.copperBarsConfig.offsetY}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, offsetY: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={-100} max={100} step={1}
                                  value={[effectConfigs.copperBarsConfig.offsetY]}
                                  onValueChange={([val]) => onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, offsetY: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                           <Separator />
                          <div className="flex items-center justify-between pt-2">
                            <Label htmlFor="copper-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                            <Switch
                              id="copper-rainbow-switch"
                              checked={effectConfigs.copperBarsConfig.rainbow}
                              onCheckedChange={(checked) => onConfigChange('copperBarsConfig', { ...effectConfigs.copperBarsConfig, rainbow: checked })}
                              disabled={isProcessing}
                            />
                          </div>
                        </div>
                      )}
                      {solidCubesConfigurableLayers.includes(layer.id) && effectConfigs.solidCubesConfig && (
                        <div className="space-y-4 rounded-lg border p-4">
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="cubes-size-input">Size</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="cubes-size-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={5} max={100} step={1}
                                        value={effectConfigs.solidCubesConfig.size}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, size: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={5} max={100} step={1}
                                  value={[effectConfigs.solidCubesConfig.size]}
                                  onValueChange={([val]) => onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, size: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="cubes-offsetx-input">X Offset</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="cubes-offsetx-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={-100} max={100} step={1}
                                        value={effectConfigs.solidCubesConfig.offsetX}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, offsetX: val }) }}}
                                        disabled={isProcessing}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={-100} max={100} step={1}
                                  value={[effectConfigs.solidCubesConfig.offsetX]}
                                  onValueChange={([val]) => onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, offsetX: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="cubes-offsety-input">Y Offset</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="cubes-offsety-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={-100} max={100} step={1}
                                        value={effectConfigs.solidCubesConfig.offsetY}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, offsetY: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={-100} max={100} step={1}
                                  value={[effectConfigs.solidCubesConfig.offsetY]}
                                  onValueChange={([val]) => onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, offsetY: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <Separator />
                           <div className="flex flex-col space-y-2 pt-2">
                              <Label>Count</Label>
                              <RadioGroup
                                  value={effectConfigs.solidCubesConfig.count}
                                  onValueChange={(value) => onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, count: value as any })}
                                  className="pt-1 space-y-2"
                                  disabled={isProcessing}
                              >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="single" id={`cube-count-single-${layer.id}`} />
                                    <Label htmlFor={`cube-count-single-${layer.id}`} className="font-normal leading-none cursor-pointer">Single</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="multiple" id={`cube-count-multiple-${layer.id}`} />
                                    <Label htmlFor={`cube-count-multiple-${layer.id}`} className="font-normal leading-none cursor-pointer">Multiple</Label>
                                  </div>
                              </RadioGroup>
                          </div>
                          <div className="flex flex-col space-y-2">
                              <Label>Style</Label>
                              <RadioGroup
                                  value={effectConfigs.solidCubesConfig.style}
                                  onValueChange={(value) => onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, style: value as any })}
                                  className="pt-1 space-y-2"
                                  disabled={isProcessing}
                              >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="solid" id={`cube-style-solid-${layer.id}`} />
                                    <Label htmlFor={`cube-style-solid-${layer.id}`} className="font-normal leading-none cursor-pointer">Solid</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="wireframe" id={`cube-style-wireframe-${layer.id}`} />
                                    <Label htmlFor={`cube-style-wireframe-${layer.id}`} className="font-normal leading-none cursor-pointer">Wireframe</Label>
                                  </div>
                              </RadioGroup>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between pt-2">
                            <Label htmlFor="cubes-randomize-btn" className="cursor-pointer">Arrangement</Label>
                            <Button
                              id="cubes-randomize-btn"
                              variant="outline"
                              size="sm"
                              onClick={() => onConfigChange('solidCubesConfig', { ...effectConfigs.solidCubesConfig, seed: Math.random() })}
                              disabled={isProcessing}
                            >
                              <Dices className="mr-2 h-4 w-4" />
                              Randomize
                            </Button>
                          </div>
                        </div>
                      )}
                       {checkerboardConfigurableLayers.includes(layer.id) && effectConfigs.checkerboardConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                           <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="checkerboard-rotation-input">Rotation</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="checkerboard-rotation-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={360} step={1}
                                        value={effectConfigs.checkerboardConfig.rotation}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('checkerboardConfig', { ...effectConfigs.checkerboardConfig, rotation: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">°</span>
                                </div>
                              </div>
                              <Slider
                                  min={0} max={360} step={1}
                                  value={[effectConfigs.checkerboardConfig.rotation]}
                                  onValueChange={([val]) => onConfigChange('checkerboardConfig', { ...effectConfigs.checkerboardConfig, rotation: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="checkerboard-perspective-input">Perspective</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="checkerboard-perspective-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={100} step={1}
                                        value={effectConfigs.checkerboardConfig.perspective}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('checkerboardConfig', { ...effectConfigs.checkerboardConfig, perspective: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={0} max={100} step={1}
                                  value={[effectConfigs.checkerboardConfig.perspective]}
                                  onValueChange={([val]) => onConfigChange('checkerboardConfig', { ...effectConfigs.checkerboardConfig, perspective: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="checkerboard-offsetx-input">X Offset</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="checkerboard-offsetx-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={-100} max={100} step={1}
                                        value={effectConfigs.checkerboardConfig.offsetX}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('checkerboardConfig', { ...effectConfigs.checkerboardConfig, offsetX: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={-100} max={100} step={1}
                                  value={[effectConfigs.checkerboardConfig.offsetX]}
                                  onValueChange={([val]) => onConfigChange('checkerboardConfig', { ...effectConfigs.checkerboardConfig, offsetX: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="checkerboard-offsety-input">Y Offset</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="checkerboard-offsety-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={-100} max={100} step={1}
                                        value={effectConfigs.checkerboardConfig.offsetY}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('checkerboardConfig', { ...effectConfigs.checkerboardConfig, offsetY: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={-100} max={100} step={1}
                                  value={[effectConfigs.checkerboardConfig.offsetY]}
                                  onValueChange={([val]) => onConfigChange('checkerboardConfig', { ...effectConfigs.checkerboardConfig, offsetY: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                        </div>
                      )}
                      {torusConfigurableLayers.includes(layer.id) && effectConfigs.torusConfig && (
                        <div className="space-y-3 rounded-lg border p-3">
                           <div className="flex justify-between items-center">
                                <Label htmlFor="torus-size-input">Size</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="torus-size-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={5} max={50} step={1}
                                        value={effectConfigs.torusConfig.size}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('torusConfig', { ...effectConfigs.torusConfig, size: val }) }}}
                                        disabled={isProcessing}
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                            </div>
                          <Slider
                            min={5}
                            max={50}
                            step={1}
                            value={[effectConfigs.torusConfig.size]}
                            onValueChange={([val]) => onConfigChange('torusConfig', { ...effectConfigs.torusConfig, size: val })}
                            disabled={isProcessing}
                          />
                        </div>
                      )}
                      {tunnelConfigurableLayers.includes(layer.id) && effectConfigs.tunnelConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="tunnel-speed-input">Speed</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="tunnel-speed-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={0.1} max={5} step={0.1}
                                        value={effectConfigs.tunnelConfig.speed}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('tunnelConfig', { ...effectConfigs.tunnelConfig, speed: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={0.1} max={5} step={0.1}
                                  value={[effectConfigs.tunnelConfig.speed]}
                                  onValueChange={([val]) => onConfigChange('tunnelConfig', { ...effectConfigs.tunnelConfig, speed: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                               <div className="flex justify-between items-center">
                                <Label htmlFor="tunnel-thickness-input">Thickness</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="tunnel-thickness-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={0.5} max={10} step={0.1}
                                        value={effectConfigs.tunnelConfig.thickness}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('tunnelConfig', { ...effectConfigs.tunnelConfig, thickness: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={0.5} max={10} step={0.1}
                                  value={[effectConfigs.tunnelConfig.thickness]}
                                  onValueChange={([val]) => onConfigChange('tunnelConfig', { ...effectConfigs.tunnelConfig, thickness: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                           <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="tunnel-wobble-input">Wobble</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="tunnel-wobble-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={0} max={10} step={0.1}
                                        value={effectConfigs.tunnelConfig.wobble}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('tunnelConfig', { ...effectConfigs.tunnelConfig, wobble: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={0} max={10} step={0.1}
                                  value={[effectConfigs.tunnelConfig.wobble]}
                                  onValueChange={([val]) => onConfigChange('tunnelConfig', { ...effectConfigs.tunnelConfig, wobble: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                        </div>
                      )}
                      {matrixConfigurableLayers.includes(layer.id) && effectConfigs.matrixConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="matrix-fontsize-input">Font Size</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="matrix-fontsize-input"
                                        type="number" className="w-full h-8 text-right"
                                        min={8} max={48} step={1}
                                        value={effectConfigs.matrixConfig.fontSize}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('matrixConfig', { ...effectConfigs.matrixConfig, fontSize: val }) }}}
                                        disabled={isProcessing}
                                    />
                                </div>
                              </div>
                              <Slider
                                  min={8} max={48} step={1}
                                  value={[effectConfigs.matrixConfig.fontSize]}
                                  onValueChange={([val]) => onConfigChange('matrixConfig', { ...effectConfigs.matrixConfig, fontSize: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="matrix-rotation-input">Rotation</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="matrix-rotation-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={360} step={1}
                                        value={effectConfigs.matrixConfig.rotation}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('matrixConfig', { ...effectConfigs.matrixConfig, rotation: val }) }}}
                                        disabled={isProcessing}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">°</span>
                                </div>
                              </div>
                              <Slider
                                  min={0} max={360} step={1}
                                  value={[effectConfigs.matrixConfig.rotation]}
                                  onValueChange={([val]) => onConfigChange('matrixConfig', { ...effectConfigs.matrixConfig, rotation: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="matrix-offsetx-input">X Offset</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="matrix-offsetx-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={-100} max={100} step={1}
                                        value={effectConfigs.matrixConfig.offsetX}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('matrixConfig', { ...effectConfigs.matrixConfig, offsetX: val }) }}}
                                        disabled={isProcessing}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                            <Slider
                                min={-100} max={100} step={1}
                                value={[effectConfigs.matrixConfig.offsetX]}
                                onValueChange={([val]) => onConfigChange('matrixConfig', { ...effectConfigs.matrixConfig, offsetX: val })}
                                disabled={isProcessing}
                            />
                          </div>
                          <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label htmlFor="matrix-offsety-input">Y Offset</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="matrix-offsety-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={-100} max={100} step={1}
                                        value={effectConfigs.matrixConfig.offsetY}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('matrixConfig', { ...effectConfigs.matrixConfig, offsetY: val }) }}}
                                        disabled={isProcessing}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                              </div>
                              <Slider
                                  min={-100} max={100} step={1}
                                  value={[effectConfigs.matrixConfig.offsetY]}
                                  onValueChange={([val]) => onConfigChange('matrixConfig', { ...effectConfigs.matrixConfig, offsetY: val })}
                                  disabled={isProcessing}
                              />
                          </div>
                        </div>
                      )}
                      {scanlinesConfigurableLayers.includes(layer.id) && effectConfigs.scanlinesConfig && (
                        <div className="space-y-3 rounded-lg border p-3">
                          <Label>Thickness</Label>
                          <RadioGroup
                              value={String(effectConfigs.scanlinesConfig.thickness)}
                              onValueChange={(value) => onConfigChange('scanlinesConfig', { thickness: parseInt(value, 10) as 1 | 2 | 3 })}
                              className="pt-2 space-y-2"
                              disabled={isProcessing}
                          >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1" id={`scan-1px-${layer.id}`} />
                                <Label htmlFor={`scan-1px-${layer.id}`} className="font-normal leading-none cursor-pointer">1px</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="2" id={`scan-2px-${layer.id}`} />
                                <Label htmlFor={`scan-2px-${layer.id}`} className="font-normal leading-none cursor-pointer">2px</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="3" id={`scan-3px-${layer.id}`} />
                                <Label htmlFor={`scan-3px-${layer.id}`} className="font-normal leading-none cursor-pointer">3px</Label>
                              </div>
                          </RadioGroup>
                        </div>
                      )}
                      {ripplesConfigurableLayers.includes(layer.id) && effectConfigs.ripplesConfig && (
                        <div className="space-y-4 rounded-lg border p-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="ripple-speed-input">Speed</Label>
                                    <div className="relative w-16">
                                        <Input id="ripple-speed-input" type="number" className="w-full h-8 text-right" min={0.1} max={5} step={0.1} value={effectConfigs.ripplesConfig.speed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('ripplesConfig', { ...effectConfigs.ripplesConfig, speed: val }) }}} disabled={isProcessing} />
                                    </div>
                                </div>
                                <Slider min={0.1} max={5} step={0.1} value={[effectConfigs.ripplesConfig.speed]} onValueChange={([val]) => onConfigChange('ripplesConfig', { ...effectConfigs.ripplesConfig, speed: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="ripple-thickness-input">Thickness</Label>
                                    <div className="relative w-16">
                                        <Input id="ripple-thickness-input" type="number" className="w-full h-8 text-right" min={0.5} max={30} step={0.1} value={effectConfigs.ripplesConfig.thickness} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('ripplesConfig', { ...effectConfigs.ripplesConfig, thickness: val }) }}} disabled={isProcessing} />
                                    </div>
                                </div>
                                <Slider min={0.5} max={30} step={0.1} value={[effectConfigs.ripplesConfig.thickness]} onValueChange={([val]) => onConfigChange('ripplesConfig', { ...effectConfigs.ripplesConfig, thickness: val })} disabled={isProcessing} />
                            </div>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="ripple-spawn-input">Spawn Rate</Label>
                                    <div className="relative w-16">
                                        <Input id="ripple-spawn-input" type="number" className="w-full h-8 text-right" min={10} max={300} step={1} value={effectConfigs.ripplesConfig.spawnRate} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('ripplesConfig', { ...effectConfigs.ripplesConfig, spawnRate: val }) }}} disabled={isProcessing} />
                                    </div>
                                </div>
                                <Slider min={10} max={300} step={1} value={[effectConfigs.ripplesConfig.spawnRate]} onValueChange={([val]) => onConfigChange('ripplesConfig', { ...effectConfigs.ripplesConfig, spawnRate: val })} disabled={isProcessing} />
                            </div>
                        </div>
                      )}
                      {lissajousConfigurableLayers.includes(layer.id) && effectConfigs.lissajousConfig && (
                        <div className="space-y-4 rounded-lg border p-4 mt-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="lissajous-speed-input">Speed</Label>
                                    <div className="relative w-16">
                                        <Input id="lissajous-speed-input" type="number" className="w-full h-8 text-right" min={0.1} max={10} step={0.1} value={effectConfigs.lissajousConfig.speed} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('lissajousConfig', { ...effectConfigs.lissajousConfig, speed: val }) }}} disabled={isProcessing} />
                                    </div>
                                </div>
                                <Slider min={0.1} max={10} step={0.1} value={[effectConfigs.lissajousConfig.speed]} onValueChange={([val]) => onConfigChange('lissajousConfig', { ...effectConfigs.lissajousConfig, speed: val })} disabled={isProcessing} />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="lissajous-thickness-input">Thickness</Label>
                                    <div className="relative w-16">
                                        <Input id="lissajous-thickness-input" type="number" className="w-full h-8 text-right" min={0.5} max={10} step={0.1} value={effectConfigs.lissajousConfig.thickness} onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('lissajousConfig', { ...effectConfigs.lissajousConfig, thickness: val }) }}} disabled={isProcessing} />
                                    </div>
                                </div>
                                <Slider min={0.5} max={10} step={0.1} value={[effectConfigs.lissajousConfig.thickness]} onValueChange={([val]) => onConfigChange('lissajousConfig', { ...effectConfigs.lissajousConfig, thickness: val })} disabled={isProcessing} />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor={`lissajous-shape-select-${layer.id}`}>Shape</Label>
                                <Select
                                    value={effectConfigs.lissajousConfig.shape}
                                    onValueChange={(value) => onConfigChange('lissajousConfig', {...effectConfigs.lissajousConfig, shape: value})}
                                    disabled={isProcessing}
                                >
                                    <SelectTrigger id={`lissajous-shape-select-${layer.id}`}>
                                    <SelectValue placeholder="Select a shape" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {lissajousShapeOptions.map(shape => (
                                        <SelectItem key={shape.value} value={shape.value}>
                                        {shape.label}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between pt-2">
                                <Label htmlFor="lissajous-rainbow-switch" className="cursor-pointer">Rainbow Mode</Label>
                                <Switch
                                    id="lissajous-rainbow-switch"
                                    checked={effectConfigs.lissajousConfig.rainbow}
                                    onCheckedChange={(checked) => onConfigChange('lissajousConfig', { ...effectConfigs.lissajousConfig, rainbow: checked })}
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>
                      )}
                      {isBgMediaSelected && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                              <Label>Fit Mode</Label>
                              <RadioGroup
                                  value={effectConfigs.customBgImageMode}
                                  onValueChange={(value) => onConfigChange('customBgImageMode', value as any)}
                                  className="pt-2 space-y-2"
                                  disabled={isProcessing}
                              >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cover" id="bg-mode-cover" />
                                    <Label htmlFor="bg-mode-cover" className="font-normal leading-none cursor-pointer">Cover</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="contain" id="bg-mode-contain" />
                                    <Label htmlFor="bg-mode-contain" className="font-normal leading-none cursor-pointer">Contain</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="fill" id="bg-mode-fill" />
                                    <Label htmlFor="bg-mode-fill" className="font-normal leading-none cursor-pointer">Stretch</Label>
                                  </div>
                              </RadioGroup>
                          </div>
                          <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="bg-image-x-input">X Position</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="bg-image-x-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={100} step={1}
                                        value={effectConfigs.customBgImagePosition.x}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('customBgImagePosition', { ...effectConfigs.customBgImagePosition, x: val }) }}}
                                        disabled={isProcessing || effectConfigs.customBgImageMode === 'fill'}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                            </div>
                            <Slider
                              min={0} max={100} step={1}
                              value={[effectConfigs.customBgImagePosition.x]}
                              onValueChange={([val]) => onConfigChange('customBgImagePosition', { ...effectConfigs.customBgImagePosition, x: val })}
                              disabled={isProcessing || effectConfigs.customBgImageMode === 'fill'}
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="bg-image-y-input">Y Position</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="bg-image-y-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={100} step={1}
                                        value={effectConfigs.customBgImagePosition.y}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('customBgImagePosition', { ...effectConfigs.customBgImagePosition, y: val }) }}}
                                        disabled={isProcessing || effectConfigs.customBgImageMode === 'fill'}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                            </div>
                            <Slider
                              min={0} max={100} step={1}
                              value={[effectConfigs.customBgImagePosition.y]}
                              onValueChange={([val]) => onConfigChange('customBgImagePosition', { ...effectConfigs.customBgImagePosition, y: val })}
                              disabled={isProcessing || effectConfigs.customBgImageMode === 'fill'}
                            />
                          </div>
                        </div>
                      )}
                      {logoConfigurableLayers.includes(layer.id) && (
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="logo-size-input">Size</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="logo-size-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={1} max={100} step={1}
                                        value={effectConfigs.logoConfig.size}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('logoConfig', { ...effectConfigs.logoConfig, size: val }) }}}
                                        disabled={isProcessing}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                            </div>
                            <Slider
                              min={1} max={100} step={1}
                              value={[effectConfigs.logoConfig.size]}
                              onValueChange={([val]) => onConfigChange('logoConfig', { ...effectConfigs.logoConfig, size: val })}
                              disabled={isProcessing}
                            />
                          </div>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center">
                                <Label htmlFor="logo-x-input">X Position</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="logo-x-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={100} step={1}
                                        value={effectConfigs.logoConfig.x}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('logoConfig', { ...effectConfigs.logoConfig, x: val }) }}}
                                        disabled={isProcessing}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                            </div>
                            <Slider
                              min={0} max={100} step={1}
                              value={[effectConfigs.logoConfig.x]}
                              onValueChange={([val]) => onConfigChange('logoConfig', { ...effectConfigs.logoConfig, x: val })}
                              disabled={isProcessing}
                            />
                          </div>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center">
                                <Label htmlFor="logo-y-input">Y Position</Label>
                                <div className="relative w-16">
                                    <Input
                                        id="logo-y-input"
                                        type="number" className="w-full h-8 pr-6 text-right"
                                        min={0} max={100} step={1}
                                        value={effectConfigs.logoConfig.y}
                                        onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val)) { onConfigChange('logoConfig', { ...effectConfigs.logoConfig, y: val }) }}}
                                        disabled={isProcessing}
                                    />
                                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                                </div>
                            </div>
                            <Slider
                              min={0} max={100} step={1}
                              value={[effectConfigs.logoConfig.y]}
                              onValueChange={([val]) => onConfigChange('logoConfig', { ...effectConfigs.logoConfig, y: val })}
                              disabled={isProcessing}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>
    </Card>
  );
}

export default React.memo(LayerSettings);

    

    


