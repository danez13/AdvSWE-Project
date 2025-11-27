'use client';

import { useMap } from '@/hooks/map/useMap';
import { useWeatherLayer, WeatherLayerType } from '@/hooks/map/useWeather';
import { useRegionLayer } from '@/hooks/map/useRegionLayer';
import { useRegionOverlay } from '@/hooks/map/useRegionOverlay';

import LegendControl from './controls/legend-control';
import WeatherLayersControl from './controls/weather-layers';
import RegionLevelControl from './controls/region-level';
import TimeScrubberControl from './controls/time-scrubber';

interface WeatherMapProps {
	activeWeatherLayer: WeatherLayerType | null;
	level: number;
}

export default function WeatherMap({
	activeWeatherLayer,
	level,
}: WeatherMapProps) {
	const { map, mapContainer } = useMap();

	// Region overlay layers
	useRegionLayer({
		map,
		geojsonUrl: `/data/gadm41_USA_${level}.json`,
		level,
	});
	useRegionOverlay({ map, level });

	// Weather layer hook
	useWeatherLayer({ map, activeLayer: activeWeatherLayer });

	return (
		<div className="relative w-full h-full">
			<div ref={mapContainer} className="w-full h-full" />
		</div>
	);
}

// Attach controls as static properties
WeatherMap.Controls = {
	WeatherLayers: WeatherLayersControl,
	RegionLevel: RegionLevelControl,
	TimeScrubber: TimeScrubberControl,
	Legend: LegendControl,
};
