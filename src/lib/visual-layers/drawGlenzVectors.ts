
import type { DrawFunction } from '@/lib/types';
import { hexToHsl } from './helpers';

export const drawGlenzVectors: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        const color = config.colors?.['glenz-vectors']?.[0] || '#00FFAA';
        const centerX = width / 2;
        const centerY = height / 2;
        const time = frameCount * 0.02;
        const numLines = 60;
        const radius = Math.min(width, height) * 0.8;

        ctx.lineWidth = 1.5;
        
        for (let i = 0; i < numLines; i++) {
            const angle = (i / numLines) * Math.PI * 2;
            const startX = centerX + Math.cos(angle) * radius;
            const startY = centerY + Math.sin(angle) * radius;
            
            const perspective = 0.5 + (Math.sin(time + i * 0.1) + 1) / 2 * 0.5; // Oscillating perspective
            const endX = centerX + (startX - centerX) * perspective;
            const endY = centerY + (startY - centerY) * perspective;
            
            const hsl = hexToHsl(color);
            if (hsl) {
                const hue = (hsl.h + i * (360/numLines/5)) % 360;
                 ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
            } else {
                ctx.strokeStyle = color;
            }

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    } catch (e) {
        console.error("Error in drawGlenzVectors:", e);
    }
};
