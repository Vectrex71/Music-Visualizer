
import type { DrawFunction } from '@/lib/types';

export const drawFlowerOfLife: DrawFunction = ({ ctx, frameCount, width, height, config, freqData }) => {
    if (!config.flowerOfLifeConfig || !config.colors || !config.visualizerTransform) return;
    try {
        const { rotationSpeed, lineWidth, petalCount, glowIntensity } = config.flowerOfLifeConfig;
        const { size, rotation, offsetX, offsetY } = config.visualizerTransform;

        const bass = freqData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255;
        
        ctx.save();
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.translate(centerX + (width * offsetX / 100), centerY + (height * offsetY / 100));
        ctx.rotate(rotation * Math.PI / 180);
        
        const time = frameCount * 0.01;
        const overallRotation = (time * rotationSpeed * 10) * Math.PI / 180; // Slower base rotation
        ctx.rotate(overallRotation);

        const baseRadius = (Math.min(width, height) * 0.05) * (size / 100);
        
        const color1 = config.colors['flower-of-life']?.[0] || '#FFC700';
        const color2 = config.colors['flower-of-life']?.[1] || '#FF8C00';

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        
        const drawFlower = (radius: number, alpha: number, rotationOffset: number, currentGlow: number) => {
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 3.5);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = alpha;
            ctx.shadowColor = color1;
            ctx.shadowBlur = currentGlow;
            
            // Central circle
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Petals
            for (let i = 0; i < petalCount; i++) {
                const angle = (i / petalCount) * Math.PI * 2 + rotationOffset;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.stroke();
            }
        };

        const breathe = 1 + bass * 0.15;
        const subBreathe = 1 + bass * 0.08;
        const finalGlow = glowIntensity * (1 + bass * 0.5);

        // Draw multiple layers for a more complex, "cooler" look
        drawFlower(baseRadius * 2.5 * subBreathe, 0.3, time * 0.2, finalGlow * 0.5);
        drawFlower(baseRadius * 1.8 * breathe, 0.6, -time * 0.5, finalGlow * 0.8);
        drawFlower(baseRadius * 1.2 * breathe, 1.0, time, finalGlow);

        ctx.restore();
    } catch(e) {
        console.error("Error in drawFlowerOfLife", e);
        if(ctx) ctx.restore();
    }
};
