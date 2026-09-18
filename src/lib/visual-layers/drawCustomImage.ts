
import type { DrawFunction } from '@/lib/types';

export const drawCustomImage: DrawFunction = ({ ctx, width, height, config, customImageElement }) => {
    if (!customImageElement || !customImageElement.src || customImageElement.naturalWidth === 0 || !config.customBgImageMode || !config.customBgImagePosition) return;
    try {
        const { customBgImageMode: mode, customBgImagePosition: position } = config;

        if (mode === 'fill') {
            ctx.drawImage(customImageElement, 0, 0, width, height);
            return;
        }

        const canvasAspect = width / height;
        const imageAspect = customImageElement.naturalWidth / customImageElement.naturalHeight;

        let dWidth: number, dHeight: number, dx: number, dy: number;

        if (mode === 'cover') {
            if (imageAspect > canvasAspect) { // Image is wider than canvas
                dHeight = height;
                dWidth = dHeight * imageAspect;
                dx = (width - dWidth) * (position.x / 100);
                dy = 0;
            } else { // Image is taller than or same aspect as canvas
                dWidth = width;
                dHeight = dWidth / imageAspect;
                dx = 0;
                dy = (height - dHeight) * (position.y / 100);
            }
        } else { // mode === 'contain'
            if (imageAspect > canvasAspect) { // Image is wider than canvas
                dWidth = width;
                dHeight = dWidth / imageAspect;
                dx = 0;
                dy = (height - dHeight) * (position.y / 100);
            } else { // Image is taller than or same aspect as canvas
                dHeight = height;
                dWidth = dHeight * imageAspect;
                dx = (width - dWidth) * (position.x / 100);
                dy = 0;
            }
        }

        ctx.drawImage(customImageElement, dx, dy, dWidth, dHeight);

    } catch (e) {
        console.error("Error in drawCustomImage:", e);
    }
};
