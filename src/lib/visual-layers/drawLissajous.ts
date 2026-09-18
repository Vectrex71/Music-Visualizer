
import type { DrawFunction } from '@/lib/types';

export const drawLissajous: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        ctx.save();
        const transform = config.visualizerTransform;
        const { lissajousConfig } = config;
        if (!lissajousConfig || !transform) {
            ctx.restore();
            return;
        };

        const { speed, thickness, shape, rainbow } = lissajousConfig;

        const centerX = width / 2;
        const centerY = height / 2;
        const offsetX = width * (transform.offsetX / 100);
        const offsetY = height * (transform.offsetY / 100);
        
        ctx.translate(centerX + offsetX, centerY + offsetY);
        ctx.rotate(transform.rotation * Math.PI / 180);
        ctx.scale(transform.size / 100, transform.size / 100);
        ctx.translate(-centerX, -centerY);

        const color = config.colors?.['lissajous']?.[0] || '#87CEEB';
        const time = frameCount * 0.01 * speed;
        
        const A = width * 0.35;
        const B = height * 0.35;
        
        const [a, b] = shape.split(':').map(Number);
        if (isNaN(a) || isNaN(b)) {
            ctx.restore();
            return;
        }
        
        const delta = Math.PI / 2;

        ctx.lineWidth = thickness;
        ctx.shadowColor = rainbow ? 'white' : color;
        ctx.shadowBlur = 8;
        
        const points = 500;
        
        if (rainbow) {
            for (let i = 0; i < points; i++) {
                const hue = (time * 50 + (i / points) * 360) % 360;
                ctx.strokeStyle = `hsl(${hue}, 90%, 70%)`;
                
                ctx.beginPath();
                const t1 = (i / points) * Math.PI * 4;
                const x1 = centerX + A * Math.sin(a * t1 + delta + time);
                const y1 = centerY + B * Math.sin(b * t1 + time * 0.5);
                ctx.moveTo(x1, y1);
                
                const t2 = ((i + 1) / points) * Math.PI * 4;
                const x2 = centerX + A * Math.sin(a * t2 + delta + time);
                const y2 = centerY + B * Math.sin(b * t2 + time * 0.5);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        } else {
            ctx.strokeStyle = color;
            ctx.beginPath();
            for (let i = 0; i <= points; i++) {
                const t = (i / points) * Math.PI * 4;
                const x = centerX + A * Math.sin(a * t + delta + time);
                const y = centerY + B * Math.sin(b * t + time * 0.5);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        ctx.restore();
    } catch(e) {
        console.error("Error in drawLissajous", e);
        if (ctx) ctx.restore();
    }
}
