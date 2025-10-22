import { Toaster as Sonner } from 'sonner';

const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      richColors={false}
      expand={true}
      duration={3000}
      toastOptions={{
        style: {
          background: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        className: 'backdrop-blur-sm',
      }}
    />
  );
};

export { Toaster };
