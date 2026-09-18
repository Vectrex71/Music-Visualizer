
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccountDetails from '@/components/account/account-details';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg relative">
          <CardHeader>
            <CardTitle>My Account</CardTitle>
          </CardHeader>
          <CardContent>
              <AccountDetails />
          </CardContent>
           <div className="absolute top-4 right-4">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Link href="/creator">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </Link>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
