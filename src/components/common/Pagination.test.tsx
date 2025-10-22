import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../test/testUtils';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import type { PaginationInfo } from '../../types';

describe('Pagination', () => {
  const mockOnNextPage = vi.fn();
  const mockOnPrevPage = vi.fn();
  const mockOnGoToPage = vi.fn();

  const defaultPaginationInfo: PaginationInfo = {
    currentPage: 2,
    totalPages: 5,
    hasNextPage: true,
    hasPrevPage: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pagination buttons', () => {
    render(
      <Pagination
        paginationInfo={defaultPaginationInfo}
        onNextPage={mockOnNextPage}
        onPrevPage={mockOnPrevPage}
        onGoToPage={mockOnGoToPage}
      />
    );

    // Check that page buttons are rendered
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('calls onPrevPage when previous button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        paginationInfo={defaultPaginationInfo}
        onNextPage={mockOnNextPage}
        onPrevPage={mockOnPrevPage}
        onGoToPage={mockOnGoToPage}
      />
    );

    const prevButton = screen.getByRole('button', { name: /previous/i });
    await user.click(prevButton);

    expect(mockOnPrevPage).toHaveBeenCalledTimes(1);
  });

  it('calls onNextPage when next button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        paginationInfo={defaultPaginationInfo}
        onNextPage={mockOnNextPage}
        onPrevPage={mockOnPrevPage}
        onGoToPage={mockOnGoToPage}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    expect(mockOnNextPage).toHaveBeenCalledTimes(1);
  });

  it('disables previous button on first page', () => {
    const firstPageInfo: PaginationInfo = {
      currentPage: 1,
      totalPages: 5,
      hasNextPage: true,
      hasPrevPage: false,
    };

    render(
      <Pagination
        paginationInfo={firstPageInfo}
        onNextPage={mockOnNextPage}
        onPrevPage={mockOnPrevPage}
        onGoToPage={mockOnGoToPage}
      />
    );

    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const lastPageInfo: PaginationInfo = {
      currentPage: 5,
      totalPages: 5,
      hasNextPage: false,
      hasPrevPage: true,
    };

    render(
      <Pagination
        paginationInfo={lastPageInfo}
        onNextPage={mockOnNextPage}
        onPrevPage={mockOnPrevPage}
        onGoToPage={mockOnGoToPage}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });
});
