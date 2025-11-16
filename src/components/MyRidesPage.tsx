import { MessageCircle, MapPin, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Header } from './Header';
import type { User, Ride } from '../App';

interface MyRidesPageProps {
  user: User;
  onRideSelect: (ride: Ride) => void;
  onOpenChat: (user: User) => void;
}

// Mock data for user's rides
const mockUpcomingRides: Ride[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Sarah Johnson',
    userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    destination: 'ROC Airport',
    date: '2025-11-22',
    time: '14:00',
    timeEnd: '15:00',
    availableSeats: 3,
    soloPrice: 35,
    sharedPrice: 12,
    savings: 23,
    verified: true,
    status: 'upcoming',
  },
  {
    id: '3',
    userId: '4',
    userName: 'Emily Rodriguez',
    userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    destination: 'Downtown Rochester',
    date: '2025-11-18',
    time: '18:00',
    timeEnd: '19:00',
    availableSeats: 4,
    soloPrice: 20,
    sharedPrice: 8,
    savings: 12,
    verified: true,
    status: 'upcoming',
  },
];

const mockPastRides: Ride[] = [
  {
    id: '10',
    userId: '7',
    userName: 'Alex Kim',
    userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    destination: 'Eastview Mall',
    date: '2025-11-10',
    time: '14:00',
    timeEnd: '15:00',
    availableSeats: 2,
    soloPrice: 18,
    sharedPrice: 9,
    savings: 9,
    verified: true,
    status: 'completed',
  },
  {
    id: '11',
    userId: '8',
    userName: 'Chris Taylor',
    userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
    destination: 'ROC Airport',
    date: '2025-11-08',
    time: '10:00',
    timeEnd: '11:00',
    availableSeats: 3,
    soloPrice: 35,
    sharedPrice: 15,
    savings: 20,
    verified: true,
    status: 'completed',
  },
];

export function MyRidesPage({ user, onRideSelect, onOpenChat }: MyRidesPageProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalSavings = [...mockUpcomingRides, ...mockPastRides].reduce((sum, ride) => sum + ride.savings, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} title="My Rides" />

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Stats Summary */}
        <Card className="p-4 mb-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-emerald-600">${totalSavings}</div>
              <div className="text-xs text-gray-600 mt-1">Total Saved</div>
            </div>
            <div>
              <div className="text-2xl text-blue-600">{mockUpcomingRides.length}</div>
              <div className="text-xs text-gray-600 mt-1">Upcoming</div>
            </div>
            <div>
              <div className="text-2xl text-gray-600">{mockPastRides.length}</div>
              <div className="text-xs text-gray-600 mt-1">Completed</div>
            </div>
          </div>
        </Card>

        {/* Tabs for Upcoming vs Past */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          {/* Upcoming Rides */}
          <TabsContent value="upcoming" className="space-y-3">
            {mockUpcomingRides.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <MapPin className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-gray-900 mb-2">No upcoming rides</h3>
                <p className="text-gray-600">
                  Browse available rides or post your own!
                </p>
              </Card>
            ) : (
              mockUpcomingRides.map(ride => (
                <Card key={ride.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <img
                        src={ride.userPhoto}
                        alt={ride.userName}
                        className="w-12 h-12 rounded-full border-2 border-blue-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-900">{ride.userName}</span>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            Verified
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-700 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{ride.destination}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formatDate(ride.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{formatTime(ride.time)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm">
                        Saved ${ride.savings}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => onOpenChat({
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
                      })}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      onClick={() => onRideSelect(ride)}
                      variant="default"
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Past Rides */}
          <TabsContent value="past" className="space-y-3">
            {mockPastRides.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <CheckCircle className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-gray-900 mb-2">No ride history</h3>
                <p className="text-gray-600">
                  Your completed rides will appear here
                </p>
              </Card>
            ) : (
              mockPastRides.map(ride => (
                <Card key={ride.id} className="p-4 bg-gray-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="relative">
                        <img
                          src={ride.userPhoto}
                          alt={ride.userName}
                          className="w-12 h-12 rounded-full border-2 border-gray-300"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-900">{ride.userName}</span>
                          <Badge variant="secondary" className="text-xs">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{ride.destination}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(ride.date)} at {formatTime(ride.time)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-emerald-600 text-sm">
                        Saved ${ride.savings}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
