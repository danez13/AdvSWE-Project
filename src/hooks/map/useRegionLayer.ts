import { useEffect, useRef } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';
import type Map from 'ol/Map';

export function useRegionLayer(map: Map | null, level: number) {
	const layerRef = useRef<VectorLayer<VectorSource> | null>(null);

	useEffect(() => {
		if (!map) return;

		// Remove previous vector layer if it exists
		if (layerRef.current) {
			map.removeLayer(layerRef.current);
		}

		// Create a new vector layer for the selected level
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

		// Add the layer to the map
		map.addLayer(vectorLayer);
		layerRef.current = vectorLayer;

		// Clean up when component unmounts or level changes
		return () => {
			if (layerRef.current) {
				map.removeLayer(layerRef.current);
				layerRef.current = null;
			}
		};
	}, [map, level]);
}
