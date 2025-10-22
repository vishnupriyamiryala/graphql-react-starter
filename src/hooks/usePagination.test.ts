import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 50, pageSize: 10 })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginationInfo.totalPages).toBe(5);
    expect(result.current.paginationInfo.hasNextPage).toBe(true);
    expect(result.current.paginationInfo.hasPrevPage).toBe(false);
  });

  it('calculates total pages correctly', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 23, pageSize: 5 })
    );

    expect(result.current.paginationInfo.totalPages).toBe(5);
  });

  it('navigates to next page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 50, pageSize: 10 })
    );

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginationInfo.hasPrevPage).toBe(true);
  });

  it('navigates to previous page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 50, pageSize: 10 })
    );

    act(() => {
      result.current.goToNextPage();
    });

    act(() => {
      result.current.goToPrevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginationInfo.hasPrevPage).toBe(false);
  });

  it('goes to a specific page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 50, pageSize: 10 })
    );

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.paginationInfo.hasNextPage).toBe(true);
    expect(result.current.paginationInfo.hasPrevPage).toBe(true);
  });

  it('does not go beyond last page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 50, pageSize: 10 })
    );

    act(() => {
      result.current.goToPage(5);
    });

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(5);
    expect(result.current.paginationInfo.hasNextPage).toBe(false);
  });

  it('does not go below first page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 50, pageSize: 10 })
    );

    act(() => {
      result.current.goToPrevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginationInfo.hasPrevPage).toBe(false);
  });

  it('handles single page correctly', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 5, pageSize: 10 })
    );

    expect(result.current.paginationInfo.totalPages).toBe(1);
    expect(result.current.paginationInfo.hasNextPage).toBe(false);
    expect(result.current.paginationInfo.hasPrevPage).toBe(false);
  });

  it('handles zero items correctly', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 0, pageSize: 10 })
    );

    expect(result.current.paginationInfo.totalPages).toBe(0);
    expect(result.current.paginationInfo.hasNextPage).toBe(false);
    expect(result.current.paginationInfo.hasPrevPage).toBe(false);
  });
});
