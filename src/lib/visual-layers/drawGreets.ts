
import type { DrawFunction } from '@/lib/types';

export const drawGreets: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    if (!config.greetsConfig || !config.colors) return;
    try {
        const { speed, fontSize, fontFamily, textLines, rainbow } = config.greetsConfig;
        const color = config.colors['greets']?.[0] || '#FFFFFF';

        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = `${fontSize}px "${fontFamily}", monospace`;

        const lineHeight = fontSize * 1.5;
        const totalHeight = textLines.length * lineHeight;
        const scrollOffset = (frameCount * speed) % (totalHeight + height);

        for (let i = 0; i < textLines.length; i++) {
            const y = height - scrollOffset + i * lineHeight;
            
            if (y > -lineHeight && y < height + lineHeight) {
                if (rainbow) {
                    const hue = (frameCount * speed + i * 20) % 360;
                    ctx.fillStyle = `hsl(${hue}, 90%, 70%)`;
                } else {
                    ctx.fillStyle = color;
                }
                ctx.fillText(textLines[i], width / 2, y);
            }
        }
        ctx.restore();
    } catch(e) {
        console.error("Error in drawGreets", e);
        if(ctx) ctx.restore();
    }
};
