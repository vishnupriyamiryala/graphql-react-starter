import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useMutation } from '@apollo/client/react';
import { Save, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { UPDATE_ALBUM } from '../../graphql/mutations';
import type { UpdateAlbumData, Album } from '../../types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface UpdateAlbumFormProps {
  album: Album;
  onSuccess: () => void;
  onCancel: () => void;
}

const UpdateAlbumForm = ({
  album,
  onSuccess,
  onCancel,
}: UpdateAlbumFormProps) => {
  const [title, setTitle] = useState(album.title);
  const [updateAlbum, { loading }] = useMutation<UpdateAlbumData>(UPDATE_ALBUM);
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to form when it mounts
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

  const performUpdate = async () => {
    if (!title.trim()) {
      return;
    }

    const toastId = toast.loading('Updating album...', {
      description: 'Please wait while we save your changes',
    });

    try {
      await updateAlbum({
        variables: {
          id: album.id,
          input: {
            title: title.trim(),
          },
        },
      });

      toast.success('Album updated successfully! ✨', {
        id: toastId,
        description: `Updated "${title.trim()}"`,
      });

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

      toast.error('Failed to update album', {
        id: toastId,
        description: errorMessage,
        action: {
          label: 'Try Again',
          onClick: (e) => {
            e?.preventDefault?.();
            performUpdate();
          },
        },
      });

      // Safely log error without circular references
      console.error('Error updating album:', {
        message: err instanceof Error ? err.message : String(err),
        name: err instanceof Error ? err.name : 'Unknown',
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await performUpdate();
  };

  return (
    <Card ref={formRef} className="relative">
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-semibold">Updating album...</span>
          </div>
        </div>
      )}
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="update-album-title"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Album Title
            </label>
            <Input
              id="update-album-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter album title"
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
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateAlbumForm;
