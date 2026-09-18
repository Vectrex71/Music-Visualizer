
'use client';

import { CheckCircle2 } from 'lucide-react';

export default function AccountDetails() {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-2">
        <h3 className="font-semibold">Account Status</h3>
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Free & Unlimited Studio Access</span>
        </div>
        <p className="text-sm text-muted-foreground">
          All rendering, 1080p export, custom asset uploads, and template slots are 100% unlocked for your account.
        </p>
      </div>
    </div>
  );
}

