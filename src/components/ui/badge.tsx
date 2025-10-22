import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm hover:shadow-md hover:scale-105',
  {
    variants: {
      variant: {
        default:
          'border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 backdrop-blur-sm',
        secondary:
          'border border-border/50 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20',
        outline:
          'border-2 border-border text-foreground hover:border-primary/50 hover:bg-accent/50',
        success:
          'border border-success/20 bg-success/10 text-success hover:bg-success/20',
        gradient:
          'border-0 bg-gradient-to-r from-primary/80 via-accent/80 to-primary/80 text-primary-foreground shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
export { badgeVariants };
