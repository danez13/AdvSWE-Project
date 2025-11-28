// hooks/map/useMap.ts
'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

config.apiKey = 'll5WkrO164th37ugLobs';

export function useMap() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<Map | null>(null);
	const [map, setMap] = useState<Map | null>(null);

	useEffect(() => {
		if (!mapContainer.current) return;
		if (mapRef.current) return; // Prevent reinitializing

		console.log('Initializing MapTiler map...');

		const mapInstance = new Map({
			container: mapContainer.current,
			style: MapStyle.STREETS, // Try STREETS first to ensure something shows
			center: [-98.5795, 39.8283], // US center
			zoom: 4,
		});

		mapRef.current = mapInstance;

		// Wait for map to load
		mapInstance.on('load', () => {
			console.log('Map loaded successfully');
			setMap(mapInstance);
		});

		mapInstance.on('error', (e) => {
			console.error('Map error:', e);
		});

		return () => {
			console.log('Cleaning up map...');
			mapInstance.remove();
			mapRef.current = null;
		};
	}, []);

	return { map, mapContainer };
}
