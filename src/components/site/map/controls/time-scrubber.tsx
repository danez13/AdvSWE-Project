'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { useWeatherLayer, WeatherLayerType } from '@/hooks/map/useWeather';
import { cn } from '@/lib/utils';

interface Props {
	activeLayer: WeatherLayerType | null;
}

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			'relative flex w-full touch-none select-none items-center',
			className
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
			<SliderPrimitive.Range className="absolute h-full bg-primary" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export default function TimeScrubberControl({ activeLayer }: Props) {
	const {
		currentTimeDate,
		timeRange,
		setAnimationTime,
		togglePlayPause,
		isPlaying,
	} = useWeatherLayer({ map: null, activeLayer });

	if (!activeLayer || !timeRange || !currentTimeDate) return null;

	return (
		<div className="space-y-2">
			<h3 className="text-sm font-semibold text-gray-700">
				Time Scrubber
			</h3>
			<div className="flex items-center space-x-2">
				<button
					className="p-1 rounded bg-gray-200 hover:bg-gray-300"
					onClick={togglePlayPause}
				>
					{isPlaying ? '⏸️' : '▶️'}
				</button>

				<Slider
					value={[currentTimeDate.getTime()]}
					min={timeRange.min}
					max={timeRange.max}
					step={1000}
					onValueChange={(val) => setAnimationTime(val[0])}
				/>
			</div>
		</div>
	);
}
