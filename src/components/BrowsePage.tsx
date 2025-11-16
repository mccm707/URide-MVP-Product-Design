import { useState } from 'react';
import { Search, MapPin, Clock, Users, TrendingDown, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Header } from './Header';
import { Badge } from './ui/badge';
import type { User, Ride } from '../App';

interface BrowsePageProps {
  user: User;
  onRideSelect: (ride: Ride) => void;
  onPostRide: () => void;
}

// Common UR destinations
const popularDestinations = [
  'ROC Airport',
  'Downtown Rochester',
  'Eastview Mall',
  'Wegmans',
];

// Mock ride data
const mockRides: Ride[] = [
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
    id: '2',
    userId: '3',
    userName: 'Michael Chen',
    userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    destination: 'ROC Airport',
    date: '2025-11-22',
    time: '13:30',
    timeEnd: '14:30',
    availableSeats: 2,
    soloPrice: 35,
    sharedPrice: 15,
    savings: 20,
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
  {
    id: '4',
    userId: '5',
    userName: 'David Park',
    userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    destination: 'Eastview Mall',
    date: '2025-11-17',
    time: '15:00',
    timeEnd: '16:00',
    availableSeats: 3,
    soloPrice: 18,
    sharedPrice: 7,
    savings: 11,
    verified: true,
    status: 'upcoming',
  },
  {
    id: '5',
    userId: '6',
    userName: 'Jessica Wu',
    userPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    destination: 'Wegmans',
    date: '2025-11-16',
    time: '10:00',
    timeEnd: '11:00',
    availableSeats: 2,
    soloPrice: 15,
    sharedPrice: 6,
    savings: 9,
    verified: true,
    status: 'upcoming',
  },
];

export function BrowsePage({ user, onRideSelect, onPostRide }: BrowsePageProps) {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState<Ride[]>(mockRides);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = () => {
    setIsSearchActive(true);
    let filtered = mockRides;
    
    if (destination) {
      filtered = filtered.filter(ride => 
        ride.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    if (date) {
      filtered = filtered.filter(ride => ride.date === date);
    }
    
    setResults(filtered);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} title="Browse Rides" />

      <main className="max-w-7xl mx-auto px-4 pt-4 pb-6">
        {/* Savings Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white shadow-md mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-50 text-sm mb-1">Average Student Savings</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl">$12.50</span>
                <span className="text-emerald-100 text-sm">per ride</span>
              </div>
            </div>
            <TrendingDown className="w-10 h-10 opacity-80" />
          </div>
        </div>

        {/* Search Section */}
        <Card className="p-4 mb-4">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10"
                list="destinations"
              />
              <datalist id="destinations">
                {popularDestinations.map(dest => (
                  <option key={dest} value={dest} />
                ))}
              </datalist>
            </div>

            <div className="flex gap-2">
              {popularDestinations.map(dest => (
                <Button
                  key={dest}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDestination(dest);
                    setIsSearchActive(false);
                  }}
                  className="text-xs flex-1"
                >
                  {dest}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1"
                min={new Date().toISOString().split('T')[0]}
              />
              <Button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900">
            {isSearchActive ? `${results.length} Rides Found` : 'Available Rides'}
          </h3>
          {results.length > 0 && (
            <span className="text-sm text-emerald-600">
              Save up to ${Math.max(...results.map(r => r.savings))}
            </span>
          )}
        </div>

        {/* Ride Feed */}
        {results.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-gray-900 mb-2">No rides found</h3>
            <p className="text-gray-600 mb-6">
              Be the first to post a ride for this route!
            </p>
            <Button
              onClick={onPostRide}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post a Ride
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {results.map(ride => (
              <Card
                key={ride.id}
                className="p-4 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-blue-200"
                onClick={() => onRideSelect(ride)}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left side: Ride info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <img
                        src={ride.userPhoto}
                        alt={ride.userName}
                        className="w-10 h-10 rounded-full border-2 border-blue-600 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-900 truncate">{ride.userName}</span>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs flex-shrink-0">
                            Verified
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="text-sm truncate">{ride.destination}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatTime(ride.time)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{ride.availableSeats} seats</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Savings */}
                  <div className="text-right flex-shrink-0">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-lg shadow-sm">
                      <div className="flex items-center gap-1 justify-center mb-0.5">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-xs">Save</span>
                      </div>
                      <div className="text-xl">${ride.savings}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={onPostRide}
        className="fixed bottom-24 right-6 w-14 h-14 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
        aria-label="Post a ride"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
