# **App Name**: SynthSnap

## Core Features:

- MP3 Upload & Storage: Allow users to upload and securely store their MP3 audio files on the platform.
- Audio Parameter Extraction: A Cloud Function analyzes uploaded MP3s for BPM and amplitude peaks, extracting dynamic control variables for visual effects.
- Visual Layer Configuration UI: Provide an intuitive user interface for selecting, customizing parameters, and arranging various demoscene-style visual layers (Backgrounds, Visualizers, Overlays). All user selections are saved.
- Video Rendering Job Management: Users can initiate and monitor the server-side rendering of their 5-minute visualization videos using FFmpeg in a Cloud Function, combining their audio with chosen visual layers. Rendering job status and details are tracked.
- Generated Video Delivery & Download: Enable users to securely preview and download their final MP4 visualization videos upon completion.
- Ad-Supported Free Access: Integrate AdSense to display advertisements, supporting free access for non-Pro-Pass users.
- Pro-Pass Subscription with Stripe: Implement Stripe integration for users to purchase a 'Pro-Pass' subscription, unlocking premium features such as no watermarks and 4K video exports, with subscription data stored for access control.

## Style Guidelines:

- Color Anchor: 'Demoscene-style', '80s Neon Grid', 'Futuristic Tech'. Dark scheme selected to highlight vibrant elements. Primary color: A striking magenta-purple (#E533CC), vibrant and energetic. Background color: A dark, desaturated purple-gray (#2D1E2B) for a sleek, immersive feel. Accent color: An electric blue-purple (#7E4BF0), offering dynamic contrast and echoing futuristic light trails.
- Headline and Body Font: 'Space Grotesk' (sans-serif), chosen for its computerized, techy, and modern aesthetic, fitting the Demoscene theme.
- Utilize minimalist, line-art or glow-effect icons that mimic retro-futuristic displays and neon lights, ensuring they stand out against the dark background.
- A clean, modular layout with clear delineation of visual components and controls, emphasizing the visualization canvas. Responsive design to accommodate various screen sizes.
- Subtle, smooth transitions for UI element states and layer selections. Incorporate subtle pulsing or digital 'glitch' animations to enhance the retro-tech and Demoscene aesthetic without being distracting.