
import type { DrawFunction } from '@/lib/types';

let noiseCanvas: HTMLCanvasElement | null = null;

const createNoise = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256; // Smaller texture for performance
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
};

export const drawFilmGrain: DrawFunction = ({ ctx, width, height, config }) => {
    if (!config.filmGrainConfig) return;
    try {
        const { intensity } = config.filmGrainConfig;
        if (intensity <= 0) return;
        
        if (!noiseCanvas) {
            noiseCanvas = createNoise(width, height);
        }

        if (noiseCanvas) {
            ctx.save();
            ctx.globalAlpha = intensity * 0.4;
            ctx.globalCompositeOperation = 'screen'; // Changed from 'overlay' to be visible on black
            
            // Draw noise pattern tiled
            const pattern = ctx.createPattern(noiseCanvas, 'repeat');
            if (pattern) {
                ctx.fillStyle = pattern;
                // Offset pattern randomly for animation
                const offX = Math.random() * 256;
                const offY = Math.random() * 256;
                ctx.translate(offX, offY);
                // Fill a larger area to ensure coverage after translation
                ctx.fillRect(-256, -256, width + 512, height + 512);
            }
            ctx.restore();
        }
    } catch(e) {
        console.error("Error in drawFilmGrain", e);
    }
};
