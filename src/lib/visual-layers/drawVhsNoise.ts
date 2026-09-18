
import type { DrawFunction } from '@/lib/types';

export const drawVhsNoise: DrawFunction = ({ ctx, frameCount, width, height }) => {
    try {
        // Simple noise lines
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.1})`;
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const w = Math.random() * 50 + 10;
            const h = 1;
            ctx.fillRect(x, y, w, h);
        }

        const rollSpeed = 2.5;
        const rollHeight = Math.random() * 40 + 20;
        const rollY = (frameCount * rollSpeed) % (height + rollHeight) - rollHeight;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + Math.random() * 0.05})`;
        ctx.fillRect(0, rollY, width, rollHeight);
        
        if (Math.random() > 0.92) {
            const y = Math.random() * height;
            const h = Math.random() * 20 + 2;
            const xOffset = (Math.random() - 0.5) * 30;
            
            ctx.fillStyle = `rgba(255,255,255,0.08)`;
            ctx.fillRect(xOffset, y, width, h);
        }
    } catch (e) {
        console.error("Error in drawVhsNoise:", e);
    }
};
