import { useEffect } from 'react';
import { Layer, LayerProps, useMap } from 'react-map-gl/mapbox';

type Props = {
  source: string;
  onClick?: any;
  paint?: any;
};

const MarkerLayer = ({ source, onClick: onClickProp, paint }: Props) => {
  const layer: LayerProps = {
    id: 'points',
    source,
    filter: ['==', 'type', 'record'],
    type: 'circle',
    paint: {
      'circle-color': '#000',
      'circle-stroke-width': 3,
      'circle-stroke-color': '#fff',
      'circle-radius': 10,
      ...paint,
    },
  };

  const onClick = (event: any) => onClickProp(event.features[0]);

  const { current: map } = useMap();
  const listenToClicks = () => {
    if (!map || !onClick) return;

    map.on('click', layer.id!, onClick);

    // eslint-disable-next-line consistent-return
    return () => map.off('click', layer.id!, onClick) as any;
  };
  useEffect(listenToClicks, [map, onClick]);

  return <Layer {...layer} />;
};

export default MarkerLayer;
