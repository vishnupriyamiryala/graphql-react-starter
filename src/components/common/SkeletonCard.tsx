import { Card, CardContent, CardHeader } from '../ui/card';

export const UserCardSkeleton = () => {
  return (
    <Card className="h-full animate-pulse">
      <CardContent className="p-5">
        {/* Avatar & Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-muted"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded bg-muted"></div>
            <div className="h-3 bg-muted rounded flex-1"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded bg-muted"></div>
            <div className="h-3 bg-muted rounded flex-1"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded bg-muted"></div>
            <div className="h-3 bg-muted rounded flex-1"></div>
          </div>
        </div>

        {/* View Profile CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-4 w-4 rounded bg-muted"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export const PostCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-muted"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/4"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AlbumCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 flex-1">
            <div className="w-14 h-14 rounded-xl bg-muted"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-3 bg-muted rounded w-1/3"></div>
            </div>
          </div>
          <div className="h-9 w-16 bg-muted rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
};
