// hooks/map/useWeatherLayer.ts
'use client';

import { useEffect, useRef, useState } from 'react';
import { Map } from '@maptiler/sdk';
import {
	TemperatureLayer,
	WindLayer,
	PrecipitationLayer,
	ColorRamp,
} from '@maptiler/weather';

export type WeatherLayerType = 'temperature' | 'wind' | 'precipitation';

type WeatherLayer = TemperatureLayer | WindLayer | PrecipitationLayer;

interface UseWeatherLayerProps {
	map: Map | null;
	activeLayer: WeatherLayerType | null;
}

interface WeatherLayerInfo {
	layer: WeatherLayer;
	startDate: Date | null;
	endDate: Date | null;
	currentTime: number | null;
}

export function useWeatherLayer({ map, activeLayer }: UseWeatherLayerProps) {
	const weatherLayersRef = useRef<Record<string, WeatherLayerInfo>>({});
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTimeDate, setCurrentTimeDate] = useState<Date | null>(null);
	const [timeRange, setTimeRange] = useState<{
		min: number;
		max: number;
	} | null>(null);
	const [pointerValue, setPointerValue] = useState<string>('');

	// Create weather layer
	const createWeatherLayer = (type: WeatherLayerType): WeatherLayer => {
		let weatherLayer: WeatherLayer;

		switch (type) {
			case 'temperature':
				weatherLayer = new TemperatureLayer({
					id: type,
					opacity: 0.6,
					colorramp: ColorRamp.builtin.TEMPERATURE_3,
				});
				break;
			case 'wind':
				weatherLayer = new WindLayer({
					id: type,
					opacity: 0.6,
				});
				break;
			case 'precipitation':
				weatherLayer = new PrecipitationLayer({
					id: type,
					opacity: 0.6,
				});
				break;
		}

		// Handle animation tick
		weatherLayer.on('tick', () => {
			const date = weatherLayer.getAnimationTimeDate();
			setCurrentTimeDate(date);
		});

		// Handle time set
		weatherLayer.on('animationTimeSet', () => {
			const date = weatherLayer.getAnimationTimeDate();
			setCurrentTimeDate(date);
		});

		// Handle source ready
		weatherLayer.on('sourceReady', () => {
			const startDate = weatherLayer.getAnimationStartDate();
			const endDate = weatherLayer.getAnimationEndDate();
			const currentDate = weatherLayer.getAnimationTimeDate();

			setTimeRange({
				min: +startDate,
				max: +endDate,
			});
			setCurrentTimeDate(currentDate);

			weatherLayersRef.current[type] = {
				layer: weatherLayer,
				startDate,
				endDate,
				currentTime: weatherLayer.getAnimationTime(),
			};
		});

		return weatherLayer;
	};

	// Manage active layer
	useEffect(() => {
		if (!map) {
			console.log('Weather layer: waiting for map...');
			return;
		}

		console.log('Weather layer effect running, active layer:', activeLayer);

		// Hide all layers
		Object.keys(weatherLayersRef.current).forEach((key) => {
			try {
				if (map.getLayer(key)) {
					map.setLayoutProperty(key, 'visibility', 'none');
					console.log(`Hid layer: ${key}`);
				}
			} catch (error) {
				console.error(`Error hiding layer ${key}:`, error);
			}
		});

		// Stop any playing animation
		if (isPlaying) {
			setIsPlaying(false);
		}

		// If no layer selected, return
		if (!activeLayer) {
			console.log('No active layer selected');
			setCurrentTimeDate(null);
			setTimeRange(null);
			return;
		}

		console.log(`Attempting to show ${activeLayer} layer...`);

		// Create layer if it doesn't exist
		if (!weatherLayersRef.current[activeLayer]) {
			console.log(`Creating new ${activeLayer} layer...`);
			try {
				const weatherLayer = createWeatherLayer(activeLayer);
				console.log('Weather layer created:', weatherLayer);

				// Add to map
				map.addLayer(weatherLayer);
				console.log(`${activeLayer} layer added to map`);
			} catch (error) {
				console.error(`Error creating ${activeLayer} layer:`, error);
			}
		} else {
			console.log(`${activeLayer} layer already exists, showing it...`);
			// Show existing layer
			try {
				map.setLayoutProperty(activeLayer, 'visibility', 'visible');
				const layerInfo = weatherLayersRef.current[activeLayer];
				if (layerInfo.currentTime !== null) {
					layerInfo.layer.setAnimationTime(layerInfo.currentTime);
				}
				setCurrentTimeDate(layerInfo.layer.getAnimationTimeDate());
				if (layerInfo.startDate && layerInfo.endDate) {
					setTimeRange({
						min: +layerInfo.startDate,
						max: +layerInfo.endDate,
					});
				}
			} catch (error) {
				console.error(`Error showing ${activeLayer} layer:`, error);
			}
		}
	}, [map, activeLayer, isPlaying]);

	// Play/pause animation
	const togglePlayPause = () => {
		if (!activeLayer || !weatherLayersRef.current[activeLayer]) return;

		const layer = weatherLayersRef.current[activeLayer].layer;
		if (isPlaying) {
			layer.animateByFactor(0);
			setIsPlaying(false);
		} else {
			layer.animateByFactor(3600);
			setIsPlaying(true);
		}
	};

	// Set animation time
	const setAnimationTime = (timeInSeconds: number) => {
		if (!activeLayer || !weatherLayersRef.current[activeLayer]) return;

		const layer = weatherLayersRef.current[activeLayer].layer;
		layer.setAnimationTime(timeInSeconds);

		// Update stored time
		weatherLayersRef.current[activeLayer].currentTime = timeInSeconds;
	};

	// Pick value at coordinates
	const pickValueAt = (lng: number, lat: number) => {
		if (!activeLayer || !weatherLayersRef.current[activeLayer]) {
			setPointerValue('');
			return;
		}

		const layer = weatherLayersRef.current[activeLayer].layer;
		const value = layer.pickAt(lng, lat);

		if (!value) {
			setPointerValue('');
			return;
		}

		// Format value based on layer type
		let formattedValue = '';
		switch (activeLayer) {
			case 'temperature':
				formattedValue = `${(value as { value: number }).value.toFixed(1)}°C`;
				break;
			case 'wind':
				formattedValue = `${(value as { speedMetersPerSecond: number }).speedMetersPerSecond.toFixed(1)} m/s`;
				break;
			case 'precipitation':
				formattedValue = `${(value as { value: number }).value.toFixed(1)} mm`;
				break;
		}
		setPointerValue(formattedValue);
	};

	return {
		isPlaying,
		currentTimeDate,
		timeRange,
		pointerValue,
		togglePlayPause,
		setAnimationTime,
		pickValueAt,
	};
}
