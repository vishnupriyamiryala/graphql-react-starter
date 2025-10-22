import { useState, useMemo } from 'react';
import type { PaginationInfo } from '../types';

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
}

export const usePagination = ({ totalCount, pageSize }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationInfo: PaginationInfo = useMemo(() => {
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
      currentPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [currentPage, totalCount, pageSize]);

  const goToNextPage = () => {
    if (paginationInfo.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (paginationInfo.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, paginationInfo.totalPages));
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    paginationInfo,
    goToNextPage,
    goToPrevPage,
    goToPage,
  };
};
