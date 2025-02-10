import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { VehicleStatus } from '@/types/vehicles';

interface VehicleStatusFiltersProps {
  statuses: VehicleStatus[];
  selectedStatuses: VehicleStatus[];
  counts: Record<VehicleStatus, number>;
  onStatusToggle: (status: VehicleStatus) => void;
}

export const VehicleStatusFilters: React.FC<VehicleStatusFiltersProps> = ({
  statuses,
  selectedStatuses,
  counts,
  onStatusToggle
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Vehicle Status</h2>
      <div className="space-y-2">
        {statuses.map(status => (
          <div key={status} className="flex items-center space-x-2">
            <Checkbox 
              id={status}
              checked={selectedStatuses.includes(status)}
              onCheckedChange={() => onStatusToggle(status)}
            />
            <label htmlFor={status} className="text-sm">
              {status} ({counts[status] || 0})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};