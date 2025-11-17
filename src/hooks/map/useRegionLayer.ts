import { useEffect, useRef, useState } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';
import type Map from 'ol/Map';
import type Feature from 'ol/Feature';
import type Geometry from 'ol/geom/Geometry';

export function useRegionLayer(map: Map | null, level: number) {
	const layerRef = useRef<VectorLayer<
		VectorSource<Feature<Geometry>>
	> | null>(null);
	const [layer, setLayer] = useState<VectorLayer<
		VectorSource<Feature<Geometry>>
	> | null>(null);

	useEffect(() => {
		if (!map) return;

		// Remove previous layer
		if (layerRef.current) {
			map.removeLayer(layerRef.current);
		}

		const vectorLayer = new VectorLayer<VectorSource<Feature<Geometry>>>({
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
		layerRef.current = vectorLayer;
		setLayer(vectorLayer);

		return () => {
			if (layerRef.current) {
				map.removeLayer(layerRef.current);
				layerRef.current = null;
				setLayer(null);
			}
		};
	}, [map, level]);

	return layer;
}
