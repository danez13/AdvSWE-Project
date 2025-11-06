// components/site/map/hooks/useMap.ts
import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

export function useMap() {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const [map, setMap] = useState<Map | null>(null);

	useEffect(() => {
		if (!mapRef.current) return;

		const baseLayer = new TileLayer({ source: new OSM() });
		const mapInstance = new Map({
			target: mapRef.current,
			layers: [baseLayer],
			view: new View({
				center: fromLonLat([0, 0]),
				zoom: 2,
			}),
		});

		setMap(mapInstance);

		return () => {
			mapInstance.setTarget(undefined);
		};
	}, []);

	return { map, mapRef };
}
