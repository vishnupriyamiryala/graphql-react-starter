import { useQuery } from '@apollo/client/react';
import { Users as UsersIcon, Activity, Globe } from 'lucide-react';
import { GET_USERS } from '../graphql/queries';
import type { UsersData, User } from '../types';
import { usePagination } from '../hooks/usePagination';
import UserCard from '../components/user/UserCard';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import { UserCardSkeleton } from '../components/common/SkeletonCard';
import { Card, CardContent } from '../components/ui/card';

const USERS_PER_PAGE = 5;

const UsersPage = () => {
  const { currentPage, paginationInfo, goToNextPage, goToPrevPage, goToPage } =
    usePagination({
      totalCount: 10,
      pageSize: USERS_PER_PAGE,
    });

  const { loading, error, data, refetch } = useQuery<UsersData>(GET_USERS, {
    variables: {
      page: currentPage,
      limit: USERS_PER_PAGE,
    },
    fetchPolicy: 'cache-first',
  });

  const actualTotalCount = data?.users.meta.totalCount || 0;
  const updatedPaginationInfo = {
    ...paginationInfo,
    totalPages: Math.ceil(actualTotalCount / USERS_PER_PAGE),
    hasNextPage: currentPage < Math.ceil(actualTotalCount / USERS_PER_PAGE),
    hasPrevPage: currentPage > 1,
  };

  const users = data?.users.data || [];

  if (loading) {
    return (
      <div className="space-y-6 animate-slide-up">
        {/* Header Skeleton */}
        <div className="space-y-1">
          <div className="h-8 bg-muted rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-1/6 animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                    <div className="h-6 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(USERS_PER_PAGE)].map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (!data?.users.data.length) {
    return (
      <EmptyState
        message="No users found"
        description="There are no users available at the moment."
      />
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">Team Directory</h1>
        <p className="text-muted-foreground">
          {actualTotalCount} people in your organization
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Members
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {actualTotalCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Active Now
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.floor(actualTotalCount * 0.7)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Locations
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {data?.users.data.length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      {actualTotalCount > USERS_PER_PAGE && (
        <div className="flex justify-center pt-4">
          <Pagination
            paginationInfo={updatedPaginationInfo}
            onNextPage={goToNextPage}
            onPrevPage={goToPrevPage}
            onGoToPage={goToPage}
          />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
