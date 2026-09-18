
'use client';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { VisualLayer } from '@/lib/types';
import { cn } from '@/lib/utils';

type LayerCardProps = {
    layer: VisualLayer;
    isSelected: boolean;
    onToggle: (id: string) => void;
    isProcessing: boolean;
};

const LayerCard = ({ layer, isSelected, onToggle, isProcessing }: LayerCardProps) => {
    // Robustness check to prevent crashes
    if (!layer || !layer.id || !layer.imageId || !layer.name) {
      return null;
    }
    
    const gifSrc = `/${layer.imageId}.gif`;

    return (
      <div>
        <Checkbox id={layer.id} checked={isSelected} onCheckedChange={() => onToggle(layer.id)} className="sr-only" disabled={isProcessing} />
        <Label htmlFor={layer.id} className="cursor-pointer block">
          <Card
            className={cn(
              'transition-all',
              isSelected ? 'border-primary' : 'hover:border-accent'
            )}
          >
            <CardContent className="p-2 space-y-2">
              <div className="aspect-video w-full overflow-hidden rounded-md bg-black/20">
                <img
                  src={gifSrc}
                  alt={`${layer.name} preview`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  draggable="false"
                />
              </div>
              <p className="text-xs font-medium text-center">{layer.name}</p>
            </CardContent>
          </Card>
        </Label>
      </div>
    );
};

export default React.memo(LayerCard);
