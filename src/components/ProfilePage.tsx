import { useState } from 'react';
import { ShieldCheck, Settings, ChevronRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Header } from './Header';
import { RidePreferencesModal } from './RidePreferencesModal';
import type { User, RidePreferences } from '../App';

interface ProfilePageProps {
  user: User;
  onUpdatePreferences: (preferences: RidePreferences) => void;
}

export function ProfilePage({ user, onUpdatePreferences }: ProfilePageProps) {
  const [showPreferences, setShowPreferences] = useState(false);

  const stats = [
    { label: 'Total Rides', value: '15' },
    { label: 'Total Saved', value: '$187' },
    { label: 'Rating', value: '5.0★' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} title="Profile" />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="p-6 mb-4">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={user.photo}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-blue-600"
            />
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">{user.name}</h2>
              {user.program && user.year && (
                <p className="text-gray-600 mb-2">{user.program} • {user.year}</p>
              )}
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 inline-flex">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 text-sm">Verified UR Student</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ride Preferences */}
        <Card className="mb-4">
          <button
            onClick={() => setShowPreferences(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 rounded-lg p-2">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-gray-900 mb-1">Ride Preferences</div>
                <div className="text-sm text-gray-600">
                  Customize your matching criteria
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Current Preferences Preview */}
          <div className="px-4 pb-4 border-t border-gray-100 pt-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Preferred Rider Count:</span>
                <span className="text-gray-900">{user.preferences.preferredRiderCount} riders</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Conversation:</span>
                <span className="text-gray-900 capitalize">
                  {user.preferences.conversationPreference === 'quiet' && 'Quiet Ride'}
                  {user.preferences.conversationPreference === 'open' && 'Open to Chat'}
                  {user.preferences.conversationPreference === 'music' && 'Music Preferred'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Luggage/Gear:</span>
                <span className="text-gray-900">
                  {user.preferences.hasLuggage && 'Luggage'}
                  {user.preferences.hasBike && (user.preferences.hasLuggage ? ', Bike' : 'Bike')}
                  {user.preferences.needsExtraSpace && (!user.preferences.hasLuggage && !user.preferences.hasBike ? 'Extra Space' : ', Extra Space')}
                  {!user.preferences.hasLuggage && !user.preferences.hasBike && !user.preferences.needsExtraSpace && 'None'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <div className="space-y-3">
          <h3 className="text-gray-900 mb-3">Account Settings</h3>
          
          <Card>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-gray-900">Edit Profile</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          <Card>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-gray-900">Notification Settings</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          <Card>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-gray-900">Privacy & Safety</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          <Card>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-gray-900">Help & Support</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>
        </div>

        {/* Version Info */}
        <div className="text-center text-xs text-gray-500 mt-8 mb-4">
          URide MVP v1.0 • Made for UR Students
        </div>
      </main>

      {/* Preferences Modal */}
      {showPreferences && (
        <RidePreferencesModal
          preferences={user.preferences}
          onClose={() => setShowPreferences(false)}
          onSave={(newPreferences) => {
            onUpdatePreferences(newPreferences);
            setShowPreferences(false);
          }}
        />
      )}
    </div>
  );
}
