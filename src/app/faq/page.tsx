import Link from 'next/link';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'FAQ - Frequently Asked Questions about Music Visualizer',
  description: 'Answers to frequently asked questions regarding usage, audio formats, export features, and Music Visualizer.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'Which audio formats are supported?',
      a: 'Music Visualizer supports all popular web audio formats such as MP3, WAV, AAC, OGG, and FLAC. You can simply upload your music file via drag and drop.'
    },
    {
      q: 'Is Music Visualizer completely free to use?',
      a: 'Yes! Music Visualizer is 100% free with unlimited studio access, exports, and features for everyone.'
    },
    {
      q: 'How can I export videos for YouTube or SoundCloud?',
      a: 'In the Creator section, you can customize your visualization in real time and play or record it in your desired format.'
    },
    {
      q: 'Are my uploaded audio files stored on a server?',
      a: 'No, your audio and image files are processed locally in your browser (memory/blob) and are never permanently stored on external servers to guarantee maximum privacy.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header page="landing" />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <Badge className="mb-2 bg-primary/20 text-primary border-primary/30">
            <HelpCircle className="w-4 h-4 mr-1 inline-block" /> Help & Support
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl font-headline">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to the most important questions about the application here.
          </p>
        </div>

        <div className="grid gap-6 mt-8">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="border border-border bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Music Visualizer. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/guides" className="hover:underline">Guides</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
