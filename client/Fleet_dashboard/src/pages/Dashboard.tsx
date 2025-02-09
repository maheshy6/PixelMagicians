import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Users, Wrench, Fuel, MapPin, ClipboardList, User, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Welcome, John! Your fleet at a glance.</h2>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigate('/track')}
        >
          <CardContent className="pt-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <MapPin className="w-6 h-6 text-blue-500" />
              <div>
                <div className="font-semibold">Track Vehicles</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigate('/upcoming-maintenance')}
        >
          <CardContent className="pt-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <Wrench className="w-6 h-6 text-green-500" />
              <div>
                <div className="font-semibold">Schedule Maintenance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigate('/drivers')}
        >
          <CardContent className="pt-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <User className="w-6 h-6 text-violet-500" />
              <div>
                <div className="font-semibold">Manage Drivers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigate('/reports')}
        >
          <CardContent className="pt-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <ClipboardList className="w-6 h-6 text-orange-500" />
              <div>
                <div className="font-semibold">View Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-4">
              <Car className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm text-gray-500">Total Vehicles</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">38</div>
                <div className="text-sm text-gray-500">Active Drivers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigate('/upcoming-maintenance')}
        >
          <CardContent className="pt-4">
            <div className="flex items-center space-x-4">
              <Wrench className="w-8 h-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm text-gray-500">Upcoming Maintenance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-4">
              <Fuel className="w-8 h-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-500">Fuel Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Map and Vehicle Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Map View</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className='text-green-600'>
                    <Car className="w-8 h-8 text-green-500" />
                    Truck #1234</span>
                  <span className="text-green-600">Available</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className='text-blue-600'>
                    <Car className="w-8 h-8 text-blue-500" />
                    Truck #1235</span>
                  <span className="text-blue-600">In Transit</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <span className='text-orange-600'>
                    <Car className="w-8 h-8 text-orange-500" /> 
                    Truck #1236</span>
                  <span className="text-orange-600">Maintenance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                <Wrench className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-medium">Maintenance Complete</div>
                    <div className="text-sm text-gray-500">Truck #1234 - Oil Change</div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="font-medium">Trip Completed</div>
                    <div className="text-sm text-gray-500">Route: NYC to Boston</div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">4h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <div className="font-medium text-red-700">Emergency Alert</div>
                </div>
                <div className="mt-1 text-sm text-red-600">Vehicle #1236 requires immediate attention</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  <div className="font-medium text-yellow-700">Geofence Alert</div>
                </div>
                <div className="mt-1 text-sm text-yellow-600">Vehicle #1235 outside designated area</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
