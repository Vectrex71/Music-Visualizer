
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawLavaLamp: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        const { plasmaConfig } = config;
        if (!plasmaConfig) return;

        const { size, speed, mode } = plasmaConfig;
        
        const time = frameCount * 0.01 * speed;
        const color1 = config.colors?.['plasma']?.[0] || '#e025e5';
        const rgb1 = hexToRgb(color1);
        
        const color2 = config.colors?.['plasma']?.[1] || '#5737e5';
        const color3 = config.colors?.['plasma']?.[2] || 'rgba(50, 220, 150, 0.4)';
        
        if (!rgb1) return;

        const baseRadius = Math.min(width, height);

        const blobs = [
            {
                x: width / 2 + Math.sin(time * 0.8) * (width / 3),
                y: height / 2 + Math.cos(time * 0.5) * (height / 3),
                r: (baseRadius / 1.5) * size * (mode === '3d' ? (0.75 + (Math.sin(time * 0.3 + 1) + 1) / 4) : 1),
                color: `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, 0.5)`
            },
            {
                x: width / 2 + Math.sin(time * 0.6 + 2) * (width / 2.5),
                y: height / 2 + Math.cos(time * 0.9 + 2) * (height / 2.5),
                r: (baseRadius / 2) * size * (mode === '3d' ? (0.75 + (Math.sin(time * 0.5 + 3) + 1) / 4) : 1),
                color: color2
            },
            {
                x: width / 2 + Math.sin(time * 1.2 + 4) * (width / 3.5),
                y: height / 2 + Math.cos(time * 0.7 + 4) * (height / 4),
                r: (baseRadius / 2.5) * size * (mode === '3d' ? (0.75 + (Math.sin(time * 0.7 + 5) + 1) / 4) : 1),
                color: color3
            },
        ];

        ctx.globalCompositeOperation = 'lighter';
        
        blobs.forEach(blob => {
            const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
            gradient.addColorStop(0, blob.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            // Optimized: Only fill the area where the blob is visible
            ctx.beginPath();
            ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over'; // Reset
    } catch (e) {
        console.error("Error in drawLavaLamp:", e);
    }
};
