import { useState, type FormEvent } from 'react';
import { useMutation } from '@apollo/client/react';
import { Save, X } from 'lucide-react';
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      toast.error('Failed to update album', {
        id: toastId,
        description: err instanceof Error ? err.message : 'An error occurred',
      });
      console.error('Error updating album:', err);
    }
  };

  return (
    <Card>
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
              <Save className="h-4 w-4" />
              <span>{loading ? 'Updating...' : 'Save'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateAlbumForm;
