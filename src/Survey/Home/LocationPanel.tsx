import { useRef } from 'react';
import { observer } from 'mobx-react';
import MapboxMap, { MapRef, Marker } from 'react-map-gl/mapbox';
import { useIonViewDidEnter } from '@ionic/react';
import CONFIG from 'common/config';

type Props = {
  latitude: number;
  longitude: number;
};

const LocationPanel = ({ latitude, longitude }: Props) => {
  const mapRef = useRef<MapRef>(null);

  const resizeMap = () => {
    mapRef.current?.resize();
  };
  useIonViewDidEnter(resizeMap);

  return (
    <div className="location-panel">
      <MapboxMap
        ref={mapRef as any}
        zoom={14}
        latitude={latitude}
        longitude={longitude}
        maxZoom={17}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        minZoom={3}
        mapboxAccessToken={CONFIG.map.mapboxApiKey}
        dragPan={false}
        doubleClickZoom={false}
        scrollZoom={false}
      >
        <Marker longitude={longitude} latitude={latitude} />
      </MapboxMap>
    </div>
  );
};

export default observer(LocationPanel);
