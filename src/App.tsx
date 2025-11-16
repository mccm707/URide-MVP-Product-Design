import { useState } from 'react';
import { BrowsePage } from './components/BrowsePage';
import { PostRidePage } from './components/PostRidePage';
import { MyRidesPage } from './components/MyRidesPage';
import { ProfilePage } from './components/ProfilePage';
import { RideDetailsPage } from './components/RideDetailsPage';
import { ChatPage } from './components/ChatPage';
import { VerificationGate } from './components/VerificationGate';
import { TabBar } from './components/TabBar';

export type RidePreferences = {
  preferredRiderCount: number;
  conversationPreference: 'quiet' | 'open' | 'music';
  hasLuggage: boolean;
  hasBike: boolean;
  needsExtraSpace: boolean;
};

export type User = {
  id: string;
  name: string;
  verified: boolean;
  photo: string;
  program?: string;
  year?: string;
  preferences: RidePreferences;
};

export type Ride = {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  destination: string;
  date: string;
  time: string;
  timeEnd: string;
  availableSeats: number;
  soloPrice: number;
  sharedPrice: number;
  savings: number;
  verified: boolean;
  status?: 'upcoming' | 'completed' | 'cancelled';
};

export type TabType = 'browse' | 'post' | 'rides' | 'profile';

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>('browse');
  const [currentPage, setCurrentPage] = useState<'main' | 'details' | 'chat'>('main');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [chatWith, setChatWith] = useState<User | null>(null);

  const handleVerificationComplete = (user: User) => {
    setCurrentUser(user);
    setIsVerified(true);
  };

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    setCurrentPage('main');
  };

  const handleRideSelect = (ride: Ride) => {
    setSelectedRide(ride);
    setCurrentPage('details');
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  const handleConfirmMatch = (ride: Ride) => {
    setChatWith({
      id: ride.userId,
      name: ride.userName,
      verified: ride.verified,
      photo: ride.userPhoto,
      preferences: {
        preferredRiderCount: 2,
        conversationPreference: 'open',
        hasLuggage: false,
        hasBike: false,
        needsExtraSpace: false,
      },
    });
    setCurrentPage('chat');
  };

  const handleOpenChat = (user: User) => {
    setChatWith(user);
    setCurrentPage('chat');
  };

  const handleUpdatePreferences = (preferences: RidePreferences) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        preferences,
      });
    }
  };

  if (!isVerified) {
    return <VerificationGate onComplete={handleVerificationComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Tab Content */}
      {currentPage === 'main' && (
        <>
          {currentTab === 'browse' && (
            <BrowsePage 
              user={currentUser!} 
              onRideSelect={handleRideSelect}
              onPostRide={() => setCurrentTab('post')}
            />
          )}
          {currentTab === 'post' && (
            <PostRidePage 
              user={currentUser!}
              onSuccess={() => setCurrentTab('rides')}
            />
          )}
          {currentTab === 'rides' && (
            <MyRidesPage 
              user={currentUser!}
              onRideSelect={handleRideSelect}
              onOpenChat={handleOpenChat}
            />
          )}
          {currentTab === 'profile' && (
            <ProfilePage 
              user={currentUser!}
              onUpdatePreferences={handleUpdatePreferences}
            />
          )}
        </>
      )}

      {/* Detail Pages */}
      {currentPage === 'details' && selectedRide && (
        <RideDetailsPage 
          user={currentUser!} 
          ride={selectedRide} 
          onBack={handleBackToMain}
          onConfirm={handleConfirmMatch}
        />
      )}

      {currentPage === 'chat' && chatWith && (
        <ChatPage 
          user={currentUser!} 
          chatWith={chatWith} 
          onBack={handleBackToMain}
        />
      )}

      {/* Tab Bar - Only show on main pages */}
      {currentPage === 'main' && (
        <TabBar currentTab={currentTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}
