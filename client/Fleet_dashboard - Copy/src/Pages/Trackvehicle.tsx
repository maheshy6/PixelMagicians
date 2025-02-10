import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Layers, MapPin, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {Vehicle, VehicleStatus, GMPMarker, GMPMap} from '../types/vehicles'
import { useVehicles } from '@/hooks/useVahicles';
import { VehicleStatusFilters } from '@/components/vehicles/VehicleStatusFilters';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { useNavigate } from 'react-router-dom';
  // Configuration for Google Maps
  interface MapConfig {
    apiKey: string;
    mapId: string;
    center: { lat: number; lng: number };
    zoom: number;
  }

  // Map configuration with default values
  const MAP_CONFIG: MapConfig = {
    apiKey: 'AIzaSyA6fqiuXboJLh3I2p0mIh82KabmvLXKRr8',
    mapId: 'fleet_map',
    center: { lat: 40.749933, lng: -73.98633 }, // New York City center
    zoom: 13
  };
  
  // Main Fleet Manager Map Component
  const FleetManagerMap: React.FC<{
    vehicles: Vehicle[];
    onVehicleSelect: (vehicle: Vehicle) => void;
  }> = ({ vehicles, onVehicleSelect }) => {
    // References and state
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GMPMap | null>(null);
    const [markers, setMarkers] = useState<GMPMarker[]>([]);
  
    // Load Google Maps script when component mounts
    useEffect(() => {
      const loadMap = async () => {
        try {
          // Check if script is already loaded
          if (document.querySelector('script[src*="googlemaps"]')) {
            initializeMap();
            return;
          }
  
          // Create and load script
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_CONFIG.apiKey}&libraries=places`;
          script.async = true;
          script.onload = initializeMap;
          document.head.appendChild(script);
        } catch (error) {
          console.error('Failed to load map:', error);
        }
      };
  
      loadMap();
    }, []);
  
    // Initialize map instance
    const initializeMap = async () => {
      if (!mapRef.current) return;
  
      // Create new map instance
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        mapId: MAP_CONFIG.mapId
      });
  
      setMap(mapInstance);
    };
  
    // Update markers when vehicles data changes
    useEffect(() => {
      if (!map) return;
  
      // Remove existing markers
      markers.forEach(marker => marker.setMap(null));
  
      // Create new markers for each vehicle
      const newMarkers = vehicles.map(vehicle => {
        const marker = new google.maps.Marker({
          position: vehicle.coordinates,
          map: map,
          title: `${vehicle.type} #${vehicle.id}`
        });
  
        // Add click listener to show vehicle details
        marker.addListener('click', () => onVehicleSelect(vehicle));
  
        return marker;
      });
  
      setMarkers(newMarkers);
  
      // Cleanup markers on unmount
      return () => {
        newMarkers.forEach(marker => marker.setMap(null));
      };
    }, [vehicles, map]);
  
    // Render map container
    return (
      <div 
        ref={mapRef} 
        className="h-full w-full" 
        data-testid="map-container"
      />
    );
  };

const FleetManagerPro = () => {
  const navigate = useNavigate();

  const handleEmergency1 = () => {
    navigate('/emergencyroute');
  };
  // State Management
  const {
    vehicles,
    statusCounts,
    filters,
    isLoading,
    setFilters,
    refreshVehicles
  } = useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
 /* const [isEmergency, setIsEmergency] = useState(false);
   const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [mapZoom, setMapZoom] = useState(12); */
  const [showLayers, setShowLayers] = useState(false);

  // Fetch vehicles data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshVehicles();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch vehicles data",
          variant: "destructive"
        });
      }
    };

    fetchData();
    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [refreshVehicles]);

  // Filter vehicles based on search and status
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch = vehicle.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.statuses.includes(vehicle.status);
      return matchesSearch && matchesStatus;
    });
  }, [vehicles, filters]);

  // Event Handlers
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: event.target.value }));
  };

  const handleStatusToggle = (status: VehicleStatus) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }));
  };

 /* const handleEmergency = () => {
    setIsEmergency(true);
    toast({
      title: "Emergency Mode Activated",
      description: "Notifying all drivers and dispatch...",
      variant: "destructive"
    });
  }; */

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

/*  const handleAddVehicle = () => {
    setShowAddVehicle(true);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setMapZoom(prev => direction === 'in' ? prev + 1 : prev - 1);
  };
*/
  const handleContactDriver = async (vehicleId: string) => {
    toast({
      title: "Contacting Driver",
      description: `Initiating communication with vehicle #${vehicleId}`,
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white p-4 border-r">
        <div className="flex items-center gap-2 mb-6">
          <div className="text-blue-600 text-2xl">🚚</div>
          <h1 className="text-xl font-bold">FleetManagerPro</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search vehicles..."
            className="pl-8"
            value={filters.search}
            onChange={handleSearch}
          />
        </div>

        <VehicleStatusFilters
          statuses={['Active', 'Maintenance', 'Idle']}
          selectedStatuses={filters.statuses}
          counts={statusCounts}
          onStatusToggle={handleStatusToggle}
        />

        <div className="space-y-2">
          {isLoading ? (
            <div>Loading vehicles...</div>
          ) : (
            vehicles.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onClick={handleVehicleSelect}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white p-4 flex justify-between items-center border-b">
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={() => setShowLayers(!showLayers)}
            >
              <Layers className="mr-2 h-4 w-4" />
              Layers
            </Button>
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Geofence
            </Button>
            <Button variant="outline">
              <Route className="mr-2 h-4 w-4" />
              Routes
            </Button>
          </div>
          <div className="flex gap-4">
          <Button 
      variant="destructive"
      onClick={handleEmergency1}
    >
      Emergency
    </Button>
            <Button>
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-[calc(100vh-73px)] bg-gray-200 relative">
          <FleetManagerMap vehicles={filteredVehicles} onVehicleSelect={handleVehicleSelect} />
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button>
              +
            </Button>
            <Button >
              -
            </Button>
          </div>

          {/* Vehicle Detail Dialog */}
          {selectedVehicle && (
            <Dialog open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedVehicle.type} #{selectedVehicle.id}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Driver</p>
                      <p className="font-medium">{selectedVehicle.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{selectedVehicle.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Location</p>
                      <p className="font-medium">{selectedVehicle.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Speed</p>
                      <p className="font-medium">{selectedVehicle.speed} mph</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Stop</p>
                      <p className="font-medium">{selectedVehicle.nextStop}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => handleContactDriver(selectedVehicle.id)}
                    >
                      Contact Driver
                    </Button>
                    <Button>View Route Details</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default FleetManagerPro;