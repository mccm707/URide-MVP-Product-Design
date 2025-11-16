import { useState } from 'react';
import { Shield, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { User } from '../App';

interface VerificationGateProps {
  onComplete: (user: User) => void;
}

export function VerificationGate({ onComplete }: VerificationGateProps) {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    if (!studentId || !name) return;
    
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      const user: User = {
        id: '1',
        name: name,
        verified: true,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        preferences: {
          preferredRiderCount: 2,
          conversationPreference: 'open',
          hasLuggage: false,
          hasBike: false,
          needsExtraSpace: false,
        },
      };
      onComplete(user);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-yellow-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-blue-900 mb-2">Welcome to URide</h1>
          <p className="text-gray-600">Verified rideshare for the University of Rochester community</p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-900">Safety First</p>
                <p className="text-blue-700 text-sm mt-1">
                  URide is exclusively for verified UR students. Your safety is our priority.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="studentId">UR Student ID</Label>
              <Input
                id="studentId"
                type="text"
                placeholder="Enter your UR ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <Button
            onClick={handleVerify}
            disabled={!studentId || !name || isVerifying}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Verify & Continue
              </>
            )}
          </Button>

          <p className="text-center text-xs text-gray-500">
            By continuing, you agree that you are a current University of Rochester student
          </p>
        </div>
      </div>
    </div>
  );
}