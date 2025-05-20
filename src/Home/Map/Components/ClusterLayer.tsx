/* eslint-disable @getify/proper-arrows/name */
import { useEffect } from 'react';
import { LayerProps, Layer as MapLayer, useMap } from 'react-map-gl/mapbox';

type Props = {
  source: string;
};

const Layer = ({ source }: Props) => {
  const layer: LayerProps = {
    id: 'clusters',
    type: 'circle',
    source,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#087a51',
        100,
        '#095338',
      ],
      'circle-stroke-width': 3,
      'circle-stroke-color': '#fff',
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    },
  };

  const countLayer: LayerProps = {
    id: 'cluster-counts',
    type: 'symbol',
    source,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['Source Sans Pro Regular'], // has to match the OS returned main font - otherwise "Unimplemented Type: 3" error
      'text-size': 16,
    },
    paint: {
      'text-color': 'white',
    },
  };

  const mapRef = useMap();

  const onClick = (event: any) => {
    if (!mapRef.current) return;

    const [feature] = event.features;
    if (!feature) return;

    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current.getSource('records') as any;

    const flyToCluster = (err: any, zoom: any) => {
      if (err) return;

      mapRef.current?.flyTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    };
    mapboxSource.getClusterExpansionZoom(clusterId, flyToCluster);
  };

  const { current: map } = useMap();
  const listenToClicks = () => {
    if (!map) return;

    map.on('click', layer.id!, onClick);

    // eslint-disable-next-line consistent-return
    return () => map.off('click', layer.id!, onClick) as any;
  };
  useEffect(listenToClicks, [map]);

  return (
    <>
      <MapLayer {...layer} />
      <MapLayer {...countLayer} />
    </>
  );
};

export default Layer;
