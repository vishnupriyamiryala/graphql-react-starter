import { useState } from 'react';
import { Edit, Music } from 'lucide-react';
import type { Album as AlbumType } from '../../types';
import UpdateAlbumForm from './UpdateAlbumForm.tsx';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface AlbumItemProps {
  album: AlbumType;
  index?: number;
  onUpdated: () => void;
}

const AlbumItem = ({ album, index = 0, onUpdated }: AlbumItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const albumColors = [
    'from-purple-500 to-pink-600',
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-cyan-600',
    'from-orange-500 to-red-600',
    'from-teal-500 to-green-600',
    'from-rose-500 to-pink-600',
  ];
  const colorIndex = index % albumColors.length;

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    onUpdated();
  };

  if (isEditing) {
    return (
      <UpdateAlbumForm
        album={album}
        onSuccess={handleUpdateSuccess}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${albumColors[colorIndex]} flex items-center justify-center flex-shrink-0 shadow-sm`}
            >
              <Music className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate capitalize">
                {album.title}
              </h4>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                Album #{album.id}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            size="sm"
            className="flex-shrink-0 gap-1.5"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlbumItem;
