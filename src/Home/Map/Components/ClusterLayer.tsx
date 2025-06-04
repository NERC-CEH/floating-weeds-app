/* eslint-disable @getify/proper-arrows/name */
import { useCallback, useEffect } from 'react';
import { LayerProps, Layer as MapLayer, useMap } from 'react-map-gl/mapbox';

type Props = {
  source: string;
  onClick?: any;
};

const Layer = ({ source, onClick: onClickProp }: Props) => {
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

  const { current: map } = useMap();

  const onClick = useCallback(
    async (event: any) => {
      const { features } = event;

      if (!features || !features.length) {
        onClickProp([]);
        return;
      }

      const clickedFeature = features[0];

      // check if it's a cluster
      if (clickedFeature.properties?.cluster) {
        const clusterId = clickedFeature.properties.cluster_id;

        // get the actual features that are clustered
        const mapSource = map?.getSource(source) as any;

        if (mapSource && mapSource.getClusterLeaves) {
          try {
            const clusteredFeatures = await new Promise((resolve, reject) => {
              mapSource.getClusterLeaves(
                clusterId,
                clickedFeature.properties.point_count,
                0,
                (error: any, feat: any) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(feat);
                  }
                }
              );
            });

            onClickProp(clusteredFeatures);
          } catch (error) {
            console.debug('🔵 Error getting cluster leaves:', error);
            onClickProp(features);
          }
        } else {
          onClickProp(features);
        }
      } else {
        // single feature click
        onClickProp(features);
      }
    },
    [onClickProp]
  );

  const listenToClicks = () => {
    if (!map) return;

    map.on('click', layer.id!, onClick);

    // eslint-disable-next-line consistent-return
    return () => map.off('click', layer.id!, onClick) as any;
  };
  useEffect(listenToClicks, [map, onClick]);

  return (
    <>
      <MapLayer {...layer} />
      <MapLayer {...countLayer} />
    </>
  );
};

export default Layer;
