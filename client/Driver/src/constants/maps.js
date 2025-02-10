export const libraries = ['places', 'geometry', 'drawing'];

export const mapOptions = {
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }]
    }
  ],
  mapTypeControl: false,
  zoomControl: true,
  streetViewControl: false,
  fullscreenControl: false
};