
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawPhyllotaxis: DrawFunction = ({ ctx, frameCount, width, height, config, freqData }) => {
    if (!config.phyllotaxisConfig || !config.colors) return;
    try {
        const { dotSize, divergence, speed, rainbow } = config.phyllotaxisConfig;
        const bass = freqData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255;
        const reactiveSpeed = speed * (1 + bass * 2);
        const c = dotSize + bass * 1.5;
        const color = config.colors['phyllotaxis']?.[0] || '#FFD700';

        ctx.save();
        ctx.translate(width / 2, height / 2);
        
        const numPoints = 2000; // total number of points in the pattern
        const time = frameCount * reactiveSpeed;

        for (let i = 0; i < numPoints; i++) {
            const pointProgress = (i / numPoints);
            const timeProgress = (time / 100) % 1; // 0 to 1 loop, determines the peak of the alpha wave

            // Creates a "wave" of alpha that travels from the center outwards
            const alpha = Math.pow(1 - Math.abs(pointProgress - timeProgress), 8);
            if (alpha < 0.01) continue;

            const angle = i * (divergence * Math.PI / 180);
            const radius = c * Math.sqrt(i) * 1.5;

            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            if (rainbow) {
                const hue = (i * 0.5) % 360;
                ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${alpha})`;
            } else {
                const rgb = hexToRgb(color);
                if (!rgb) continue;
                ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
            }
            
            const finalDotSize = c * 0.5 * (1 + pointProgress); 

            ctx.beginPath();
            ctx.arc(x, y, finalDotSize, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    } catch(e) {
        console.error("Error in drawPhyllotaxis:", e);
        if (ctx) ctx.restore();
    }
};
