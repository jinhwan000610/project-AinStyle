import React, { useRef, useState, useEffect } from 'react';
import { Autocomplete, GoogleMap, Marker, useJsApiLoader, Libraries } from '@react-google-maps/api';
import axios from 'axios';

interface WeatherData {
  desc: string;
  temp: number;
  icon: string;
}

interface GooglemapsProps {
  onLocationChange: (locationData: { lat: number; lng: number; weather: WeatherData }) => void;
}

const defaultCenter = { lat: 37.5665, lng: 126.978 };
const koreaBounds = {
  north: 38.6347,
  south: 33.0041,
  east: 131.8723,
  west: 124.6097,
};

const libraries: Libraries = ['places'];

const Googlemaps: React.FC<GooglemapsProps> = ({ onLocationChange }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedPosition(currentLocation);
          if (map) {
            map.panTo(currentLocation);
            map.setZoom(15);
          }
          fetchWeather(currentLocation.lat, currentLocation.lng);
        },
        () => {
          alert('Unable to retrieve your location');
        }
      );
    }
  }, [map]);

  const fetchWeather = (lat: number, lng: number) => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=kr`;
    
    axios.get(url).then(response => {
      const { weather, main } = response.data;
      const newWeather = {
        desc: weather[0].description,
        temp: main.temp,
        icon: `https://openweathermap.org/img/w/${weather[0].icon}.png`
      };
      setWeather(newWeather);
      // Ensure onLocationChange is called with the correct data
      onLocationChange({ lat, lng, weather: newWeather });
    }).catch(error => console.log(error));
  };
  
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place || !place.geometry) {
      alert('Returned place contains no geometry');
      return;
    }
    const location = place.geometry?.location;
    const newLocation = { lat: location!.lat(), lng: location!.lng()! };
    setSelectedPosition(newLocation);
    if (map) {
      map.panTo(newLocation);
      map.setZoom(15);
    }
    fetchWeather(newLocation.lat, newLocation.lng);
  };

  const handleMapRightClick = (event: google.maps.MapMouseEvent) => {
    const newLocation = {
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    };
    setSelectedPosition(newLocation);
    if (map) {
      map.panTo(newLocation);
      map.setZoom(15);
    }
    fetchWeather(newLocation.lat, newLocation.lng);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
          options={{ bounds: koreaBounds, strictBounds: true }}
        >
          <input type="text" placeholder="Search for a place" style={{ width: '300px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </Autocomplete>
      </div>
      <GoogleMap
        center={selectedPosition || defaultCenter}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDoubleClickZoom: true,
          restriction: {
            latLngBounds: koreaBounds,
            strictBounds: true,
          },
        }}
        onLoad={setMap}
        onRightClick={handleMapRightClick}
      >
        {selectedPosition && (
          <Marker position={selectedPosition} />
        )}
      </GoogleMap>
      {weather && (
        <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px', position: 'absolute', bottom: '10px', left: '10px', zIndex: 1 }}>
          <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
            날씨: {weather.desc} {weather.temp}°C
            <img src={weather.icon} alt="Weather icon" style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
          </p>
        </div>
      )}
    </div>
  );
}

export default Googlemaps;
