import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import { calculateRoute, getDistanceMatrix } from '../api/maps';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [delivery, setDelivery] = useState({
    pickupTime: '11:00 AM',
    route: {
      from: 'Los Angeles, CA',
      to: 'Phoenix, AZ'
    },
    compensation: 350.00,
    status: 'pending' // pending, active, completed
  });

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 34.0522,  // LA coordinates
    lng: -118.2437
  });

  const [directions, setDirections] = useState(null);
  const [routeDetails, setRouteDetails] = useState({
    distance: '',
    duration: '',
    route: null
  });

  const [snappedPoints, setSnappedPoints] = useState([]);
  const [speedLimits, setSpeedLimits] = useState([]);
  const [roadInfo, setRoadInfo] = useState(null);

  const [applicationStatus, setApplicationStatus] = useState('none'); // none, pending, accepted, rejected

  const navigate = useNavigate();

  const mapContainerStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '12px'
  };

  const startRoute = () => {
    // Update delivery status
    setDelivery(prev => ({
      ...prev,
      status: 'active'
    }));
    
    // Here you would integrate with your navigation system
    // and start location tracking
  };

  // Watch position when route is active
  useEffect(() => {
    let watchId;
    if (delivery.status === 'active') {
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => console.error('Geolocation error:', error),
          { enableHighAccuracy: true }
        );
      }
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [delivery.status]);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleMapError = (error) => {
    console.error('Google Maps Error:', error);
    setMapError('Failed to load map');
  };

  const loadRoute = useCallback(async () => {
    try {
      const result = await calculateRoute(delivery.route.from, delivery.route.to);
      setDirections(result);
      await processRouteWithRoadsAPI(result);

      const matrix = await getDistanceMatrix(delivery.route.from, delivery.route.to);
      const route = matrix.rows[0].elements[0];
      
      setRouteDetails({
        distance: route.distance.text,
        duration: route.duration.text,
        route: result
      });
    } catch (error) {
      console.error('Route calculation failed:', error);
      setMapError('Failed to calculate route');
    }
  }, [delivery.route]);

  const processRouteWithRoadsAPI = async (routeResult) => {
    try {
      // Get path coordinates from route but limit points
      const path = routeResult.routes[0].overview_path
        .filter((_, index) => index % 10 === 0) // Take every 10th point to reduce data
        .map(point => ({
          lat: point.lat(),
          lng: point.lng()
        }));

      if (path.length > 100) {
        path.length = 100; // Limit to 100 points maximum
      }

      setRoadInfo({
        totalPoints: path.length,
        speedLimits: [],
        roadTypes: new Set()
      });
    } catch (error) {
      console.error('Roads API processing failed:', error);
      // Don't set error - allow map to still function
    }
  };

  useEffect(() => {
    if (mapLoaded) {
      loadRoute();
    }
  }, [mapLoaded, loadRoute]);

  const handleApply = async () => {
    try {
      setApplicationStatus('pending');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setApplicationStatus('accepted');
      
      // Navigate to delivery details instead of showing alert
      navigate('/delivery-details');
    } catch (error) {
      setApplicationStatus('rejected');
      console.error('Application failed:', error);
    }
  };

  const renderActionButton = () => {
    switch (applicationStatus) {
      case 'none':
        return (
          <button
            onClick={handleApply}
            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors mb-4"
          >
            Apply for Route
          </button>
        );
      case 'pending':
        return (
          <button
            disabled
            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gray-600 cursor-not-allowed mb-4"
          >
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Application
            </span>
          </button>
        );
      case 'accepted':
        return (
          <button
            onClick={startRoute}
            disabled={delivery.status !== 'pending'}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors mb-4
              ${delivery.status === 'pending' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-600 cursor-not-allowed'}`}
          >
            {delivery.status === 'pending' ? 'Start Route' : 'Route In Progress'}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 w-full max-w-md mx-auto p-4">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

        {/* Delivery Info */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-semibold">Pickup at {delivery.pickupTime}</h2>
              <p className="text-gray-400 text-sm">
                Route: {delivery.route.from} to {delivery.route.to}
              </p>
            </div>
          </div>

          {/* Compensation */}
          <div className="flex items-center justify-between py-3 border-t border-gray-700">
            <span className="text-white">Compensation:</span>
            <div className="flex items-center">
              <span className="text-white font-semibold">${delivery.compensation.toFixed(2)}</span>
              <svg className="w-5 h-5 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Route Details */}
        {routeDetails.distance && (
          <div className="mb-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex justify-between items-center text-white">
              <span>Distance:</span>
              <span className="font-semibold">{routeDetails.distance}</span>
            </div>
            <div className="flex justify-between items-center text-white mt-2">
              <span>Duration:</span>
              <span className="font-semibold">{routeDetails.duration}</span>
            </div>
          </div>
        )}

        {/* Application Status */}
        {applicationStatus === 'rejected' && (
          <div className="mb-4 p-4 bg-red-500/10 rounded-lg">
            <p className="text-red-500 text-sm text-center">
              Application failed. Please try again later.
            </p>
          </div>
        )}

        {/* Map Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Route Map</h2>
          {mapError ? (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-center">
              {mapError}
            </div>
          ) : (
            <LoadScript 
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              onLoad={handleMapLoad}
              onError={handleMapError}
              libraries={['places', 'geometry']}
            >
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
                  disableDefaultUI: true
                }}
              >
                {directions && (
                  <DirectionsRenderer 
                    directions={directions}
                    options={{
                      suppressMarkers: true,
                      polylineOptions: {
                        strokeColor: "#4F46E5",
                        strokeWeight: 5
                      }
                    }}
                  />
                )}
                <MarkerF 
                  position={currentLocation}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  }}
                />
              </GoogleMap>
            </LoadScript>
          )}
        </div>

        {/* Action Buttons */}
        {renderActionButton()}
      </div>
    </div>
  );
};

export default Dashboard;
