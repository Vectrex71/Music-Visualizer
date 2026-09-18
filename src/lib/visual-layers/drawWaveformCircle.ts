
import type { DrawFunction } from '@/lib/types';

export const drawWaveformCircle: DrawFunction = ({ ctx, timeData, width, height, config }) => {
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
            ctx.translate(centerX, centerY);
        }

        const color = config.colors?.['wave-circle']?.[0] || '#e025e5';
        const bufferLength = timeData.length;
        const baseRadius = Math.min(width, height) * 0.2;
        const modulation = Math.min(width, height) * 0.15;

        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        
        ctx.beginPath();

        for (let i = 0; i <= bufferLength; i++) {
            const angle = (i / bufferLength) * Math.PI * 2 - Math.PI / 2;
            const v = timeData[i % bufferLength] / 128.0;
            const radius = baseRadius + (v - 1) * modulation;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    } catch (e) {
        console.error("Error in drawWaveformCircle:", e);
        if (ctx) ctx.restore();
    }
};
