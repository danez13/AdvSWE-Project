'use client';

import { Button } from '@/components/ui/button';
import { WeatherLayerType } from '@/hooks/map/useWeather';

interface Props {
	activeWeatherLayer: WeatherLayerType | null;
	setActiveWeatherLayer: (layer: WeatherLayerType | null) => void;
}

export default function WeatherLayersControl({
	activeWeatherLayer,
	setActiveWeatherLayer,
}: Props) {
	const LAYERS = [
		{ type: 'temperature', icon: '🌡️', label: 'Temperature' },
		{ type: 'wind', icon: '💨', label: 'Wind' },
		{ type: 'precipitation', icon: '💧', label: 'Precipitation' },
	] as const;

	const handleToggle = (type: WeatherLayerType) => {
		setActiveWeatherLayer(activeWeatherLayer === type ? null : type);
	};

	return (
		<div className="space-y-2">
			<h3 className="text-sm font-semibold text-gray-700">
				Weather Layers
			</h3>
			<div className="space-y-2">
				{LAYERS.map((l) => (
					<Button
						key={l.type}
						variant={
							activeWeatherLayer === l.type
								? 'default'
								: 'outline'
						}
						size="sm"
						className="w-full justify-start"
						onClick={() => handleToggle(l.type)}
					>
						<span className="mr-2">{l.icon}</span>
						{l.label}
					</Button>
				))}
			</div>
		</div>
	);
}
