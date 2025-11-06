'use client';

import { useState } from 'react';
import { useMap } from '@/hooks/map/useMap';
import { useRegionLayer } from '@/hooks/map/useRegionLayer';
import { Button } from '@/components/ui/button';
import 'ol/ol.css';

export default function OLMap() {
	const [level, setLevel] = useState(1);
	const { map, mapRef } = useMap();
	useRegionLayer(map, level);

	return (
		<div className="relative w-full h-screen rounded-2xl shadow-md">
			{/* Map */}
			<div ref={mapRef} className="absolute inset-0" />

			{/* Level Controls */}
			<div className="absolute top-4 left-4 bg-white/90 p-2 rounded-xl shadow-md flex gap-2">
				{[0, 1, 2].map((lvl) => (
					<Button
						key={lvl}
						onClick={() => setLevel(lvl)}
						variant={level === lvl ? 'default' : 'outline'}
					>
						Level {lvl}
					</Button>
				))}
			</div>
		</div>
	);
}
