// useRegionLayer.ts
import { useEffect, useState } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';
import type Map from 'ol/Map';

export function useRegionLayer(map: Map | null, level: number) {
	const [layer, setLayer] = useState<VectorLayer<VectorSource> | null>(null);

	useEffect(() => {
		if (!map) return;

		if (layer) map.removeLayer(layer);

		const vectorLayer = new VectorLayer({
			source: new VectorSource({
				url: `/data/gadm41_USA_${level}.json`,
				format: new GeoJSON({
					dataProjection: 'EPSG:4326',
					featureProjection: 'EPSG:3857',
				}),
			}),
			style: new Style({
				stroke: new Stroke({ color: '#2563eb', width: 1.5 }),
				fill: new Fill({ color: 'rgba(37,99,235,0.15)' }),
			}),
		});

		map.addLayer(vectorLayer);
		setLayer(vectorLayer);

		return () => {
			map.removeLayer(vectorLayer);
		};
	}, [map, level]);
}
