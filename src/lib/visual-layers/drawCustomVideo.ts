
import type { DrawFunction } from '@/lib/types';

export const drawCustomVideo: DrawFunction = ({ ctx, width, height, config, customVideoElement }) => {
    if (!customVideoElement || !customVideoElement.src || customVideoElement.HAVE_NOTHING || !config.customBgImageMode || !config.customBgImagePosition) return;
    try {
        const { customBgImageMode: mode, customBgImagePosition: position } = config;

        if (mode === 'fill') {
            ctx.drawImage(customVideoElement, 0, 0, width, height);
            return;
        }

        const canvasAspect = width / height;
        const videoAspect = customVideoElement.videoWidth / customVideoElement.videoHeight;
        const imageAspect = videoAspect; // for copy-paste compatibility

        let dWidth: number, dHeight: number, dx: number, dy: number;

        if (mode === 'cover') {
            if (videoAspect > canvasAspect) { // Video is wider than canvas
                dHeight = height;
                dWidth = dHeight * videoAspect;
                dx = (width - dWidth) * (position.x / 100);
                dy = 0;
            } else { // Video is taller or same aspect
                dWidth = width;
                dHeight = dWidth / imageAspect;
                dx = 0;
                dy = (height - dHeight) * (position.y / 100);
            }
        } else { // mode === 'contain'
            if (videoAspect > canvasAspect) { // Video is wider than canvas
                dWidth = width;
                dHeight = dWidth / videoAspect;
                dx = 0;
                dy = (height - dHeight) * (position.y / 100);
            } else { // Video is taller or same aspect
                dHeight = height;
                dWidth = dHeight * videoAspect;
                dx = (width - dWidth) * (position.x / 100);
                dy = 0;
            }
        }

        ctx.drawImage(customVideoElement, dx, dy, dWidth, dHeight);
    } catch (e) {
        console.error("Error in drawCustomVideo:", e);
    }
};
