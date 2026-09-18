
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawStarfield: DrawFunction = ({ ctx, freqData, frameCount, width, height, config }) => {
    try {
        const STAR_COUNT = 800;
        const direction = config.starfieldDirection || 'forward';
        const starConfig = config.starfieldConfig || { 
            speed: 1, 
            rotation: 0, 
            rainbow: false,
            starSize: 1,
            shape: 'point',
            spreadX: 100,
            spreadY: 100,
            reactive: false,
            reactiveSensitivity: 0.5
        };
        const color = config.colors?.['starfield']?.[0] || '#FFFFFF';

        // Music reactivity
        const bass = freqData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255;
        const sensitivity = starConfig.reactiveSensitivity ?? 0.5;
        const reactiveShift = starConfig.reactive ? bass * 150 * sensitivity : 0;
        const speedMultiplier = starConfig.reactive ? 1 + bass * 4 * sensitivity : 1;

        // Calculate diagonal to ensure full coverage during rotation
        const diagonal = Math.sqrt(width * width + height * height);
        const spawnWidth = diagonal * 1.5; // Extra buffer
        const spawnHeight = diagonal * 1.5;

        // Re-initialize stars on resize, direction change, or first run
        if (!(ctx as any).__stars || (ctx as any).__starDirection !== direction || (ctx as any).__starWidth !== width || (ctx as any).__starHeight !== height) {
            (ctx as any).__starDirection = direction;
            (ctx as any).__starWidth = width;
            (ctx as any).__starHeight = height;
            const maxDim = Math.max(width, height);

            if (direction === 'forward') {
                (ctx as any).__stars = Array.from({ length: STAR_COUNT }, () => ({
                    x: (Math.random() - 0.5) * spawnWidth,
                    y: (Math.random() - 0.5) * spawnHeight,
                    z: Math.random() * maxDim,
                    hue: Math.random() * 360,
                }));
            } else {
                // Side-scrolling initialization
                (ctx as any).__stars = Array.from({ length: STAR_COUNT }, () => ({
                    x: (Math.random() - 0.5) * spawnWidth,
                    y: (Math.random() - 0.5) * spawnHeight,
                    z: Math.random() * width, 
                    hue: Math.random() * 360,
                }));
            }
        }

        const stars: {x:number, y:number, z:number, hue: number}[] = (ctx as any).__stars;
        
        const centerX = width / 2 + (starConfig.offsetX ?? 0);
        const centerY = height / 2 + (starConfig.offsetY ?? 0);

        const spreadX = (starConfig.spreadX ?? 100) / 100;
        const spreadY = (starConfig.spreadY ?? 100) / 100;
        const baseSize = (starConfig.starSize ?? 1);

        ctx.save();
        // Global rotation
        if (starConfig.rotation !== 0) {
            ctx.translate(centerX, centerY);
            ctx.rotate(starConfig.rotation * Math.PI / 180);
            ctx.translate(-centerX, -centerY);
        }

        const drawShape = (x: number, y: number, size: number, shape: string) => {
            if (shape === 'point') {
                ctx.beginPath();
                ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (shape === 'square') {
                ctx.fillRect(x - size / 2, y - size / 2, size, size);
            } else if (shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(x, y - size / 2);
                ctx.lineTo(x + size / 2, y + size / 2);
                ctx.lineTo(x - size / 2, y + size / 2);
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.fillRect(x - size / 2, y - size / 2, size, size);
            }
        };

        for (const star of stars) {
            if (direction === 'forward') {
                const maxDim = Math.max(width, height); 
                star.z -= 2 * starConfig.speed * speedMultiplier;
                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * spawnWidth;
                    star.y = (Math.random() - 0.5) * spawnHeight;
                    star.z = maxDim;
                }
                
                if (star.z === 0) continue;
                
                const k = 128 / star.z;
                const px = star.x * k * spreadX + centerX;
                const py = star.y * k * spreadY + centerY - reactiveShift;
                
                const size = ((maxDim - star.z) / maxDim) * 2 * baseSize;

                // Draw if within visible area (plus buffer for rotation)
                if (px > -diagonal && px < width + diagonal && py > -diagonal && py < height + diagonal) {
                    if (starConfig.rainbow) {
                        ctx.fillStyle = `hsl(${star.hue}, 100%, 70%)`;
                    } else {
                        ctx.fillStyle = color;
                    }
                    const s = Math.max(1, size);
                    drawShape(px, py, s, starConfig.shape);
                }
            } else { // Side-scrolling
                const rgb = hexToRgb(color);
                const parallaxFactor = star.z / width;
                const scrollSpeed = parallaxFactor * 2.5 * starConfig.speed * speedMultiplier;

                if (direction === 'left-right') {
                    star.x += scrollSpeed;
                    if (star.x > spawnWidth / 2) {
                        star.x = -spawnWidth / 2;
                        star.y = (Math.random() - 0.5) * spawnHeight;
                    }
                } else { // 'right-left'
                    star.x -= scrollSpeed;
                     if (star.x < -spawnWidth / 2) {
                        star.x = spawnWidth / 2;
                        star.y = (Math.random() - 0.5) * spawnHeight;
                    }
                }
                
                const px = star.x * spreadX + centerX;
                const py = star.y * spreadY + centerY - reactiveShift;
                const size = parallaxFactor * 2 * baseSize;
                const alpha = 0.2 + parallaxFactor * 0.8;
                
                if (starConfig.rainbow) {
                    ctx.fillStyle = `hsla(${star.hue}, 100%, 70%, ${alpha})`;
                } else if (rgb) {
                    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
                } else {
                    ctx.fillStyle = color;
                }
                
                // Draw if within visible area (plus buffer for rotation)
                if (px > -diagonal && px < width + diagonal && py > -diagonal && py < height + diagonal) {
                    if (size > 0.1) { 
                        drawShape(px, py, size, starConfig.shape);
                    }
                }
            }
        }
        ctx.restore();
    } catch (e) {
        console.error("Error in drawStarfield:", e);
    }
};
