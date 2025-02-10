import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Vehicle } from '@/types/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
  const statusColors = {
    Active: 'bg-green-500',
    Maintenance: 'bg-yellow-500',
    Idle: 'bg-red-500'
  };

  return (
    <Card 
      className="p-3 cursor-pointer hover:bg-gray-50"
      onClick={() => onClick(vehicle)}
    >
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">
              {vehicle.type} #{vehicle.id}
            </h3>
            <p className="text-sm text-gray-500">
              Last Updated: {vehicle.lastUpdate}
            </p>
          </div>
          <div className={`w-2 h-2 rounded-full ${statusColors[vehicle.status]}`} />
        </div>
      </CardContent>
    </Card>
  );
};