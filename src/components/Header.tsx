import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import type { User } from '../App';

interface HeaderProps {
  user: User;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ user, title, showBack, onBack }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mr-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            {title ? (
              <h2 className="text-gray-900">{title}</h2>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-blue-900">URide</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-blue-900 text-sm">Verified UR Student</span>
            </div>
            <img
              src={user.photo}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-blue-600"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
