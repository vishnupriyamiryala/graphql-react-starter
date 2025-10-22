import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Building2,
} from 'lucide-react';
import {
  GET_USER_DETAILS,
  GET_USER_POSTS,
  GET_USER_ALBUMS,
} from '../graphql/queries';
import type { UserData, PostsData, AlbumsData } from '../types';
import PostsList from '../components/user/PostsList';
import AlbumsList from '../components/album/AlbumsList';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import {
  PostCardSkeleton,
  AlbumCardSkeleton,
} from '../components/common/SkeletonCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'posts' | 'albums'>('posts');
  const [postsPage, setPostsPage] = useState(1);
  const POSTS_PER_PAGE = 10;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: refetchUser,
  } = useQuery<UserData>(GET_USER_DETAILS, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
  });

  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
    refetch: refetchPosts,
    fetchMore,
  } = useQuery<PostsData>(GET_USER_POSTS, {
    variables: { userId: id, page: 1, limit: POSTS_PER_PAGE },
    skip: !id,
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: albumsLoading,
    error: albumsError,
    data: albumsData,
    refetch: refetchAlbums,
  } = useQuery<AlbumsData>(GET_USER_ALBUMS, {
    variables: { userId: id },
    skip: !id,
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
  });

  const user = userData?.user;
  const posts = postsData?.user?.posts?.data || [];
  const totalPosts = postsData?.user?.posts?.meta?.totalCount || 0;
  const albums = albumsData?.user?.albums?.data || [];

  // Infinite scroll observer
  useEffect(() => {
    const handleLoadMorePosts = () => {
      if (postsLoading || posts.length >= totalPosts) return;

      const nextPage = postsPage + 1;
      fetchMore({
        variables: {
          userId: id,
          page: nextPage,
          limit: POSTS_PER_PAGE,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            user: {
              ...prev.user,
              posts: {
                ...prev.user.posts,
                data: [
                  ...prev.user.posts.data,
                  ...fetchMoreResult.user.posts.data,
                ],
                meta: fetchMoreResult.user.posts.meta,
              },
            },
          };
        },
      });
      setPostsPage(nextPage);
    };

    if (!loadMoreRef.current || activeTab !== 'posts') return;

    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          posts.length < totalPosts &&
          !postsLoading
        ) {
          handleLoadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [
    posts.length,
    totalPosts,
    postsLoading,
    activeTab,
    fetchMore,
    id,
    postsPage,
  ]);

  if (!id) {
    return (
      <EmptyState message="Invalid User" description="No user ID provided." />
    );
  }

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-cyan-500 to-cyan-600',
  ];
  const colorIndex = id ? parseInt(id) % colors.length : 0;

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground font-semibold">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <ErrorMessage
        error={userError || { message: 'User not found' }}
        retry={refetchUser}
      />
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" size="sm" className="gap-2 -ml-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to directory</span>
        </Button>
      </Link>

      {/* User Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold text-3xl sm:text-4xl">
                  {initials}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  {user.name}
                </h1>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      Email
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-success" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {user.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-4 w-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      Company
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.company.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      Location
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {user.address.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex sm:flex-col gap-3">
              <div className="text-center p-4 bg-muted rounded-lg min-w-[80px]">
                <p className="text-2xl font-bold text-foreground">
                  {posts.length}
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  Posts
                </p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg min-w-[80px]">
                <p className="text-2xl font-bold text-foreground">
                  {albums.length}
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  Albums
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="relative border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`relative pb-3 px-1 font-medium transition-all duration-200 ${
              activeTab === 'posts'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Posts</span>
            </div>
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('albums')}
            className={`relative pb-3 px-1 font-medium transition-all duration-200 ${
              activeTab === 'albums'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="text-sm">Albums</span>
            </div>
            {activeTab === 'albums' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {postsLoading && posts.length === 0 ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            ) : postsError ? (
              <ErrorMessage error={postsError} retry={refetchPosts} />
            ) : posts.length === 0 ? (
              <EmptyState
                message="No posts yet"
                description="This user hasn't created any posts"
              />
            ) : (
              <>
                <PostsList posts={posts} />

                {/* Infinite scroll trigger & loading indicator */}
                {posts.length < totalPosts && (
                  <div ref={loadMoreRef} className="flex justify-center py-8">
                    {postsLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm">Loading more posts...</span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Showing {posts.length} of {totalPosts} posts
                      </div>
                    )}
                  </div>
                )}

                {posts.length >= totalPosts && posts.length > 0 && (
                  <div className="text-center py-6 text-sm text-muted-foreground">
                    All posts loaded ({totalPosts} total)
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'albums' && (
          <div>
            {albumsLoading ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <AlbumCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : albumsError ? (
              <ErrorMessage error={albumsError} retry={refetchAlbums} />
            ) : (
              <AlbumsList
                albums={albums}
                userId={id}
                onAlbumCreated={() => refetchAlbums()}
                onAlbumUpdated={() => refetchAlbums()}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;
