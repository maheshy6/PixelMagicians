import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import { calculateRoute, getDistanceMatrix, getSpeedLimits, getNearestRoads } from '../api/maps';

const RouteConfirmation = () => {
  const navigate = useNavigate();
  const [routeDetails, setRouteDetails] = useState({
    pickup: '1234, 1st Street, San Francisco, CA 94107',
    dropoff: '5678, 2nd Street, San Francisco, CA 94107',
    distance: '3.2 miles'
  });

  const [mapLoaded, setMapLoaded] = useState(false);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 37.7749,  // SF coordinates
    lng: -122.4194
  });

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '12px'
  };

  const loadRouteDetails = useCallback(async () => {
    try {
      const result = await calculateRoute(routeDetails.pickup, routeDetails.dropoff);
      setDirections(result);

      const matrix = await getDistanceMatrix(routeDetails.pickup, routeDetails.dropoff);
      const route = matrix.rows[0].elements[0];

      // Get nearest roads for more accurate routing
      const path = result.routes[0].overview_path.map(point => ({
        lat: point.lat(),
        lng: point.lng()
      }));
      await getNearestRoads(path.slice(0, 100)); // API limit of 100 points

      setRouteDetails(prev => ({
        ...prev,
        distance: route.distance.text,
        duration: route.duration.text
      }));
    } catch (error) {
      console.error('Route calculation failed:', error);
    }
  }, [routeDetails.pickup, routeDetails.dropoff]);

  const getNearbyLocations = useCallback(async () => {
    if (!currentLocation) return;
    
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng),
      radius: '5000', // 5km radius
      type: ['street_address']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const nearbyAddresses = results.map(place => ({
          address: place.vicinity,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        }));

        setRouteDetails(prev => ({
          ...prev,
          nearbyPickups: nearbyAddresses.slice(0, 5),
          nearbyDropoffs: nearbyAddresses.slice(5, 10)
        }));
      }
    });
  }, [currentLocation]);

  useEffect(() => {
    if (mapLoaded) {
      loadRouteDetails();
    }
  }, [mapLoaded, loadRouteDetails]);

  useEffect(() => {
    if (mapLoaded && currentLocation) {
      getNearbyLocations();
    }
  }, [mapLoaded, currentLocation, getNearbyLocations]);

  const handleStartTrip = async () => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      
      const [pickupCoords, dropoffCoords] = await Promise.all([
        new Promise((resolve, reject) => {
          geocoder.geocode({ address: routeDetails.pickup }, (results, status) => {
            if (status === 'OK') {
              const location = results[0].geometry.location;
              resolve({ lat: location.lat(), lng: location.lng() });
            } else reject(new Error('Geocoding failed'));
          });
        }),
        new Promise((resolve, reject) => {
          geocoder.geocode({ address: routeDetails.dropoff }, (results, status) => {
            if (status === 'OK') {
              const location = results[0].geometry.location;
              resolve({ lat: location.lat(), lng: location.lng() });
            } else reject(new Error('Geocoding failed'));
          });
        })
      ]);

      navigate('/active-delivery', { 
        state: { 
          routeDetails: {
            pickup: routeDetails.pickup,
            dropoff: routeDetails.dropoff,
            distance: routeDetails.distance,
            duration: routeDetails.duration,
            coordinates: {
              start: pickupCoords,
              end: dropoffCoords
            }
          }
        }
      });
    } catch (error) {
      console.error('Failed to get coordinates:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 w-full max-w-md mx-auto p-4">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-white mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">Route confirmation</h1>
        </div>

        <p className="text-gray-400 mb-6">
          Please confirm your route before starting the journey.
        </p>

        <div className="mb-6">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentLocation}
            zoom={13}
            options={{
              styles: [
                {
                  elementType: "geometry",
                  stylers: [{ color: "#242f3e" }]
                },
                {
                  elementType: "labels.text.stroke",
                  stylers: [{ color: "#242f3e" }]
                },
                {
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#746855" }]
                }
              ],
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: true,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: true
            }}
          >
            {directions && (
              <DirectionsRenderer 
                directions={directions}
                options={{
                  suppressMarkers: false,
                  polylineOptions: {
                    strokeColor: "#4F46E5",
                    strokeWeight: 5
                  }
                }}
              />
            )}
          </GoogleMap>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Pick up</p>
                <p className="text-white">{routeDetails.pickup}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Drop off</p>
                <p className="text-white">{routeDetails.dropoff}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Total distance</p>
                <p className="text-white">{routeDetails.distance}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartTrip}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Start trip
        </button>
      </div>
    </div>
  );
};

export default RouteConfirmation; 