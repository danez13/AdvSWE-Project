// hooks/map/useRegionPopup.ts
'use client';

import { useEffect, useState } from 'react';
import { Map, MapMouseEvent } from '@maptiler/sdk';
import { Popup } from '@maptiler/sdk';
import { Feature, Geometry } from 'geojson';

interface UseRegionPopupProps {
	map: Map | null;
	level: number;
}

interface RegionFeature {
	properties: Feature['properties'];
	geometry: Geometry;
}

export function useRegionOverlay({ map, level }: UseRegionPopupProps) {
	const [selectedFeature, setSelectedFeature] =
		useState<RegionFeature | null>(null);
	const [popup, setPopup] = useState<Popup | null>(null);

	useEffect(() => {
		if (!map) return;

		const layerId = `regions-layer-${level}`;

		// Create popup
		const newPopup = new Popup({
			closeButton: true,
			closeOnClick: false,
		});
		setPopup(newPopup);

		// Handle click on regions
		const handleClick = (e: MapMouseEvent & { features?: Feature[] }) => {
			if (!e.features || e.features.length === 0) return;

			const feature = e.features[0];

			setSelectedFeature({
				properties: feature.properties ?? {},
				geometry: feature.geometry,
			});

			// Get region name
			const name =
				feature.properties?.NAME_1 ||
				feature.properties?.NAME_0 ||
				'Unknown Region';

			// Create popup HTML
			const popupHTML = `
				<div style="padding: 8px; min-width: 150px;">
					<h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">
						${name}
					</h3>
					<p style="margin: 0; font-size: 12px; color: #666;">
						Level ${level}
					</p>
				</div>
			`;

			newPopup.setLngLat(e.lngLat).setHTML(popupHTML).addTo(map);
		};

		map.on('click', layerId, handleClick);

		return () => {
			map.off('click', layerId, handleClick);
			if (newPopup) {
				newPopup.remove();
			}
		};
	}, [map, level]);

	const closePopup = () => {
		if (popup) {
			popup.remove();
		}
		setSelectedFeature(null);
	};

	return {
		selectedFeature,
		closePopup,
	};
}
