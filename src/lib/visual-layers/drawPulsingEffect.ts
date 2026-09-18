
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawPulsingEffect: DrawFunction = ({ ctx, freqData, frameCount, width, height, config }) => {
    try {
        ctx.save();
        const transform = config.visualizerTransform;
        const { pulsingConfig } = config;
        const shape = pulsingConfig?.shape || 'circle';
        const speed = pulsingConfig?.speed || 1;
        
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

        const color1 = config.colors?.['pulsing']?.[0] || '#5737e5';
        const color2 = config.colors?.['pulsing']?.[1] || color1;
        const bass = (freqData[0] + freqData[1] + freqData[2]) / 3 / 255;
        const timePulse = (Math.sin(frameCount * 0.03 * speed) + 1) / 2;
        
        const baseRadius = Math.min(width, height) * 0.1;
        const bassRadius = bass * (Math.min(width, height) * 0.2);
        const timeRadius = timePulse * 10;

        const finalRadius = baseRadius + bassRadius + timeRadius;
        
        const rgb1 = hexToRgb(color1);
        if(!rgb1) {
            ctx.restore();
            return;
        }

        const drawShape = (radius: number, color: string, lineWidth: number) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            
            if (shape === 'circle') {
                ctx.arc(0, 0, radius, 0, Math.PI * 2);
            } else if (shape === 'square') {
                ctx.rect(-radius, -radius, radius * 2, radius * 2);
            } else if (shape === 'triangle') {
                const h = radius * (Math.sqrt(3)/2);
                ctx.moveTo(0, -radius);
                ctx.lineTo(-h, radius / 2);
                ctx.lineTo(h, radius / 2);
                ctx.closePath();
            }
            
            ctx.stroke();
        };

        drawShape(finalRadius, `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, 0.8)`, 2 + bass * 5);
        
        const rgb2 = hexToRgb(color2);
        if (rgb2) {
            drawShape(finalRadius * 0.7 + timeRadius, `rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, 0.8)`, 2 + bass * 5);
        }
        
        ctx.restore();
    } catch (e) {
        console.error("Error in drawPulsingEffect:", e);
        ctx.restore(); // Ensure context is restored on error
    }
};
