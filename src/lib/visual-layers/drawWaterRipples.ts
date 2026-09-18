
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawWaterRipples: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        const { ripplesConfig, colors } = config;
        if (!ripplesConfig) return;

        const { speed, thickness, spawnRate } = ripplesConfig;
        const color = colors?.['water-ripples']?.[0] || '#FFFFFF';

        if (!(ctx as any).__ripples) {
            (ctx as any).__ripples = [];
        }

        const ripples: {x: number, y: number, radius: number, life: number, maxLife: number, maxRadius: number}[] = (ctx as any).__ripples;
        
        const spawnInterval = Math.max(1, 310 - spawnRate);

        if (frameCount % spawnInterval === 0) {
            ripples.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: 0,
                life: 150, 
                maxLife: 150,
                maxRadius: Math.random() * 100 + 50
            });
        }
        
        ctx.lineWidth = thickness;

        for (let i = ripples.length - 1; i >= 0; i--) {
            const ripple = ripples[i];
            ripple.radius += speed;
            ripple.life -= 1;

            if (ripple.life <= 0 || ripple.radius > ripple.maxRadius) {
                ripples.splice(i, 1);
                continue;
            }

            const alpha = (ripple.life / ripple.maxLife) * 0.5 * (1 - (ripple.radius / ripple.maxRadius));
            
            const rgb = hexToRgb(color);
            if (rgb) {
                ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
            } else {
                 ctx.strokeStyle = `rgba(220, 225, 230, ${alpha})`;
            }

            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    } catch (e) {
        console.error("Error in drawWaterRipples:", e);
    }
};
