import { useState } from 'react';
import { X, Users, MessageSquare, Music, Volume2, VolumeX, Package, Bike, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import type { RidePreferences } from '../App';

interface RidePreferencesModalProps {
  preferences: RidePreferences;
  onClose: () => void;
  onSave: (preferences: RidePreferences) => void;
}

export function RidePreferencesModal({ preferences, onClose, onSave }: RidePreferencesModalProps) {
  const [localPreferences, setLocalPreferences] = useState<RidePreferences>(preferences);

  const handleSave = () => {
    onSave(localPreferences);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-gray-900">Ride Preferences</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            These preferences help match you with compatible ride partners and improve your comfort.
          </div>

          {/* Preferred Rider Count */}
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4" />
              Preferred Number of Co-Riders
            </Label>
            <p className="text-sm text-gray-600 mb-3">
              How many other people would you like to share a ride with?
            </p>
            <div className="space-y-3">
              <Slider
                value={[localPreferences.preferredRiderCount]}
                onValueChange={(value) =>
                  setLocalPreferences({ ...localPreferences, preferredRiderCount: value[0] })
                }
                min={1}
                max={4}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 rider</span>
                <span className="text-blue-600">
                  {localPreferences.preferredRiderCount} {localPreferences.preferredRiderCount === 1 ? 'rider' : 'riders'}
                </span>
                <span>4 riders</span>
              </div>
            </div>
          </div>

          {/* Conversation Preference */}
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4" />
              Conversation Preference
            </Label>
            <p className="text-sm text-gray-600 mb-3">
              What's your preferred vibe during the ride?
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() =>
                  setLocalPreferences({ ...localPreferences, conversationPreference: 'quiet' })
                }
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  localPreferences.conversationPreference === 'quiet'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <VolumeX className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                <div className="text-sm text-gray-900 mb-1">Quiet</div>
                <div className="text-xs text-gray-600">Minimal chat</div>
              </button>

              <button
                onClick={() =>
                  setLocalPreferences({ ...localPreferences, conversationPreference: 'open' })
                }
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  localPreferences.conversationPreference === 'open'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                <div className="text-sm text-gray-900 mb-1">Open</div>
                <div className="text-xs text-gray-600">Happy to chat</div>
              </button>

              <button
                onClick={() =>
                  setLocalPreferences({ ...localPreferences, conversationPreference: 'music' })
                }
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  localPreferences.conversationPreference === 'music'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Music className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                <div className="text-sm text-gray-900 mb-1">Music</div>
                <div className="text-xs text-gray-600">Music lover</div>
              </button>
            </div>
          </div>

          {/* Luggage & Gear */}
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4" />
              Luggage & Gear
            </Label>
            <p className="text-sm text-gray-600 mb-3">
              Do you typically travel with extra items?
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.hasLuggage}
                  onChange={(e) =>
                    setLocalPreferences({ ...localPreferences, hasLuggage: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Package className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">Suitcase/Luggage</div>
                  <div className="text-xs text-gray-600">I often travel with a suitcase</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.hasBike}
                  onChange={(e) =>
                    setLocalPreferences({ ...localPreferences, hasBike: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Bike className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">Bike</div>
                  <div className="text-xs text-gray-600">I need space for a bicycle</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={localPreferences.needsExtraSpace}
                  onChange={(e) =>
                    setLocalPreferences({ ...localPreferences, needsExtraSpace: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Maximize2 className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">Extra Space Required</div>
                  <div className="text-xs text-gray-600">I need additional room for other items</div>
                </div>
              </label>
            </div>
          </div>

          {/* Impact Note */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-800">
            💡 These preferences will help you find the most compatible ride matches while maintaining flexibility.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
}
