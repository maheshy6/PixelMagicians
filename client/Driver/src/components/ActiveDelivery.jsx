import { libraries, mapOptions } from '../constants/maps';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLoadScript, GoogleMap, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import { calculateRoute, getDistanceMatrix, getNearestRoads, getSpeedLimits, fetchNearbyPlaces, getRouteAlternatives } from '../api/maps';
import { useNavigate, useLocation } from 'react-router-dom';

const ActiveDelivery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeDetails = location.state?.routeDetails;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA6fqiuXboJLh3I2p0mIh82KabmvLXKRr8",
    libraries: ['places']
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [isTripStarted, setIsTripStarted] = useState(false);
  const [routeInfo, setRouteInfo] = useState({
    distance: '',
    duration: '',
    waypoints: [],
    speedLimits: [],
    nextInstruction: '',
    maneuver: '',
    alternatives: [],
    nearbyPickupPlaces: [],
    nearbyDropoffPlaces: []
  });
  const mapRef = useRef(null);
  const watchId = useRef(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const watchPreciseLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading
        };
        setCurrentLocation(newLocation);
        updateRouteInfo(newLocation);
      },
      (error) => console.error('Geolocation error:', error),
      options
    );
  }, []);

  useEffect(() => {
    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  const updateRouteInfo = useCallback(async (newLocation) => {
    if (!optimizedRoute || !newLocation) return;

    try {
      const leg = optimizedRoute.routes[0].legs[0];
      let closestStep = null;
      let minDistance = Infinity;

      leg.steps.forEach(step => {
        const stepLocation = step.start_location;
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(newLocation.lat, newLocation.lng),
          stepLocation
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestStep = step;
        }
      });

      if (closestStep) {
        setRouteInfo(prev => ({
          ...prev,
          nextInstruction: closestStep.instructions,
          maneuver: closestStep.maneuver || ''
        }));
      }
    } catch (error) {
      console.error('Error updating route info:', error);
    }
  }, [optimizedRoute]);

  const getCoordinates = async (details) => {
    if (details.coordinates?.start && details.coordinates?.end) {
      return details.coordinates;
    }

    const geocoder = new window.google.maps.Geocoder();
    const [start, end] = await Promise.all([
      new Promise((resolve, reject) => {
        geocoder.geocode({ address: details.pickup }, (results, status) => {
          if (status === 'OK') {
            const location = results[0].geometry.location;
            resolve({ lat: location.lat(), lng: location.lng() });
          } else reject(new Error('Geocoding failed'));
        });
      }),
      new Promise((resolve, reject) => {
        geocoder.geocode({ address: details.dropoff }, (results, status) => {
          if (status === 'OK') {
            const location = results[0].geometry.location;
            resolve({ lat: location.lat(), lng: location.lng() });
          } else reject(new Error('Geocoding failed'));
        });
      })
    ]);

    return { start, end };
  };

  const loadOptimizedRoute = useCallback(async () => {
    if (!routeDetails?.pickup || !routeDetails?.dropoff) return;

    try {
      const coords = await getCoordinates(routeDetails);
      
      const directionsService = new window.google.maps.DirectionsService();

      const result = await directionsService.route({
        origin: coords.start,
        destination: coords.end,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        provideRouteAlternatives: true
      });

      setDirectionsResponse(result);
      setRouteInfo(prev => ({
        ...prev,
        distance: result.routes[0].legs[0].distance.text,
        duration: result.routes[0].legs[0].duration.text,
        nextInstruction: result.routes[0].legs[0].steps[0].instructions
      }));

      if (mapRef.current && result.routes[0]) {
        const bounds = new window.google.maps.LatLngBounds();
        result.routes[0].legs[0].steps.forEach(step => {
          bounds.extend(step.start_location);
          bounds.extend(step.end_location);
        });
        mapRef.current.fitBounds(bounds);
      }

    } catch (error) {
      console.error('Failed to calculate route:', error);
    }
  }, [routeDetails]);

  const calculateAndDisplayRoute = useCallback((directionsService, directionsRenderer) => {
    if (!routeDetails?.pickup || !routeDetails?.dropoff) return;

    directionsService.route({
      origin: routeDetails.pickup,
      destination: routeDetails.dropoff,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      setDirectionsResponse(response);
    })
    .catch((e) => console.error("Directions request failed due to " + e));
  }, [routeDetails]);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer);
  }, [calculateAndDisplayRoute]);

  const handleStartTrip = async () => {
    if (!isLoaded || !routeDetails) {
      alert('Please wait for maps to load or provide route details');
      return;
    }
    watchPreciseLocation();
    try {
      await loadOptimizedRoute();
      setIsTripStarted(true);
    } catch (error) {
      console.error('Error starting trip:', error);
    }
  };

  const mapContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100vh'
  };

  const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194
  };

  if (loadError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="text-red-500">Error loading maps: {loadError.message}</div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading maps...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation || defaultCenter}
        zoom={15}
        options={mapOptions}
        onLoad={handleMapLoad}
      >
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: false,
              polylineOptions: {
                strokeColor: "#4F46E5",
                strokeWeight: 5
              }
            }}
          />
        )}
        {currentLocation && (
          <MarkerF 
            position={currentLocation}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4F46E5",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF"
            }}
          />
        )}
        {routeDetails?.coordinates && (
          <>
            <MarkerF 
              position={routeDetails.coordinates.start}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                scaledSize: new window.google.maps.Size(40, 40)
              }}
              label={{
                text: "Pickup",
                className: "marker-label"
              }}
            />
            <MarkerF 
              position={routeDetails.coordinates.end}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(40, 40)
              }}
              label={{
                text: "Dropoff",
                className: "marker-label"
              }}
            />
          </>
        )}
      </GoogleMap>
      {directionsResponse && (
        <div className="absolute right-4 top-4 bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-[60vh] overflow-y-auto">
          <h3 className="font-semibold mb-2">Turn-by-turn directions</h3>
          {directionsResponse.routes[0].legs[0].steps.map((step, index) => (
            <div key={index} className="mb-2 text-sm">
              <div dangerouslySetInnerHTML={{ __html: step.instructions }} />
              <div className="text-xs text-gray-500">{step.distance.text}</div>
            </div>
          ))}
        </div>
      )}
      {routeInfo.nextInstruction && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 text-white p-4">
          <div className="max-w-md mx-auto">
            <p className="font-semibold">{routeInfo.nextInstruction}</p>
            <div className="flex justify-between mt-2 text-sm text-gray-300">
              <span>{routeInfo.distance}</span>
              <span>{routeInfo.duration}</span>
            </div>
          </div>
        </div>
      )}
      {isTripStarted && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Available Routes</h3>
          {routeInfo.alternatives?.map((route, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded"
              onClick={() => {
                setDirections({
                  ...directions,
                  routes: [route]
                });
              }}
            >
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-400'} mr-2`} />
                <div>
                  <div className="text-sm font-medium">Route {index + 1}</div>
                  <div className="text-xs text-gray-500">
                    {route.legs[0].distance.text} • {route.legs[0].duration.text}
                  </div>
                </div>
              </div>
              {route.warnings?.length > 0 && (
                <div className="text-xs text-orange-500">
                  {route.warnings[0]}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {!isTripStarted && (
        <button
          onClick={handleStartTrip}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors"
        >
          Start Delivery
        </button>
      )}
    </div>
  );
};

export default ActiveDelivery;