import { AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ErrorMessageProps {
  error: Error | { message: string };
  retry?: () => void;
}

const ErrorMessage = ({ error, retry }: ErrorMessageProps) => {
  const errorMessage = error.message || 'An unexpected error occurred';

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="max-w-md">
        <Alert variant="destructive">
          <div className="flex items-start gap-3 p-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>

            <div className="flex-1">
              <AlertTitle className="text-base font-semibold mb-1">
                Something went wrong
              </AlertTitle>
              <AlertDescription className="text-sm mb-4">
                {errorMessage}
              </AlertDescription>

              {retry && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    retry();
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </Alert>
      </Card>
    </div>
  );
};

export default ErrorMessage;
