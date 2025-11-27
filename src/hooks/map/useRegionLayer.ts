// hooks/map/useRegionLayer.ts
'use client';

import { useEffect, useState } from 'react';
import { Map } from '@maptiler/sdk';

interface UseRegionLayerProps {
	map: Map | null;
	geojsonUrl: string;
	level: number;
}

export function useRegionLayer({
	map,
	geojsonUrl,
	level,
}: UseRegionLayerProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!map) return;

		const sourceId = `regions-source-${level}`;
		const layerId = `regions-layer-${level}`;
		const borderLayerId = `regions-border-${level}`;

		// Remove existing layers if they exist
		if (map.getLayer(borderLayerId)) {
			map.removeLayer(borderLayerId);
		}
		if (map.getLayer(layerId)) {
			map.removeLayer(layerId);
		}
		if (map.getSource(sourceId)) {
			map.removeSource(sourceId);
		}

		setIsLoading(true);
		setError(null);

		// Fetch and add the GeoJSON source
		fetch(geojsonUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`Failed to fetch GeoJSON: ${response.status}`
					);
				}
				return response.json();
			})
			.then((data) => {
				console.log(`Loading regions for level ${level}`, data);

				// Add source
				map.addSource(sourceId, {
					type: 'geojson',
					data: data,
				});

				// Add fill layer
				map.addLayer({
					id: layerId,
					type: 'fill',
					source: sourceId,
					paint: {
						'fill-color': '#088',
						'fill-opacity': [
							'case',
							['boolean', ['feature-state', 'hover'], false],
							0.3,
							0.1,
						],
					},
				});

				// Add border layer
				map.addLayer({
					id: borderLayerId,
					type: 'line',
					source: sourceId,
					paint: {
						'line-color': '#000',
						'line-width': 2,
					},
				});

				// Add hover effect
				let hoveredStateId: string | number | null = null;

				map.on('mousemove', layerId, (e) => {
					if (e.features && e.features.length > 0) {
						if (hoveredStateId !== null) {
							map.setFeatureState(
								{ source: sourceId, id: hoveredStateId },
								{ hover: false }
							);
						}
						hoveredStateId = e.features[0].id || null;
						if (hoveredStateId !== null) {
							map.setFeatureState(
								{ source: sourceId, id: hoveredStateId },
								{ hover: true }
							);
						}
					}
				});

				map.on('mouseleave', layerId, () => {
					if (hoveredStateId !== null) {
						map.setFeatureState(
							{ source: sourceId, id: hoveredStateId },
							{ hover: false }
						);
					}
					hoveredStateId = null;
				});

				// Change cursor on hover
				map.on('mouseenter', layerId, () => {
					map.getCanvas().style.cursor = 'pointer';
				});

				map.on('mouseleave', layerId, () => {
					map.getCanvas().style.cursor = '';
				});

				setIsLoading(false);
			})
			.catch((err) => {
				console.error('Error loading region data:', err);
				setError(err.message);
				setIsLoading(false);
			});

		return () => {
			// Cleanup
			if (map.getLayer(borderLayerId)) {
				map.removeLayer(borderLayerId);
			}
			if (map.getLayer(layerId)) {
				map.removeLayer(layerId);
			}
			if (map.getSource(sourceId)) {
				map.removeSource(sourceId);
			}
		};
	}, [map, geojsonUrl, level]);

	return { isLoading, error };
}
