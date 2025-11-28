'use client';

interface Props {
	activeWeatherLayer: string | null;
	regionLoading?: boolean;
}

export default function LegendControl({
	activeWeatherLayer,
	regionLoading,
}: Props) {
	return (
		<div className="space-y-2">
			<h3 className="text-sm font-semibold text-gray-700">Legend</h3>
			{regionLoading ? (
				<p>Loading...</p>
			) : activeWeatherLayer ? (
				<p>Showing legend for: {activeWeatherLayer}</p>
			) : (
				<p>No weather layer selected</p>
			)}
		</div>
	);
}
