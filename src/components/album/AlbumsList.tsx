import { useState } from 'react';
import { Plus, Music2, Loader2 } from 'lucide-react';
import type { Album as AlbumType } from '../../types';
import AlbumItem from './AlbumItem.tsx';
import CreateAlbumForm from './CreateAlbumForm.tsx';
import { Button } from '../ui/button';
import EmptyState from '../common/EmptyState';

interface AlbumsListProps {
  albums: AlbumType[];
  userId: string;
  onAlbumCreated: () => void;
  onAlbumUpdated: () => void;
  loading?: boolean;
}

const AlbumsList = ({
  albums,
  userId,
  onAlbumCreated,
  onAlbumUpdated,
  loading = false,
}: AlbumsListProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleAlbumCreated = () => {
    setShowCreateForm(false);
    onAlbumCreated();
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const handleAlbumUpdated = () => {
    onAlbumUpdated();
  };

  const displayAlbums = albums;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Music2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Albums</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {displayAlbums.length}{' '}
              {displayAlbums.length === 1 ? 'album' : 'albums'}
            </p>
          </div>
        </div>
        {!showCreateForm && (
          <Button
            onClick={() => setShowCreateForm(true)}
            size="sm"
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            New Album
          </Button>
        )}
      </div>

      {showCreateForm && (
        <CreateAlbumForm
          userId={userId}
          onSuccess={handleAlbumCreated}
          onCancel={handleCancelCreate}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading albums...</p>
          </div>
        </div>
      ) : displayAlbums.length === 0 ? (
        <EmptyState
          message="No albums yet"
          description="Create your first album using the button above"
        />
      ) : (
        <div className="space-y-3">
          {displayAlbums.map((album, index) => (
            <AlbumItem
              key={album.id}
              album={album}
              index={index}
              onUpdated={handleAlbumUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumsList;
