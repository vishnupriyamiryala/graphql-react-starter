import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/testUtils';
import UserCard from './UserCard';
import { mockUsers } from '../../test/mockData';

describe('UserCard', () => {
  const mockUser = mockUsers[0];

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(`@${mockUser.username}`)).toBeInTheDocument();
    // Email is rendered in full
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('displays user initials in avatar', () => {
    render(<UserCard user={mockUser} />);

    const initials = mockUser.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    expect(screen.getByText(initials)).toBeInTheDocument();
  });

  it('displays company name', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
  });

  it('displays address city', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText(mockUser.address.city)).toBeInTheDocument();
  });

  it('has a link to user detail page', () => {
    render(<UserCard user={mockUser} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/users/${mockUser.id}`);
  });

  it('displays online status indicator', () => {
    const { container } = render(<UserCard user={mockUser} />);

    // Check for the online status dot
    const statusDots = container.querySelectorAll('[class*="bg-"]');
    expect(statusDots.length).toBeGreaterThan(0);
  });
});
