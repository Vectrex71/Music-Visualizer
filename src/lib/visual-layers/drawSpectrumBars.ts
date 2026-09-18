
import type { DrawFunction } from '@/lib/types';

export const drawSpectrumBars: DrawFunction = ({ ctx, freqData, width, height, config }) => {
    try {
        ctx.save();
        const transform = config.visualizerTransform;
        
        const centerX = width / 2;
        const centerY = height / 2;

        if (transform) {
            const offsetX = width * (transform.offsetX / 100);
            const offsetY = height * (transform.offsetY / 100);
            
            ctx.translate(centerX + offsetX, centerY + offsetY);
            ctx.rotate(transform.rotation * Math.PI / 180);
            ctx.scale(transform.size / 100, transform.size / 100);
            ctx.translate(-centerX, -centerY);
        }

        const drawWidth = Math.hypot(width, height);
        const startX = (width - drawWidth) / 2;
        const color1 = config.colors?.['spectrum']?.[0] || '#e025e5';
        const color2 = config.colors?.['spectrum']?.[1] || color1;
        
        const numBars = 64; 
        const barWidth = drawWidth / numBars;
        
        let x = startX;
        for (let i = 0; i < numBars; i++) {
            const barHeight = (freqData[i] / 255) * height * 0.9;
            
            if (barHeight > 0) {
                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                gradient.addColorStop(0, color1);
                gradient.addColorStop(1, color2);
                ctx.fillStyle = gradient;
                ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
            }
            x += barWidth;
        }
        ctx.restore();
    } catch (e) {
        console.error("Error in drawSpectrumBars:", e);
    }
};
