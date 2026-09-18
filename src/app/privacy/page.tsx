import Link from 'next/link';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - Music Visualizer',
  description: 'Privacy policy and data protection information for Music Visualizer.',
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-4 h-4 mr-1 inline-block" /> Legal & Privacy
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl font-headline">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Transparency regarding data protection and user privacy.
          </p>
        </div>

        <div className="grid gap-6 mt-8">
          <Card className="border border-border bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">1. Overview of Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you can be personally identified.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">2. Local Processing of Audio Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                All music files and images uploaded by you for visualization are processed exclusively and directly in your web browser (client-side). There is no permanent storage of your private media files on our external servers.
              </p>
            </CardContent>
          </Card>
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
