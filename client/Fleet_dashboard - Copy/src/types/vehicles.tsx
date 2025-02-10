// Coordinates interface for vehicle location
export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  // Vehicle status type definition
  export type VehicleStatus = 'Active' | 'Maintenance' | 'Idle';
  
  // Main vehicle interface with all properties
  export interface Vehicle {
    id: string;                   // Unique identifier for the vehicle
    type: string;                 // Type of vehicle (truck, van, etc.)
    status: VehicleStatus;        // Current operational status
    driver: string;               // Driver's name
    currentLocation: string;      // Current location description
    speed: number;                // Current speed in mph/kmh
    lastUpdate: string;           // Timestamp of last update
    coordinates: Coordinates;     // GPS coordinates
    nextStop?: string;           // Optional next destination
  }
  
  // Interface for filtering vehicles
  export interface VehicleFilters {
    search: string;              // Search query string
    statuses: VehicleStatus[];   // Array of status filters
  }
  
  // Google Maps type extensions
  declare global {
    interface Window {
      google: typeof google;
    }
  }
  
  // Google Maps custom interfaces
  export interface GMPMap extends google.maps.Map {
    setCenter(center: google.maps.LatLng | google.maps.LatLngLiteral): void;
    setZoom(zoom: number): void;
  }
  
  export interface GMPMarker extends google.maps.Marker {
    setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): void;
    setMap(map: google.maps.Map | null): void;
  }
  
  // Export all types as a namespace
  export namespace VehicleTypes {
    export type Status = VehicleStatus;
    export type VehicleData = Vehicle;
    export type Filters = VehicleFilters;
    export type MapInstance = GMPMap;
    export type MarkerInstance = GMPMarker;
  }
  
  // Default export for easier importing
  export default Vehicle;