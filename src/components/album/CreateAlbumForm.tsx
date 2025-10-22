import { useState, type FormEvent } from 'react';
import { useMutation } from '@apollo/client/react';
import { Plus, X } from 'lucide-react';
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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

      toast.success('Album created successfully! 🎉', {
        id: toastId,
        description: `"${title.trim()}" has been added to the collection`,
      });

      setTitle('');
      setTimeout(() => {
        onSuccess();
      }, 300);
    } catch (err) {
      toast.error('Failed to create album', {
        id: toastId,
        description: err instanceof Error ? err.message : 'An error occurred',
      });
      console.error('Error creating album:', err);
    }
  };

  return (
    <Card>
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
              <Plus className="h-4 w-4" />
              <span>{loading ? 'Creating...' : 'Create Album'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAlbumForm;
