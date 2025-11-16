import { useState } from 'react';
import { Plus, MapPin, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Header } from './Header';
import type { User } from '../App';

interface PostRidePageProps {
  user: User;
  onSuccess: () => void;
}

const popularDestinations = [
  'ROC Airport',
  'Downtown Rochester',
  'Eastview Mall',
  'Wegmans',
  'Marketplace Mall',
  'Strong Memorial Hospital',
];

export function PostRidePage({ user, onSuccess }: PostRidePageProps) {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [seats, setSeats] = useState('3');
  const [estimatedCost, setEstimatedCost] = useState('35');
  const [isPosted, setIsPosted] = useState(false);

  const handlePost = () => {
    // Simulate posting
    setIsPosted(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const sharedCost = Math.round(parseInt(estimatedCost || '0') / (parseInt(seats || '1') + 1));
  const savings = parseInt(estimatedCost || '0') - sharedCost;

  if (isPosted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} title="Post a Ride" />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Ride Posted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your ride has been posted. You'll be notified when someone matches with you.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 inline-block">
              <p className="text-emerald-800">
                You could save up to <span className="text-emerald-600">${savings}</span> by sharing this ride!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} title="Post a Ride" showBack onBack={() => onSuccess()} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-gray-900 mb-2">Share your ride</h3>
            <p className="text-gray-600">
              Post your upcoming trip and help fellow UR students save money
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Destination
              </Label>
              <Input
                id="destination"
                type="text"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1.5"
                list="destinations"
              />
              <datalist id="destinations">
                {popularDestinations.map(dest => (
                  <option key={dest} value={dest} />
                ))}
              </datalist>
              <div className="flex flex-wrap gap-2 mt-2">
                {popularDestinations.slice(0, 3).map(dest => (
                  <Button
                    key={dest}
                    variant="outline"
                    size="sm"
                    onClick={() => setDestination(dest)}
                    className="text-xs"
                  >
                    {dest}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Departure Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="timeEnd">Flexible Until</Label>
                <Input
                  id="timeEnd"
                  type="time"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="seats" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Available Seats
              </Label>
              <Input
                id="seats"
                type="number"
                min="1"
                max="7"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="cost">Estimated Total Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                min="0"
                placeholder="Enter estimated ride cost"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                className="mt-1.5"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be split among all riders
              </p>
            </div>

            {estimatedCost && seats && (
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 p-4">
                <p className="text-emerald-900 mb-3">Cost Breakdown</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total ride cost:</span>
                    <span className="text-gray-900">${estimatedCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cost per person (if full):</span>
                    <span className="text-gray-900">${sharedCost}</span>
                  </div>
                  <div className="border-t border-emerald-200 pt-2 mt-2 flex justify-between">
                    <span className="text-emerald-700">Your savings (if full):</span>
                    <span className="text-emerald-600">${savings}</span>
                  </div>
                </div>
              </Card>
            )}

            <Button
              onClick={handlePost}
              disabled={!destination || !date || !time || !seats || !estimatedCost}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post Ride
            </Button>
          </div>
        </Card>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-blue-900 mb-2">Safety Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Always verify rider identities before sharing a ride</li>
            <li>• Meet in well-lit, public areas on campus</li>
            <li>• Share your trip details with a friend</li>
            <li>• Trust your instincts and report any concerns</li>
          </ul>
        </div>
      </main>
    </div>
  );
}