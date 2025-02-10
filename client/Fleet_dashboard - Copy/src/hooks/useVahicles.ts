import { useState, useEffect, useMemo } from 'react';
import { Vehicle, VehicleStatus, VehicleFilters } from '@/types/vehicles';
import mockApiService from '@/services/mockApiService';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<VehicleFilters>({
    search: '',
    statuses: ['Active']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const data = await mockApiService.fetchVehicles();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch = vehicle.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.statuses.includes(vehicle.status);
      return matchesSearch && matchesStatus;
    });
  }, [vehicles, filters]);

  const statusCounts = useMemo(() => {
    return vehicles.reduce((acc, vehicle) => {
      acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
      return acc;
    }, {} as Record<VehicleStatus, number>);
  }, [vehicles]);

  return {
    vehicles: filteredVehicles,
    allVehicles: vehicles,
    statusCounts,
    filters,
    isLoading,
    error,
    setFilters,
    refreshVehicles: fetchVehicles
  };
};