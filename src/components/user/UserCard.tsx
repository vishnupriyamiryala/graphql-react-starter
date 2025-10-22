import { Link } from 'react-router-dom';
import { Mail, MapPin, Building2, ChevronRight } from 'lucide-react';
import type { User } from '../../types';
import { Card, CardContent } from '../ui/card';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate consistent colors based on user id
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-cyan-500 to-cyan-600',
  ];
  const colorIndex = parseInt(user.id) % colors.length;

  return (
    <Link to={`/users/${user.id}`} className="block group">
      <Card className="h-full hover:shadow-lg hover:border-primary/40 transition-all duration-300 cursor-pointer">
        <CardContent className="p-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative flex-shrink-0">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
              >
                <span className="text-white font-bold text-lg">{initials}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card shadow-sm"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {user.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                @{user.username}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className=" mb-5">
            <div className="flex items-center gap-3 p-1.5 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground truncate">
                {user.email}
              </span>
            </div>
            <div className="flex items-center gap-3 p-1.5 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-orange-500" />
              </div>
              <span className="text-sm text-foreground truncate">
                {user.address.city}
              </span>
            </div>
            <div className="flex items-center gap-3 p-1.5 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm text-foreground truncate">
                {user.company.name}
              </span>
            </div>
          </div>

          {/* View Profile CTA */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
            <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
              View Full Profile
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default UserCard;
