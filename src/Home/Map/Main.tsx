import { useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { Source } from 'react-map-gl/mapbox';
import { Main, MapContainer, useAlert } from '@flumens';
import { IonSpinner } from '@ionic/react';
import CONFIG from 'common/config';
import MarkerClusterLayer from './Components/ClusterLayer';
import GeolocateButton from './Components/GeolocateButton';
import MarkerLayer from './Components/MarkerLayer';

const getGeoJSONfromRecords = (records?: Record[]): any => {
  const getFeature = (record: Record) => ({
    type: 'Feature',
    properties: {
      id: record.id,
      type: 'record',
      verification: record.verification.status_code,
    },
    geometry: {
      type: 'Point',
      coordinates: [record.lng, record.lat, 0.0],
    },
  });

  return {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: records?.map(getFeature) || [],
  };
};

type Record = any;

const useRecordPopup = (records: Record[]) => {
  const alert = useAlert();

  const showRecordPopup = (feature: any) => {
    const byId = (record: Record) => record.id === feature.properties.id;
    const record = records?.find(byId);
    if (!record) return;

    let image;

    if (record.images.length) {
      const imagePath = record.images[0].path;
      image = <img src={`${CONFIG.backend.mediaUrl}${imagePath}`} />;
    } else {
      image = (
        <div className="missing-image">
          <T>This record has no images.</T>
        </div>
      );
    }

    const statuses = {
      R: 'rejected',
      V: 'verified',
    };

    let statusText = (statuses as any)[record.verification.status_code];
    if (
      !statusText &&
      record.verification.status_code === 'C' &&
      record.verification.substatus_code === '3'
    ) {
      statusText = 'plausible';
    }

    alert({
      header: record.sample_date.split(' ')[0],
      cssClass: 'location-map',
      message: (
        <>
          <div className="alert-record-status">
            <T>{statusText}</T>
          </div>
          {image}
        </>
      ),
      buttons: [
        {
          text: 'OK',
          cssClass: 'primary',
        },
      ],
    });
  };

  return showRecordPopup;
};

type Props = {
  records: Record[];
  onMoveEnd: any;
  isFetchingRecords?: boolean;
};

const MapComponent = ({
  records,
  onMoveEnd: onMoveEndProp,
  isFetchingRecords,
}: Props) => {
  const [mapRef, setMapRef] = useState<any>();

  const showRecordPopup = useRecordPopup(records);

  const onMoveEnd = () => {
    const bounds = mapRef?.getBounds();
    if (!bounds) return;
    // bounds.pad(0.5); // +50%

    onMoveEndProp(bounds);
  };

  const data = useMemo(
    // eslint-disable-next-line @getify/proper-arrows/name
    () => getGeoJSONfromRecords(records),
    [records]
  );

  const onMapReady = (newMapRef: any) => {
    setMapRef(newMapRef);
    onMoveEndProp(newMapRef.getBounds());
  };

  return (
    <Main className="[--padding-bottom:0] [--padding-top:0]">
      <MapContainer
        onReady={onMapReady}
        maxZoom={17}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        minZoom={3}
        onMoveEnd={onMoveEnd}
        accessToken={CONFIG.map.mapboxApiKey}
      >
        <GeolocateButton />

        <Source
          id="records"
          type="geojson"
          data={data}
          cluster
          clusterMaxZoom={10}
          clusterRadius={50}
        >
          <MarkerClusterLayer source="records" />
          <MarkerLayer
            source="records"
            onClick={showRecordPopup}
            paint={{
              'circle-color': [
                'match',
                ['get', 'verification'],
                'C',
                '#e0b500',
                'V',
                '#098b5c',
                'R',
                '#f04141',
                /* other */ '#fff',
              ],
            }}
          />
        </Source>

        <MapContainer.Control>
          {isFetchingRecords ? (
            <IonSpinner color="medium" className="mx-auto block" />
          ) : (
            <div />
          )}
        </MapContainer.Control>
      </MapContainer>
    </Main>
  );
};

export default observer(MapComponent);
