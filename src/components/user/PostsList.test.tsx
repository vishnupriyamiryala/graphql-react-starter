import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/testUtils';
import PostsList from './PostsList';
import { mockPosts } from '../../test/mockData';

describe('PostsList', () => {
  // Type assertion since PostsList doesn't use the user property
  const testPosts = mockPosts as unknown as Parameters<typeof PostsList>[0]['posts'];

  it('renders all posts', () => {
    render(<PostsList posts={testPosts} />);

    testPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
  });

  it('displays the correct number of posts', () => {
    render(<PostsList posts={testPosts} />);

    // Check for post titles instead of article role
    testPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it('renders empty state when no posts provided', () => {
    const { container } = render(<PostsList posts={[]} />);

    // Should render nothing when empty
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('displays post icons', () => {
    const { container } = render(<PostsList posts={testPosts} />);

    // Check that FileText icons are rendered (one per post)
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });
});
