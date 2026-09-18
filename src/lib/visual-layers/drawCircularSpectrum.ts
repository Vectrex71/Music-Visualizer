
import type { DrawFunction } from '@/lib/types';

export const drawCircularSpectrum: DrawFunction = ({ ctx, freqData, width, height, config }) => {
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
        } else {
            // If for some reason there's no transform, at least center it.
            ctx.translate(centerX, centerY);
        }
        
        const color1 = config.colors?.['circular-spectrum']?.[0] || '#5737e5';
        const color2 = config.colors?.['circular-spectrum']?.[1] || color1;

        const bufferLength = freqData.length;
        const baseRadius = Math.min(width, height) * 0.15;
        const maxBarHeight = Math.min(width, height) * 0.2;

        ctx.strokeStyle = color1;
        ctx.lineWidth = 4;
        ctx.shadowColor = color1;
        ctx.shadowBlur = 8;
        
        const barsToDraw = Math.floor(bufferLength * 0.75); // Use only first 75% of data to avoid empty high frequencies

        for (let i = 0; i < barsToDraw; i++) {
            const barHeight = (freqData[i] / 255) * maxBarHeight;
            // Map the used bars to a full 360 degrees
            const angle = (i / barsToDraw) * Math.PI * 2 - Math.PI / 2;
            
            const startX = Math.cos(angle) * baseRadius;
            const startY = Math.sin(angle) * baseRadius;
            const endX = Math.cos(angle) * (baseRadius + barHeight);
            const endY = Math.sin(angle) * (baseRadius + barHeight);
            
            if (barHeight > 1) {
                const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
                gradient.addColorStop(0, color1);
                gradient.addColorStop(1, color2);
                ctx.strokeStyle = gradient;

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
        }
        ctx.restore();
    } catch (e) {
        console.error("Error in drawCircularSpectrum:", e);
        if (ctx) ctx.restore();
    }
};
