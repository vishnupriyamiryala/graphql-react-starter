import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  description?: string;
}

const EmptyState = ({ message, description }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] py-12">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
          <Inbox className="w-8 h-8 text-muted-foreground" />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">
          {message}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
