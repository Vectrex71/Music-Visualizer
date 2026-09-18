
import type { DrawFunction } from '@/lib/types';

export const drawCopperBars: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        const { size = 100, speed = 1, thickness = 20, rotation = 0, offsetX = 0, offsetY = 0, rainbow = false } = config.copperBarsConfig || {};
        const time = frameCount * 0.02 * speed;
        
        const color1 = config.colors?.['copper-bars']?.[0] || '#FFD700';
        const color2 = config.colors?.['copper-bars']?.[1] || color1;
        
        const centerX = width / 2;
        const centerY = height / 2;

        const scale = size / 100;
        const diagonal = Math.hypot(width, height) / Math.max(0.1, scale);

        ctx.save();
        
        ctx.translate(centerX + (width * offsetX / 100), centerY + (height * offsetY / 100));
        ctx.rotate(rotation * Math.PI / 180);
        ctx.scale(scale, scale);

        const drawWidth = diagonal;
        const drawHeight = diagonal;
        const startX = -drawWidth / 2;
        const startY = -drawHeight / 2;
        const numBars = Math.ceil(drawHeight / 5);

        for (let i = 0; i < numBars; i++) {
            const y = startY + (drawHeight / numBars) * i;
            const waveHeight = Math.sin(time + i * 0.5) * thickness + thickness;
            const waveY = Math.cos(time * 2 + i * 0.3) * 15;
            
            if (rainbow) {
                const hue = (time * 20 + i * 2) % 360;
                ctx.fillStyle = `hsl(${hue}, 90%, 60%)`;
            } else {
                 const gradient = ctx.createLinearGradient(startX, 0, startX + drawWidth, 0);
                 gradient.addColorStop(0, color1);
                 gradient.addColorStop(1, color2);
                 ctx.fillStyle = gradient;
            }
            
            ctx.fillRect(startX, y + waveY, drawWidth, waveHeight);
        }

        ctx.restore();
    } catch (e) {
        console.error("Error in drawCopperBars:", e);
    }
};
