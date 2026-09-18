
import type { DrawFunction } from '@/lib/types';

export const drawSpriteAnimation: DrawFunction = ({ ctx, frameCount, width, height, config, customSpriteElement }) => {
    if (!customSpriteElement || customSpriteElement.naturalWidth === 0 || !config.spriteLayerConfig) return;
    try {
        const { count, mode, speed, size } = config.spriteLayerConfig;

        // Re-initialize if count changes. Store dx/dy as direction vectors.
        if (!(ctx as any).__sprites || (ctx as any).__spriteCount !== count) {
            (ctx as any).__spriteCount = count;
            (ctx as any).__sprites = Array.from({ length: count }, () => {
                const angle = Math.random() * Math.PI * 2;
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    dx: Math.cos(angle), // Direction vector x
                    dy: Math.sin(angle), // Direction vector y
                    z: Math.random() * 0.5 + 0.5, // for zoom
                    phase: Math.random() * Math.PI * 2
                };
            });
        }

        const sprites: {x:number,y:number,dx:number,dy:number,z:number,phase:number}[] = (ctx as any).__sprites;
        const spriteWidth = width * (size / 100);
        const spriteHeight = spriteWidth * (customSpriteElement.naturalHeight / customSpriteElement.naturalWidth);
        
        sprites.forEach(sprite => {
            ctx.save();
            switch(mode) {
                case 'dvd-bounce':
                    // Apply speed to the direction vector for movement
                    sprite.x += sprite.dx * speed;
                    sprite.y += sprite.dy * speed;

                    // Collision detection
                    if (sprite.x <= 0) { sprite.x = 0; sprite.dx *= -1; }
                    if (sprite.x + spriteWidth >= width) { sprite.x = width - spriteWidth; sprite.dx *= -1; }
                    if (sprite.y <= 0) { sprite.y = 0; sprite.dy *= -1; }
                    if (sprite.y + spriteHeight >= height) { sprite.y = height - spriteHeight; sprite.dy *= -1; }
                    
                    ctx.drawImage(customSpriteElement, sprite.x, sprite.y, spriteWidth, spriteHeight);
                    break;
                case 'hover':
                    sprite.phase += 0.02 * speed;
                    const yOffset = Math.sin(sprite.phase) * 10;
                    ctx.drawImage(customSpriteElement, sprite.x, sprite.y + yOffset, spriteWidth, spriteHeight);
                    break;
                case 'left-right':
                    sprite.x += speed;
                    if (sprite.x > width) sprite.x = -spriteWidth;
                    ctx.drawImage(customSpriteElement, sprite.x, sprite.y, spriteWidth, spriteHeight);
                    break;
                case 'top-bottom':
                     sprite.y += speed;
                    if (sprite.y > height) sprite.y = -spriteHeight;
                    ctx.drawImage(customSpriteElement, sprite.x, sprite.y, spriteWidth, spriteHeight);
                    break;
                case 'zoom':
                    sprite.z += 0.005 * speed;
                    if (sprite.z > 1.5) sprite.z = 0.5;
                    const scale = sprite.z;
                    const scaledWidth = spriteWidth * scale;
                    const scaledHeight = spriteHeight * scale;
                    ctx.globalAlpha = scale * 0.8;
                    ctx.drawImage(customSpriteElement, sprite.x - scaledWidth/2, sprite.y - scaledHeight/2, scaledWidth, scaledHeight);
                    break;
            }
            ctx.restore();
        });
    } catch(e) {
        console.error("Error in drawSpriteAnimation:", e);
    }
};
