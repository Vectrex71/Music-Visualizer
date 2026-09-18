
import type { DrawFunction } from '@/lib/types';

export const drawWaveform: DrawFunction = ({ ctx, timeData, width, height, config }) => {
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
        const color = config.colors?.['waveform']?.[0] || '#e025e5';
        const bufferLength = timeData.length;
        const amplitude = config.waveformConfig?.amplitude ?? 1.0;
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        const sliceWidth = drawWidth / bufferLength;
        let x = startX;
        for (let i = 0; i < bufferLength; i++) {
            const v = timeData[i] / 128.0; // value between 0 and 2
            // Center is at height / 2. Deviation is (v - 1) * height / 2.
            const y = (height / 2) + (v - 1) * (height / 2) * amplitude;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        ctx.stroke();
        ctx.restore();
    } catch (e) {
        console.error("Error in drawWaveform:", e);
    }
};
