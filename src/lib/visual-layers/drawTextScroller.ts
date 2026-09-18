
import type { DrawFunction } from '@/lib/types';

export const drawTextScroller: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        const { textScrollerConfig } = config;
        if (!textScrollerConfig) return;

        const {
            text,
            speed,
            sinusIntensity,
            fontSize,
            rotation,
            offsetX,
            offsetY,
            rainbow,
            fontFamily,
            mode,
            circleRadius,
        } = textScrollerConfig;

        ctx.save();
        ctx.font = `bold ${fontSize}px "${fontFamily || 'Space Grotesk'}", sans-serif`;
        const color = config.colors?.['text-scroller']?.[0] || '#FFFFFF';
        ctx.shadowColor = rainbow ? 'white' : color;
        ctx.shadowBlur = 15;

        // Cache character widths for performance
        if ((ctx as any).__cachedScrollerText !== text || (ctx as any).__cachedScrollerFontSize !== fontSize || (ctx as any).__cachedScrollerFontFamily !== fontFamily) {
            (ctx as any).__cachedScrollerText = text;
            (ctx as any).__cachedScrollerFontSize = fontSize;
            (ctx as any).__cachedScrollerFontFamily = fontFamily;
            const chars = text.split('');
            (ctx as any).__textScrollerChars = chars.map(char => ({
                char: char,
                width: ctx.measureText(char).width
            }));
            (ctx as any).__textScrollerTotalWidth = (ctx as any).__textScrollerChars.reduce((sum: number, c: {width:number}) => sum + c.width, 0);
        }
        const chars: {char: string, width: number}[] = (ctx as any).__textScrollerChars;
        const totalWidth: number = (ctx as any).__textScrollerTotalWidth;

        if (mode === 'circle') {
            const circleCenterX = width / 2 + (width * (offsetX / 100));
            const circleCenterY = height / 2 + (height * (offsetY / 100));
            const radius = (Math.min(width, height) / 2) * (circleRadius / 100);
            
            const scrollSpeed = -0.005 * speed;
            const startAngle = (frameCount * scrollSpeed) + (rotation * Math.PI / 180);

            let currentAngle = startAngle;

            for (let i = 0; i < chars.length; i++) {
                const charInfo = chars[i];
                const charAngleWidth = totalWidth > 0 ? charInfo.width / radius : 0;
                
                const charAngle = currentAngle + (charAngleWidth / 2);

                const x = circleCenterX + radius * Math.cos(charAngle);
                const y = circleCenterY + radius * Math.sin(charAngle);
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(charAngle + Math.PI / 2);
                
                if (rainbow) {
                    const hue = (frameCount * speed + i * 5) % 360;
                    ctx.fillStyle = `hsl(${hue}, 90%, 70%)`;
                } else {
                    ctx.fillStyle = color;
                }

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(charInfo.char, 0, 0);
                ctx.restore();

                currentAngle += charAngleWidth;
            }
        } else { // sinus mode
            const centerX = width / 2;
            const centerY = height / 2;
            const transformX = width * (offsetX / 100);
            const transformY = height * (offsetY / 100);
            ctx.translate(centerX + transformX, centerY + transformY);
            ctx.rotate(rotation * Math.PI / 180);

            const scrollSpeed = -3 * speed;
            const scrollOffset = frameCount * scrollSpeed;
            
            const drawArea = width * Math.abs(Math.cos(rotation * Math.PI / 180)) + height * Math.abs(Math.sin(rotation * Math.PI / 180)) + totalWidth;
            const startDraw = -drawArea / 2;
            const endDraw = drawArea / 2;

            if (totalWidth > 0) {
                let currentX = (scrollOffset % totalWidth);
                if (currentX > 0) currentX -= totalWidth;

                while (currentX > startDraw) {
                    currentX -= totalWidth;
                }
                
                while (currentX < endDraw) {
                    let xPos = currentX;
                    for(let i = 0; i < chars.length; i++) {
                        const charInfo = chars[i];
                        const y = Math.sin((xPos) * 0.02 + frameCount * 0.05) * sinusIntensity;
                        
                        if (rainbow) {
                            const hue = (frameCount * speed + (xPos / 10)) % 360;
                            ctx.fillStyle = `hsl(${hue}, 90%, 70%)`;
                        } else {
                            ctx.fillStyle = color;
                        }

                        ctx.fillText(charInfo.char, xPos, y);
                        xPos += charInfo.width;
                    }
                    currentX += totalWidth;
                }
            }
        }
        
        ctx.restore();
    } catch (e) {
        console.error("Error in drawTextScroller:", e);
    }
};
