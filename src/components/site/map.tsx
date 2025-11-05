'use client';

import { useMap } from '@/hooks/map/useMap';

export default function OLMap() {
	const { map, mapRef } = useMap();

	return (
		<div className="relative w-full h-screen rounded-2xl shadow-md">
			{/* Map */}
			<div ref={mapRef} className="absolute inset-0" />
		</div>
	);
}
