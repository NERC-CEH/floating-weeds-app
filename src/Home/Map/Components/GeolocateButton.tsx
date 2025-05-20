import { useMapFlyToCurrentLocation, MapContainer } from '@flumens';
import GPS from 'helpers/GPS';

const GeolocateButton = () => {
  const { isLocating, centerMapToCurrentLocation } = useMapFlyToCurrentLocation(
    {
      ...GPS,
      start(onPosition: any): any {
        return GPS.start({ callback: onPosition });
      },
      stop(id: any): any {
        return GPS.stop(id);
      },
    }
  );

  return (
    <MapContainer.Control.Geolocate
      isLocating={isLocating}
      onClick={centerMapToCurrentLocation}
    />
  );
};

export default GeolocateButton;
