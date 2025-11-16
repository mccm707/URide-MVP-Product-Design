import { ShieldCheck, MapPin, Clock, Users, DollarSign, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Header } from './Header';
import type { User, Ride } from '../App';

interface RideDetailsPageProps {
  user: User;
  ride: Ride;
  onBack: () => void;
  onConfirm: (ride: Ride) => void;
}

export function RideDetailsPage({ user, ride, onBack, onConfirm }: RideDetailsPageProps) {
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
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} title="Ride Details" showBack onBack={onBack} />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Savings Summary - Most Prominent */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-6">
            <p className="text-emerald-50 mb-3">Your Savings Breakdown</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-emerald-100 text-sm mb-1">Solo Ride</p>
                <p className="text-2xl">${ride.soloPrice}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-emerald-100 text-sm mb-1">Shared Cost</p>
                <p className="text-2xl">${ride.sharedPrice}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
                <p className="text-white text-sm mb-1">You Save</p>
                <p className="text-3xl">${ride.savings}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Co-Rider Profile - Verification Emphasis */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900">Verified UR Student</h3>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={ride.userPhoto}
                alt={ride.userName}
                className="w-20 h-20 rounded-full border-4 border-blue-600"
              />
              {ride.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-gray-900">{ride.userName}</h3>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  Verified
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-3">University of Rochester Student</p>
              
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">5.0★ Rating</Badge>
                <Badge variant="outline" className="text-xs">23 Rides</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Ride Details */}
        <Card className="p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Trip Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 rounded-lg p-2.5">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-1">Destination</p>
                <p className="text-gray-900">{ride.destination}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-50 rounded-lg p-2.5">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-1">Date & Time</p>
                <p className="text-gray-900">{formatDate(ride.date)}</p>
                <p className="text-gray-700">
                  {formatTime(ride.time)} - {formatTime(ride.timeEnd)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-50 rounded-lg p-2.5">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-1">Available Seats</p>
                <p className="text-gray-900">{ride.availableSeats} seats remaining</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-50 rounded-lg p-2.5">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-1">Cost Per Person</p>
                <p className="text-gray-900">${ride.sharedPrice}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Meeting Point Info */}
        <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
          <p className="text-yellow-900 mb-2">📍 Meeting Point</p>
          <p className="text-yellow-800 text-sm">
            The exact meeting location will be shared in the chat after you confirm this ride.
          </p>
        </Card>

        {/* Confirm Button */}
        <Button
          onClick={() => onConfirm(ride)}
          className="w-full bg-blue-600 hover:bg-blue-700 h-14"
          size="lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Confirm Match & Open Chat
        </Button>

        {/* Safety Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 mb-1">Safety First</p>
              <p className="text-blue-700 text-sm">
                All URide users are verified UR students. Always meet in public campus locations 
                and share your trip details with a friend.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}