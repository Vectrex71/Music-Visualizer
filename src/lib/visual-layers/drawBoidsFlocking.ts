
import type { DrawFunction } from '@/lib/types';

export const drawBoidsFlocking: DrawFunction = ({ ctx, width, height, config }) => {
    try {
        type Boid = { x: number; y: number; vx: number; vy: number; };
        
        if (!(ctx as any).__boids) {
            const numBoids = 80;
            (ctx as any).__boids = Array.from({ length: numBoids }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: Math.random() * 4 - 2,
                vy: Math.random() * 4 - 2,
            }));
        }
        const boids: Boid[] = (ctx as any).__boids;

        const perceptionRadius = 50;
        const maxSpeed = config.boidsSpeed ?? 2;

        boids.forEach(boid => {
            let alignment = { x: 0, y: 0 };
            let cohesion = { x: 0, y: 0 };
            let separation = { x: 0, y: 0 };
            let total = 0;

            boids.forEach(other => {
                const d = Math.hypot(boid.x - other.x, boid.y - other.y);
                if (other !== boid && d < perceptionRadius) {
                    alignment.x += other.vx;
                    alignment.y += other.vy;
                    cohesion.x += other.x;
                    cohesion.y += other.y;
                    if (d < perceptionRadius / 2) {
                        separation.x += (boid.x - other.x) / d;
                        separation.y += (boid.y - other.y) / d;
                    }
                    total++;
                }
            });

            if (total > 0) {
                alignment.x /= total;
                alignment.y /= total;
                boid.vx += (alignment.x - boid.vx) * 0.05;
                boid.vy += (alignment.y - boid.vy) * 0.05;
                
                cohesion.x /= total;
                cohesion.y /= total;
                boid.vx += (cohesion.x - boid.x) * 0.001;
                boid.vy += (cohesion.y - boid.y) * 0.001;

                boid.vx += separation.x * 0.1;
                boid.vy += separation.y * 0.1;
            }
            
            const speed = Math.hypot(boid.vx, boid.vy);
            if (speed > maxSpeed) {
                boid.vx = (boid.vx / speed) * maxSpeed;
                boid.vy = (boid.vy / speed) * maxSpeed;
            }

            boid.x += boid.vx;
            boid.y += boid.vy;

            if (boid.x > width) boid.x = 0;
            else if (boid.x < 0) boid.x = width;
            if (boid.y > height) boid.y = 0;
            else if (boid.y < 0) boid.y = height;
        });
        
        const color = config.colors?.['boids']?.[0] || 'hsl(190, 80%, 70%)';
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;

        boids.forEach(boid => {
            const angle = Math.atan2(boid.vy, boid.vx);
            ctx.save();
            ctx.translate(boid.x, boid.y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(10, 0);
            ctx.lineTo(-5, -5);
            ctx.lineTo(-5, 5);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });

    } catch (e) {
        console.error("Error in drawBoidsFlocking:", e);
    }
};
