import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ToastStateProvider } from '@/hooks/use-toast';
import { Space_Grotesk, Bungee, Orbitron, Press_Start_2P, Roboto_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const bungee = Bungee({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee',
  weight: '400',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start-2p',
  weight: '400',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Music Visualizer',
  description: 'Demoscene-style music visualization toolkit',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The Firebase config is now hardcoded directly in FirebaseClientProvider to ensure reliability.

  return (
    <html lang="en" className={cn(
      `dark`, 
      spaceGrotesk.variable, 
      bungee.variable, 
      orbitron.variable, 
      pressStart2P.variable, 
      robotoMono.variable
    )}>
      <head>
      </head>
      <body className="font-body antialiased min-h-screen bg-background overflow-x-hidden">
          <ToastStateProvider>
            {children}
            <Toaster />
          </ToastStateProvider>
      </body>
    </html>
  );
}
