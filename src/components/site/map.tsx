'use client';

import { useRef, useState } from 'react';
import { useMap } from '@/hooks/map/useMap';
import { useRegionLayer } from '@/hooks/map/useRegionLayer';
import { useRegionOverlay } from '@/hooks/map/useRegionOverlay';
import { Button } from '@/components/ui/button';
import 'ol/ol.css';

export default function OLMap() {
	const [level, setLevel] = useState(1);
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const { map, mapRef } = useMap();
	const regionLayer = useRegionLayer(map, level);

	const { selectedFeature, closeOverlay } = useRegionOverlay({
		map,
		regionLayer,
		overlayElement: overlayRef.current,
	});

	const featureProps = selectedFeature?.getProperties?.() || {};

	return (
		<div className="relative w-full h-screen rounded-2xl shadow-md">
			{/* Map container */}
			<div ref={mapRef} className="absolute inset-0" />

			{/* Overlay popup */}
			<div
				ref={overlayRef}
				className={`absolute z-10 bg-white p-3 rounded-xl shadow-lg border transition-opacity ${
					selectedFeature
						? 'opacity-100'
						: 'opacity-0 pointer-events-none'
				}`}
			>
				{selectedFeature && (
					<div>
						<h3 className="font-bold mb-1">
							{featureProps.NAME_1 ||
								featureProps.NAME_0 ||
								'United States Of America'}
						</h3>
						<p className="text-sm text-gray-600">Level {level}</p>
						<Button
							size="sm"
							className="mt-2"
							variant="secondary"
							onClick={closeOverlay}
						>
							Close
						</Button>
					</div>
				)}
			</div>

			{/* Level controls */}
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
