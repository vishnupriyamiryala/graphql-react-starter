import { FileText } from 'lucide-react';
import type { Post } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PostsListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostsListProps) => {
  const postColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-purple-500',
    'from-rose-500 to-pink-500',
  ];

  return (
    <div className="space-y-4">
      {posts.map((post, index) => {
        const colorGradient = postColors[index % postColors.length];
        return (
          <Card
            key={post.id}
            className="group hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorGradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}
                >
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg capitalize leading-tight font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      Post #{post.id}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.body}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PostsList;
