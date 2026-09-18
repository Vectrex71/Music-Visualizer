
import type { DrawFunction } from '@/lib/types';

export const drawSpirograph: DrawFunction = ({ ctx, freqData, frameCount, width, height, config }) => {
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
            // Don't translate back
        }

        const color = config.colors?.['spirograph']?.[0] || '#e025e5';
        const time = frameCount * 0.05;
        
        const bass = freqData[2] / 255;
        const mids = freqData[30] / 255;
        const highs = freqData[80] / 255;

        const R = Math.min(width, height) * (0.2 + bass * 0.2);
        const r = R * (0.4 + mids * 0.3);
        const d = r * (0.6 + highs * 0.4);

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        
        const maxPoints = 500;
        for (let i = 0; i < maxPoints; i++) {
            const t = (i / maxPoints) * Math.PI * 10;
            const k = (R - r) / r;

            const x = (R - r) * Math.cos(t + time*0.1) + d * Math.cos(k * (t + time*0.1));
            const y = (R - r) * Math.sin(t + time*0.1) - d * Math.sin(k * (t + time*0.1));

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        ctx.restore();
    } catch (e) {
        console.error("Error in drawSpirograph:", e);
    }
};
