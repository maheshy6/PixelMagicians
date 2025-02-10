import { Vehicle } from '../types/vehicles';

const mockVehicles: Vehicle[] = [
    {
        id: "V001",
        type: "Truck",
        status: "Active",
        driver: "John Doe",
        currentLocation: "Manhattan, NY",
        speed: 45,
        lastUpdate: new Date().toISOString(),
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        },
        nextStop: "Brooklyn, NY"
    },
    {
        id: "V002",
        type: "Van",
        status: "Maintenance",
        driver: "Jane Smith",
        currentLocation: "Brooklyn, NY",
        speed: 0,
        lastUpdate: new Date().toISOString(),
        coordinates: {
            lat: 40.6782,
            lng: -73.9442
        },
        nextStop: "Service Center"
    },
    {
        id: "V003",
        type: "Truck",
        status: "Active",
        driver: "Mike Johnson",
        currentLocation: "Queens, NY",
        speed: 35,
        lastUpdate: new Date().toISOString(),
        coordinates: {
            lat: 40.7282,
            lng: -73.7949
        },
        nextStop: "Bronx, NY"
    },
    {
        id: "V004",
        type: "Van",
        status: "Idle",
        driver: "Sarah Wilson",
        currentLocation: "Staten Island, NY",
        speed: 0,
        lastUpdate: new Date().toISOString(),
        coordinates: {
            lat: 19.075009032001336,
            lng: 72.8746071999662
        },
        nextStop: "Manhattan, NY"
    },
    {
        id: "V005",
        type: "Truck",
        status: "Active",
        driver: "Tom Brown",
        currentLocation: "Bronx, NY",
        speed: 40,
        lastUpdate: new Date().toISOString(),
        coordinates: {
            lat: 40.8448,
            lng: -73.8648
        },
        nextStop: "Queens, NY"
    }
];

export const mockApiService = {
    fetchVehicles: async (): Promise<Vehicle[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockVehicles;
    }
};

export default mockApiService;