import { DirectionsService } from '@react-google-maps/api';
export const libraries = ['places', 'geometry', 'drawing'];
export const initializeMap = (apiKey) => {
  // Initialize Google Maps
};

export const calculateRoute = async (origin, destination, waypoints = []) => {
  return new Promise((resolve, reject) => {
    const directionsService = new window.google.maps.DirectionsService();

    const createLatLng = (point) => {
      if (typeof point === 'string') return point;
      return new window.google.maps.LatLng(
        parseFloat(point.lat),
        parseFloat(point.lng)
      );
    };

    const request = {
      origin: createLatLng(origin),
      destination: createLatLng(destination),
      waypoints: waypoints.map(wp => ({
        location: createLatLng(wp.location),
        stopover: wp.stopover
      })),
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        resolve(result);
      } else {
        reject(new Error(`Failed to calculate route: ${status}`));
      }
    });
  });
};

export const getDistanceMatrix = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.DistanceMatrixService();
    
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      },
      (response, status) => {
        if (status === 'OK') {
          resolve(response);
        } else {
          reject(new Error(`Distance Matrix failed: ${status}`));
        }
      }
    );
  });
};

export const snapToRoads = async (path) => {
  try {
    const response = await fetch(
      `https://roads.googleapis.com/v1/snapToRoads?path=${path.map(p => 
        `${p.lat},${p.lng}`).join('|')}&interpolate=true&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Roads API request failed');
    }

    const data = await response.json();
    return data.snappedPoints.map(point => ({
      lat: point.location.latitude,
      lng: point.location.longitude,
      placeId: point.placeId
    }));
  } catch (error) {
    console.error('Roads API Error:', error);
    throw error;
  }
};

export const getNearestRoads = async (points) => {
  try {
    const response = await fetch(
      `https://roads.googleapis.com/v1/nearestRoads?points=${points.map(p => 
        `${p.lat},${p.lng}`).join('|')}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Nearest roads request failed');
    }

    const data = await response.json();
    return data.snappedPoints;
  } catch (error) {
    console.error('Nearest Roads API Error:', error);
    throw error;
  }
};

export const getSpeedLimits = async (placeIds) => {
  try {
    const response = await fetch(
      `https://roads.googleapis.com/v1/speedLimits?placeId=${
        placeIds.join('&placeId=')}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Speed limits request failed');
    }

    const data = await response.json();
    return data.speedLimits;
  } catch (error) {
    console.error('Speed Limits API Error:', error);
    throw error;
  }
};

export const getCurrentPreciseLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading
        });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};

export const fetchNearbyPlaces = async (location, radius = 5000, type = 'street_address') => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius,
      type: [type]
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        reject(new Error('Places API failed'));
      }
    });
  });
};

export const getRouteAlternatives = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin,
      destination,
      alternatives: true,
      provideRouteAlternatives: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        resolve(result);
      } else {
        reject(new Error('Failed to get alternative routes'));
      }
    });
  });
};
