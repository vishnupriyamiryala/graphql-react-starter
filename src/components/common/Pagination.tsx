import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import type { PaginationInfo } from '../../types';
import { Button } from '../ui/button';

interface PaginationProps {
  paginationInfo: PaginationInfo;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage: (page: number) => void;
}

const Pagination = ({
  paginationInfo,
  onNextPage,
  onPrevPage,
  onGoToPage,
}: PaginationProps) => {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = paginationInfo;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      <Button
        onClick={onPrevPage}
        disabled={!hasPrevPage}
        variant="outline"
        size="sm"
        className="gap-1.5"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={index}
              onClick={() => onGoToPage(page)}
              variant={currentPage === page ? 'default' : 'ghost'}
              size="sm"
              className={`w-9 h-9 ${currentPage === page ? '' : ''}`}
            >
              {page}
            </Button>
          ) : (
            <div
              key={index}
              className="flex items-center justify-center w-9 h-9"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          )
        )}
      </div>

      <Button
        onClick={onNextPage}
        disabled={!hasNextPage}
        variant="outline"
        size="sm"
        className="gap-1.5"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};

export default Pagination;
