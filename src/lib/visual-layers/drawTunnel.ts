
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawTunnel: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        const { tunnelConfig } = config;
        if (!tunnelConfig) return;

        const { speed, thickness, wobble } = tunnelConfig;

        const centerX = width / 2;
        const centerY = height / 2;
        const time = frameCount * 0.02 * speed;
        const numCircles = 20;
        const maxDepth = 5;

        const color1 = config.colors?.['tunnel']?.[0] || '#e025e5';
        const color2 = config.colors?.['tunnel']?.[1] || '#5737e5';
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);

        // Initialize history for the center point
        if (!(ctx as any).__tunnel_history) {
            (ctx as any).__tunnel_history = [];
        }
        const history: {x: number, y: number}[] = (ctx as any).__tunnel_history;

        // Current center point based on wobble
        const currentCenterX = centerX + Math.sin(time * 0.8) * (width * 0.1 * wobble);
        const currentCenterY = centerY + Math.cos(time * 0.5) * (height * 0.1 * wobble);
        
        history.push({x: currentCenterX, y: currentCenterY});
        if (history.length > 50) { // Keep history bounded
            history.shift();
        }

        for (let i = 0; i < numCircles; i++) {
            const z = (time + (i / numCircles) * maxDepth) % maxDepth;
            const perspectiveZ = z / maxDepth;

            // Get a historical center point for this circle
            const historyIndex = Math.max(0, history.length - 1 - i * 2); // Each circle looks further back in time
            const center = history[historyIndex] || {x: centerX, y: centerY};

            const radius = perspectiveZ * (width * 0.6);
            const alpha = (1 - perspectiveZ) * 1.5;
            const lineWidth = (1 - perspectiveZ) * (thickness * 2) + 1;

            if (radius < 1) continue;
            
            if (rgb1 && rgb2) {
                const r = Math.floor(rgb1.r + (rgb2.r - rgb1.r) * perspectiveZ);
                const g = Math.floor(rgb1.g + (rgb2.g - rgb1.g) * perspectiveZ);
                const b = Math.floor(rgb1.b + (rgb2.b - rgb1.b) * perspectiveZ);
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            } else {
                ctx.strokeStyle = color1;
            }

            ctx.lineWidth = lineWidth;
            
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    } catch (e) {
        console.error("Error in drawTunnel:", e);
    }
};
