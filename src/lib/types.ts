
import type { LucideIcon } from 'lucide-react';

export type WithId<T> = T & { id: string };

export type ProjectConfiguration = {
  activeLayers: string[];
  effectConfigs: EffectConfigs;
  aspectRatio: '16:9' | '9:16' | '1:1';
  resolution?: '720p' | '1080p';
};

export type VisualizationProject = {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  configuration: string; // JSON.stringified ProjectConfiguration
};

export type VisualLayer = {
  id: string;
  name: string;
  imageId?: string;
  icon?: LucideIcon;
};

export type OverlayLayer = {
  id: string;
  name: string;
  icon?: LucideIcon;
}

export type RenderingStatus = 'idle' | 'uploading' | 'ready' | 'rendering' | 'complete';

export type StarfieldDirection = 'left-right' | 'right-left' | 'forward';

export type LogoConfig = {
  size: number;
  x: number;
  y: number;
};

export type CopperBarsConfig = {
  size: number;
  speed: number;
  thickness: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  rainbow: boolean;
};

export type SolidCubesConfig = {
  size: number;
  offsetX: number;
  offsetY: number;
  seed: number;
  count: 'single' | 'multiple';
  style: 'solid' | 'wireframe';
};

export type CustomBgImageMode = 'cover' | 'contain' | 'fill';

export type CustomBgImagePosition = {
  x: number;
  y: number;
};

export type TorusConfig = {
  size: number;
};

export type NeonGridConfig = {
  rotation: number;
  thickness: number;
  horizon: number; // 0-100
  waveAmplitude: number; // 0-100
  perspective: number; // 0-100
  waveEnabled: boolean;
  scrollSpeed: number;
  doubleHorizontalSpacing: boolean;
  doubleVerticalSpacing: boolean;
  offsetX: number;
  offsetY: number;
};

export type CheckerboardConfig = {
  rotation: number;
  perspective: number;
  offsetX: number;
  offsetY: number;
};

export type PlasmaConfig = {
  size: number;
  speed: number;
  mode: '2d' | '3d';
};

export type PulsingConfig = {
  shape: 'circle' | 'square' | 'triangle';
  speed: number;
};

export type TunnelConfig = {
  speed: number;
  thickness: number;
  wobble: number;
};

export type MatrixConfig = {
  fontSize: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
};

export type ScanlinesConfig = {
  thickness: 1 | 2 | 3;
};

export type RipplesConfig = {
  speed: number;
  thickness: number;
  spawnRate: number;
}

export type LissajousConfig = {
  speed: number;
  thickness: number;
  shape: string;
  rainbow: boolean;
};

export type TextScrollerConfig = {
  text: string;
  speed: number;
  sinusIntensity: number;
  fontSize: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  rainbow: boolean;
  fontFamily: string;
  mode: 'sinus' | 'circle';
  circleRadius: number;
};

export type LayerTransform = {
  size: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
};

export type VignetteConfig = {
  color: string;
  intensity: number; // 0-100
  size: number; // 0-100
};

export type VectorBallConfig = {
  rotationSpeed: number;
  dotSize: number;
  musicReactive: boolean;
  shape: 'circle' | 'square' | 'triangle';
  rainbow: boolean;
};

export type StrobeConfig = {
  mode: 'audio' | 'timed';
  speed: number; // Hz for timed mode
  bassThreshold: number; // 0-100 for audio mode
  randomInterval: boolean; // for timed mode
}

export type PhyllotaxisConfig = {
  dotSize: number;
  divergence: number;
  speed: number;
  rainbow: boolean;
};

export type PolygonalSphereConfig = {
  rotationSpeed: number;
  wireframe: boolean;
  shape: 'icosahedron' | 'dodecahedron' | 'octahedron';
  rainbow: boolean;
};

export type FlowerOfLifeConfig = {
  rotationSpeed: number;
  lineWidth: number;
  petalCount: number;
  glowIntensity: number;
};

export type TextParticlesConfig = {
  text: string;
  fontSize: number;
  fontFamily: string;
  rainbow: boolean;
  speed: number;
  spread: number;
  sensitivity: number;
};

export type GreetsConfig = {
  speed: number;
  fontSize: number;
  fontFamily: string;
  textLines: string[];
  rainbow: boolean;
};

export type FilmGrainConfig = {
  intensity: number;
};

export type CrtGlitchConfig = {
  intensity: number;
};

export type SpriteLayerConfig = {
    count: number;
    mode: 'dvd-bounce' | 'hover' | 'left-right' | 'top-bottom' | 'zoom';
    speed: number;
    size: number;
};

export type ReactiveTextConfig = {
  text: string;
  fontFamily: string;
  rainbow: boolean;
};

export type StarfieldConfig = {
  speed: number;
  rotation: number;
  rainbow: boolean;
  starSize: number;
  shape: 'point' | 'square' | 'triangle';
  spreadX: number;
  spreadY: number;
  reactive: boolean;
  reactiveSensitivity: number;
  offsetX: number;
  offsetY: number;
};

export type WaveformConfig = {
  amplitude: number;
};

export type EffectConfigs = {
  starfieldDirection: StarfieldDirection;
  starfieldConfig: StarfieldConfig;
  colors: {
    [key: string]: string[]; // key is layer id, value is array of color hex
  };
  logoConfig: LogoConfig;
  spriteLayerConfig: SpriteLayerConfig;
  copperBarsConfig: CopperBarsConfig;
  solidCubesConfig: SolidCubesConfig;
  boidsSpeed: number;
  customBgImageMode: CustomBgImageMode;
  customBgImagePosition: CustomBgImagePosition;
  plasmaConfig: PlasmaConfig;
  pulsingConfig: PulsingConfig;
  torusConfig: TorusConfig;
  neonGridConfig: NeonGridConfig;
  tunnelConfig: TunnelConfig;
  matrixConfig: MatrixConfig;
  scanlinesConfig: ScanlinesConfig;
  ripplesConfig: RipplesConfig;
  lissajousConfig: LissajousConfig;
  textScrollerConfig: TextScrollerConfig;
  vignetteConfig: VignetteConfig;
  vectorBallConfig: VectorBallConfig;
  strobeConfig: StrobeConfig;
  checkerboardConfig: CheckerboardConfig;
  phyllotaxisConfig: PhyllotaxisConfig;
  polygonalSphereConfig: PolygonalSphereConfig;
  flowerOfLifeConfig: FlowerOfLifeConfig;
  textParticlesConfig: TextParticlesConfig;
  greetsConfig: GreetsConfig;
  waveformConfig: WaveformConfig;
  filmGrainConfig: FilmGrainConfig;
  crtGlitchConfig: CrtGlitchConfig;
  reactiveTextConfig: ReactiveTextConfig;
  visualizerTransforms: {
    [key: string]: LayerTransform;
  };
};

// --- TYPES AND HELPERS FOR VISUAL LAYERS ---

export type LayerConfig = Omit<EffectConfigs, 'visualizerTransforms'> & {
  visualizerTransform?: LayerTransform;
};

export interface LayerProps {
    ctx: CanvasRenderingContext2D;
    freqData: Uint8Array;
    timeData: Uint8Array;
    frameCount: number;
    width: number;
    height: number;
    config: LayerConfig;
    customImageElement?: HTMLImageElement | null;
    customVideoElement?: HTMLVideoElement | null;
    customLogoElement?: HTMLImageElement | null;
    customSpriteElement?: HTMLImageElement | null;
    audioElement?: HTMLAudioElement | null;
}

export type DrawFunction = (props: LayerProps) => void;
