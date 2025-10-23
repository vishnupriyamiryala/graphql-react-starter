import { useState, type FormEvent } from 'react';
import { useMutation } from '@apollo/client/react';
import { Plus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { CREATE_ALBUM } from '../../graphql/mutations';
import type { CreateAlbumData } from '../../types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface CreateAlbumFormProps {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateAlbumForm = ({ userId, onSuccess, onCancel }: CreateAlbumFormProps) => {
  const [title, setTitle] = useState('');
  const [createAlbum, { loading }] = useMutation<CreateAlbumData>(CREATE_ALBUM);

  const performCreate = async () => {
    if (!title.trim()) {
      return;
    }

    const toastId = toast.loading('Creating album...', {
      description: 'Please wait while we create your album',
    });

    try {
      await createAlbum({
        variables: {
          input: {
            title: title.trim(),
            userId,
          },
        },
      });

      toast.success('Album created successfully! ', {
        id: toastId,
        description: `"${title.trim()}" has been added to the collection`,
      });

      setTitle('');
      setTimeout(() => {
        onSuccess();
      }, 300);
    } catch (err) {
      // Check if it's a network error (offline)
      const isNetworkError = err instanceof Error &&
        (err.message.includes('Failed to fetch') ||
         err.message.includes('Network request failed') ||
         err.message.includes('NetworkError'));

      const errorMessage = isNetworkError
        ? 'You appear to be offline. Please check your internet connection and try again.'
        : err instanceof Error
          ? err.message
          : 'An error occurred';

      toast.error('Failed to create album', {
        id: toastId,
        description: errorMessage,
        action: {
          label: 'Try Again',
          onClick: (e) => {
            e?.preventDefault?.();
            performCreate();
          },
        },
      });

      // Safely log error without circular references
      console.error('Error creating album:', {
        message: err instanceof Error ? err.message : String(err),
        name: err instanceof Error ? err.name : 'Unknown',
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await performCreate();
  };

  return (
    <Card className="relative">
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-semibold">Creating album...</span>
          </div>
        </div>
      )}
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="album-title"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Album Title
            </label>
            <Input
              id="album-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter album title..."
              disabled={loading}
              required
              className="h-10"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              onClick={onCancel}
              disabled={loading}
              variant="ghost"
              size="sm"
              className="gap-1.5"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              disabled={loading || !title.trim()}
              size="sm"
              className="gap-1.5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Create Album</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAlbumForm;
