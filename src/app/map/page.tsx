'use client';

import { useState } from 'react';
import WeatherMap from '@/components/site/map/map';
import { Menu, X } from 'lucide-react';
import { Sidebar } from '@/components/site/sidebar';
import { WeatherLayerType } from '@/hooks/map/useWeather';

export default function MapPage() {
	// Weather layer state
	const [activeWeatherLayer, setActiveWeatherLayer] =
		useState<WeatherLayerType | null>(null);

	// Region level state
	const [level, setLevel] = useState(1);

	// Sidebar open/close
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<div className="flex h-screen w-full">
			{/* Static sidebar for large screens */}
			<div className="hidden lg:block">
				<Sidebar />
			</div>

			{/* Map container */}
			<div className="relative w-full h-full overflow-hidden">
				{/* Toggle sidebar button */}
				<button
					className={`absolute top-40 right-3 p-2 z-30 bg-white shadow-md rounded-lg transition-opacity 
            ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
					onClick={() => setSidebarOpen(true)}
				>
					<Menu size={15} />
				</button>

				{/* Sidebar drawer */}
				<div
					className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-40
            transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
				>
					<div className="flex items-center justify-between p-4 border-b">
						<h2 className="text-lg font-semibold">Map Controls</h2>
						<button
							className="p-2 hover:bg-gray-100 rounded-md"
							onClick={() => setSidebarOpen(false)}
						>
							<X size={18} />
						</button>
					</div>

					<div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-56px)]">
						{/* Weather layer toggle */}
						<WeatherMap.Controls.WeatherLayers
							activeWeatherLayer={activeWeatherLayer}
							setActiveWeatherLayer={setActiveWeatherLayer}
						/>

						{/* Region level selector */}
						<WeatherMap.Controls.RegionLevel
							value={level}
							onChange={(lvl) => setLevel(lvl)}
						/>

						{/* Time slider */}
						<WeatherMap.Controls.TimeScrubber
							activeLayer={activeWeatherLayer}
						/>
					</div>
				</div>

				{/* Map itself */}
				<WeatherMap
					activeWeatherLayer={activeWeatherLayer}
					level={level}
				/>
			</div>
		</div>
	);
}
