import { Search, PlusCircle, TicketCheck, User } from 'lucide-react';
import type { TabType } from '../App';

interface TabBarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabBar({ currentTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: 'browse' as TabType, label: 'Browse', icon: Search },
    { id: 'post' as TabType, label: 'Post Ride', icon: PlusCircle },
    { id: 'rides' as TabType, label: 'My Rides', icon: TicketCheck },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center py-3 transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
