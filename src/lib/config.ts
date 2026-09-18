import type { VisualLayer, OverlayLayer, EffectConfigs } from '@/lib/types';

export const backgroundLayers: VisualLayer[] = [
  { id: 'neon-grid', name: "Grid", imageId: "grid" },
  { id: 'starfield', name: 'Starfield', imageId: "starfield" },
  { id: 'plasma', name: 'Orbs', imageId: "orbs" },
  { id: 'phyllotaxis', name: 'Phyllotaxis', imageId: 'phyllotaxis' },
];

export const visualizerLayers: VisualLayer[] = [
  { id: 'waveform', name: 'Waveform', imageId: "waveform" },
  { id: 'spectrum', name: 'Spectrum', imageId: "spectrum" },
  { id: 'pulsing', name: 'Pulsing', imageId: "pulsing" },
  { id: 'circular-spectrum', name: 'Radial', imageId: 'radial' },
  { id: 'particles', name: 'Bursts', imageId: 'bursts' },
  { id: 'spirograph', name: 'Spiro', imageId: 'spiro' },
  { id: 'wave-circle', name: 'Wave Circle', imageId: 'wavecircle' },
  { id: 'text-particles', name: 'Text Bursts', imageId: 'textbursts' },
  { id: 'reactive-text', name: 'Reactive Text', imageId: 'reactivetext' },
  { id: 'vector-ball', name: 'Vector Ball', imageId: 'vectorball' },
  { id: 'polygonal-sphere', name: 'Poly Sphere', imageId: 'polysphere' },
];

export const demosceneLayers: VisualLayer[] = [
  { id: 'copper-bars', name: 'Copperbars', imageId: "copperbars" },
  { id: 'solid-cubes', name: 'Solid Cubes', imageId: "solid-cubes" },
  { id: 'glenz-vectors', name: 'Star Lines', imageId: "star-lines" },
  { id: 'checkerboard', name: 'Checkerboard', imageId: 'checkerboard' },
  { id: 'torus', name: '3D Torus', imageId: '3d-torus' },
  { id: 'boids', name: 'Boids', imageId: 'boids' },
  { id: 'tunnel', name: 'Hypnotic', imageId: 'hypnotic' },
  { id: 'matrix', name: 'Matrix', imageId: 'matrix' },
  { id: 'lissajous', name: 'Lissajous', imageId: 'lissajous' },
  { id: 'greets', name: 'Greets', imageId: 'greets' },
  { id: 'flower-of-life', name: 'Flower of Life', imageId: 'flower-of-life' },
];

export const overlayLayers: OverlayLayer[] = [
    { id: 'scanlines', name: 'Scanlines' },
    { id: 'vhs-noise', name: 'VHS Noise' },
    { id: 'water-ripples', name: 'Ripples' },
    { id: 'text-scroller', name: 'Scroller' },
    { id: 'vignette', name: 'Vignette' },
    { id: 'strobe', name: 'Strobe' },
    { id: 'film-grain', name: 'Film Grain' },
    { id: 'crt-glitch', name: 'CRT Glitch' },
];

export const customLayers: (VisualLayer | OverlayLayer)[] = [
  { id: 'custom-bg-image', name: "Custom Image" },
  { id: 'custom-bg-video', name: "Custom Video" },
  { id: 'custom-logo', name: "Custom Logo" },
  { id: 'custom-sprite', name: "Sprite Animation" },
]

export const initialEffectConfigs: EffectConfigs = {
    starfieldDirection: 'forward',
    starfieldConfig: {
      speed: 1,
      rotation: 0,
      rainbow: false,
      starSize: 1,
      shape: 'point',
      spreadX: 100,
      spreadY: 100,
      reactive: false,
      reactiveSensitivity: 0.5,
      offsetX: 0,
      offsetY: 0,
    },
    colors: {
      'neon-grid': ['#FFC700', '#00E0FF'],
      'plasma': ['#FFC700', '#FF8C00', '#00E0FF'],
      'waveform': ['#FFC700'],
      'spectrum': ['#FFC700', '#FF8C00'],
      'pulsing': ['#00E0FF', '#FFC700'],
      'circular-spectrum': ['#FFC700', '#00E0FF'],
      'particles': ['#FFC700'],
      'spirograph': ['#FFC700'],
      'matrix': ['#00ff46'],
      'lissajous': ['#00E0FF'],
      'starfield': ['#ffffff'],
      'checkerboard': ['#FFC700'],
      'solid-cubes': ['#FFC700'],
      'glenz-vectors': ['#00E0FF'],
      'torus': ['#FFC700'],
      'boids': ['#00E0FF'],
      'tunnel': ['#FFC700', '#00E0FF'],
      'copper-bars': ['#FFD700', '#FF4500'],
      'text-scroller': ['#FFFFFF'],
      'water-ripples': ['#FFFFFF'],
      'vignette': ['#000000'],
      'wave-circle': ['#5737e5'],
      'vector-ball': ['#FFFFFF'],
      'strobe': ['#FFFFFF'],
      'phyllotaxis': ['#FFD700'],
      'polygonal-sphere': ['#00E0FF'],
      'flower-of-life': ['#FFC700', '#FF8C00'],
      'text-particles': ['#FFFFFF'],
      'greets': ['#FFFFFF'],
      'reactive-text': ['#FFFFFF'],
      'film-grain': [], // no color config
      'crt-glitch': [], // no color config
    },
    logoConfig: {
      size: 20,
      x: 50,
      y: 10,
    },
    spriteLayerConfig: {
      count: 1,
      mode: 'dvd-bounce',
      speed: 2,
      size: 10,
    },
    pulsingConfig: {
      shape: 'circle',
      speed: 1,
    },
    copperBarsConfig: {
      size: 100,
      speed: 1,
      thickness: 20,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      rainbow: false,
    },
    solidCubesConfig: {
      size: 25,
      offsetX: 0,
      offsetY: 0,
      seed: 0,
      count: 'multiple',
      style: 'solid',
    },
    torusConfig: {
      size: 20,
    },
    neonGridConfig: {
      rotation: 0,
      thickness: 1.5,
      horizon: 60,
      waveAmplitude: 10,
      perspective: 100,
      waveEnabled: true,
      scrollSpeed: 1.5,
      doubleHorizontalSpacing: false,
      doubleVerticalSpacing: false,
      offsetX: 0,
      offsetY: 0,
    },
    checkerboardConfig: {
      rotation: 0,
      perspective: 60,
      offsetX: 0,
      offsetY: 0,
    },
    boidsSpeed: 2,
    customBgImageMode: 'cover',
    customBgImagePosition: { x: 50, y: 50 },
    plasmaConfig: {
      size: 1.0,
      speed: 1.0,
      mode: '3d',
    },
    tunnelConfig: {
      speed: 1.0,
      thickness: 1.0,
      wobble: 1.0,
    },
    matrixConfig: {
      fontSize: 32,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
    },
    scanlinesConfig: {
      thickness: 1,
    },
    ripplesConfig: {
      speed: 1,
      thickness: 1.5,
      spawnRate: 50,
    },
    lissajousConfig: {
      speed: 1,
      thickness: 1.5,
      shape: '3:2',
      rainbow: false,
    },
    textScrollerConfig: {
      text: 'MUSIC VISUALIZER - BROUGHT TO YOU BY THE ENTERTAINER * ',
      speed: 1,
      sinusIntensity: 30,
      fontSize: 48,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      rainbow: false,
      fontFamily: 'Space Grotesk',
      mode: 'sinus',
      circleRadius: 30,
    },
    vignetteConfig: {
      color: '#000000',
      intensity: 80,
      size: 60,
    },
    vectorBallConfig: {
      rotationSpeed: 1,
      dotSize: 1,
      musicReactive: true,
      shape: 'circle',
      rainbow: false,
    },
    strobeConfig: {
        mode: 'audio',
        speed: 5, // Hz
        bassThreshold: 80, // percentage
        randomInterval: false,
    },
    phyllotaxisConfig: {
      dotSize: 2,
      divergence: 137.5,
      speed: 1,
      rainbow: false,
    },
    polygonalSphereConfig: {
      rotationSpeed: 1,
      wireframe: true,
      shape: 'icosahedron',
      rainbow: false,
    },
    flowerOfLifeConfig: {
      rotationSpeed: 0.5,
      lineWidth: 2,
      petalCount: 6,
      glowIntensity: 15,
    },
    textParticlesConfig: {
      text: 'YEAH!',
      fontSize: 48,
      fontFamily: 'Bungee',
      rainbow: false,
      speed: 1,
      spread: 100,
      sensitivity: 0.5,
    },
    greetsConfig: {
      speed: 1,
      fontSize: 24,
      fontFamily: 'Press Start 2P',
      textLines: ['HAVE A LOT OF FUN', 'WITH THIS VISUALIZER', 'BY THE ENTERTAINER'],
      rainbow: true,
    },
    waveformConfig: {
      amplitude: 1.0,
    },
    filmGrainConfig: {
      intensity: 0.3,
    },
    crtGlitchConfig: {
      intensity: 1.0,
    },
    reactiveTextConfig: {
      text: 'MUSIC',
      fontFamily: 'Bungee',
      rainbow: false,
    },
    visualizerTransforms: {
      'waveform': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'spectrum': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'pulsing': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'circular-spectrum': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'particles': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'spirograph': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'lissajous': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'vector-ball': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'wave-circle': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'text-particles': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'reactive-text': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'polygonal-sphere': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
      'flower-of-life': { size: 100, rotation: 0, offsetX: 0, offsetY: 0 },
    },
};

export const neonGridConfigurableLayers = ['neon-grid'];
export const colorConfigurableLayers = [
  'neon-grid', 'plasma', 'waveform', 'spectrum', 'pulsing', 'circular-spectrum',
  'particles', 'spirograph', 'matrix', 'lissajous', 'starfield',
  'checkerboard', 'solid-cubes', 'glenz-vectors', 'torus', 'boids', 'tunnel', 'copper-bars', 'text-scroller', 'water-ripples',
  'wave-circle', 'vector-ball', 'strobe', 'phyllotaxis', 'polygonal-sphere', 'flower-of-life', 'text-particles', 'greets', 'reactive-text',
];
export const textConfigurableLayers = ['text-scroller'];
export const directionConfigurableLayers = ['starfield'];
export const speedConfigurableLayers = ['boids'];
export const plasmaConfigurableLayers = ['plasma'];
export const pulsingConfigurableLayers = ['pulsing'];
export const copperExtraConfigurableLayers = ['copper-bars'];
export const solidCubesConfigurableLayers = ['solid-cubes'];
export const torusConfigurableLayers = ['torus'];
export const logoConfigurableLayers = ['custom-logo'];
export const spriteLayerConfigurableLayers = ['custom-sprite'];
export const bgMediaConfigurableLayers = ['custom-bg-image', 'custom-bg-video'];
export const tunnelConfigurableLayers = ['tunnel'];
export const matrixConfigurableLayers = ['matrix'];
export const scanlinesConfigurableLayers = ['scanlines'];
export const ripplesConfigurableLayers = ['water-ripples'];
export const lissajousConfigurableLayers = ['lissajous'];
export const vignetteConfigurableLayers = ['vignette'];
export const vectorBallConfigurableLayers = ['vector-ball'];
export const strobeConfigurableLayers = ['strobe'];
export const visualizerTransformableLayers = ['waveform', 'spectrum', 'pulsing', 'circular-spectrum', 'particles', 'spirograph', 'lissajous', 'vector-ball', 'wave-circle', 'text-particles', 'reactive-text', 'polygonal-sphere', 'flower-of-life'];
export const starfieldConfigurableLayers = ['starfield'];
export const waveformConfigurableLayers = ['waveform'];
export const checkerboardConfigurableLayers = ['checkerboard'];
export const phyllotaxisConfigurableLayers = ['phyllotaxis'];
export const polygonalSphereConfigurableLayers = ['polygonal-sphere'];
export const flowerOfLifeConfigurableLayers = ['flower-of-life'];
export const textParticlesConfigurableLayers = ['text-particles'];
export const greetsConfigurableLayers = ['greets'];
export const filmGrainConfigurableLayers = ['film-grain'];
export const crtGlitchConfigurableLayers = ['crt-glitch'];
export const reactiveTextConfigurableLayers = ['reactive-text'];


export const multiColorConfig: { [key: string]: { count: number, labels: string[] } } = {
  'neon-grid': { count: 2, labels: ['Horizon Color', 'Foreground Color'] },
  'plasma': { count: 3, labels: ['Color 1', 'Color 2', 'Color 3'] },
  'spectrum': { count: 2, labels: ['Start Color', 'End Color'] },
  'pulsing': { count: 2, labels: ['Outer Color', 'Inner Color'] },
  'circular-spectrum': { count: 2, labels: ['Start Color', 'End Color'] },
  'tunnel': { count: 2, labels: ['Color 1', 'Color 2'] },
  'copper-bars': { count: 2, labels: ['Start Color', 'End Color'] },
  'flower-of-life': { count: 2, labels: ['Start Color', 'End Color'] },
};

export const fontOptions = [
  { value: 'Space Grotesk', label: 'Space Grotesk' },
  { value: 'Roboto Mono', label: 'Roboto Mono' },
  { value: 'Press Start 2P', label: 'Press Start 2P' },
  { value: 'Bungee', label: 'Bungee' },
  { value: 'Orbitron', label: 'Orbitron' },
];

export const lissajousShapeOptions = [
  { value: '3:2', label: 'Classic Knot' },
  { value: '3:4', label: 'Complex Weave' },
  { value: '5:4', label: 'Star Flower' },
  { value: '5:6', label: 'Intricate Web' },
  { value: '9:8', label: 'Crystal' },
];

export const vectorBallShapeOptions = [
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
  { value: 'triangle', label: 'Triangle' },
];

export const polySphereShapeOptions = [
  { value: 'icosahedron', label: 'Icosahedron (20-sided)' },
  { value: 'dodecahedron', label: 'Dodecahedron (12-sided)' },
  { value: 'octahedron', label: 'Octahedron (8-sided)' },
];
