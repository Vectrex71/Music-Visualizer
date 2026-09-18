
import type { DrawFunction } from '@/lib/types';

export const drawCrtGlitch: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    if (!config.crtGlitchConfig) return;
    try {
        const { intensity } = config.crtGlitchConfig;
        if (intensity <= 0) return;

        // 1. Global Flicker (Subtle brightness variation)
        if (Math.random() < 0.1 * intensity) {
            ctx.save();
            ctx.globalCompositeOperation = 'screen'; // Changed from overlay
            ctx.fillStyle = `rgba(255, 255, 255, ${0.03 * intensity})`;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }

        // 2. Horizontal "Tearing" / Shifts
        // Increased frequency and variety
        if (Math.random() < 0.25 * intensity) {
            const y = Math.random() * height;
            const h = Math.random() * (50 * intensity) + 2;
            const xOffset = (Math.random() - 0.5) * 60 * intensity;
            
            // Use drawImage to shift a slice of the canvas
            ctx.drawImage(ctx.canvas, 0, y, width, h, xOffset, y, width, h);
        }
        
        // 3. RGB Split / Color Ghosting
        // More pronounced and frequent
        if (Math.random() < 0.15 * intensity) {
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = 0.4 * intensity;
            
            const offsetX = (Math.random() - 0.5) * 10 * intensity;
            const offsetY = (Math.random() - 0.5) * 5 * intensity;
            
            // Draw the whole canvas slightly offset
            ctx.drawImage(ctx.canvas, offsetX, offsetY);
            
            ctx.restore();
        }

        // 4. Static Noise Patches
        if (Math.random() < 0.05 * intensity) {
            const patchW = Math.random() * width;
            const patchH = Math.random() * 20 + 5;
            const patchX = Math.random() * (width - patchW);
            const patchY = Math.random() * (height - patchH);

            ctx.save();
            ctx.globalAlpha = 0.1 * intensity;
            for (let i = 0; i < 10; i++) {
                ctx.fillStyle = Math.random() > 0.5 ? '#fff' : '#000';
                ctx.fillRect(
                    patchX + Math.random() * patchW, 
                    patchY + Math.random() * patchH, 
                    Math.random() * 2 + 1, 
                    Math.random() * 2 + 1
                );
            }
            ctx.restore();
        }

        // 5. Vertical Jitter (Global)
        if (Math.random() < 0.02 * intensity) {
            const vOffset = (Math.random() - 0.5) * 4 * intensity;
            ctx.drawImage(ctx.canvas, 0, vOffset);
        }

    } catch(e) {
        console.error("Error in drawCrtGlitch", e);
    }
};
