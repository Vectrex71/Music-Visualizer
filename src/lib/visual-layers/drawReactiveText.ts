
import type { DrawFunction } from '@/lib/types';

export const drawReactiveText: DrawFunction = ({ ctx, freqData, width, height, config, frameCount }) => {
    if (!config.reactiveTextConfig || !config.visualizerTransform || !config.colors) return;
    try {
        const { text, fontFamily, rainbow } = config.reactiveTextConfig;
        const { size, rotation, offsetX, offsetY } = config.visualizerTransform;
        const color = config.colors['reactive-text']?.[0] || '#FFFFFF';

        const bass = freqData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255;
        const treble = freqData.slice(60, 100).reduce((a, b) => a + b, 0) / 40 / 255;
        
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const baseFontSize = 100 * (size / 100);
        const responsiveFontSize = baseFontSize + (bass * 50);
        
        const baseFontWeight = 400;
        const responsiveFontWeight = baseFontWeight + Math.floor(treble * 500);

        ctx.font = `${responsiveFontWeight} ${responsiveFontSize}px "${fontFamily}", sans-serif`;

        if (rainbow) {
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            const hueOffset = frameCount * 2;
            gradient.addColorStop(0, `hsl(${hueOffset % 360}, 90%, 70%)`);
            gradient.addColorStop(0.5, `hsl(${(hueOffset + 120) % 360}, 90%, 70%)`);
            gradient.addColorStop(1, `hsl(${(hueOffset + 240) % 360}, 90%, 70%)`);
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = color;
        }

        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        
        const transformX = width * (offsetX / 100);
        const transformY = height * (offsetY / 100);

        ctx.translate(width/2 + transformX, height/2 + transformY);
        ctx.rotate(rotation * Math.PI / 180);

        ctx.fillText(text, 0, 0);
        
        ctx.restore();

    } catch (e) {
        console.error("Error in drawReactiveText:", e);
        if (ctx) ctx.restore();
    }
};
