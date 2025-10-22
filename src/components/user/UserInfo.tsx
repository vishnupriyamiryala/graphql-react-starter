import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  Award,
  ArrowRight,
} from 'lucide-react';
import type { User } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="overflow-hidden shadow-2xl animate-scale-in border-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

      <CardContent className="p-8 relative">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl ring-8 ring-white dark:ring-slate-800">
              <span className="text-white font-bold text-4xl">{initials}</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl px-3 py-1 shadow-lg">
              <Award className="h-4 w-4 inline mr-1" />
              <span className="text-xs font-bold">Pro</span>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
              {user.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                @{user.username}
              </p>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                Verified
              </Badge>
            </div>
            {user.website && (
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Globe className="h-4 w-4" />
                {user.website}
                <ArrowRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Contact Information
            </h3>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-md flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Email Address
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-md flex-shrink-0">
                <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Phone Number
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {user.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Location & Company
            </h3>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-md flex-shrink-0">
                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Address
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {user.address.street}, {user.address.suite}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-md flex-shrink-0">
                <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Company
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {user.company.name}
                </p>
                {user.company.catchPhrase && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic mt-2">
                    "{user.company.catchPhrase}"
                  </p>
                )}
                {user.company.bs && (
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {user.company.bs}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
