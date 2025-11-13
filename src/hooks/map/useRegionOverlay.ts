import { useEffect, useState } from 'react';
import Overlay from 'ol/Overlay';
import Map from 'ol/Map';
import { Style, Fill, Stroke } from 'ol/style';
import type Feature from 'ol/Feature';
import type Geometry from 'ol/geom/Geometry';
import type VectorLayer from 'ol/layer/Vector';
import type VectorSource from 'ol/source/Vector';
import type MapBrowserEvent from 'ol/MapBrowserEvent';

export interface UseRegionOverlayOptions {
	map: Map | null;
	regionLayer: VectorLayer<VectorSource<Feature<Geometry>>> | null;
	overlayElement: HTMLElement | null;
}

export function useRegionOverlay({
	map,
	regionLayer,
	overlayElement,
}: UseRegionOverlayOptions) {
	const [selectedFeature, setSelectedFeature] =
		useState<Feature<Geometry> | null>(null);

	useEffect(() => {
		if (!map || !overlayElement) return;

		// Create overlay
		const overlay = new Overlay({
			element: overlayElement,
			autoPan: { animation: { duration: 250 } },
		});
		map.addOverlay(overlay);

		// Highlight style
		const highlightStyle = new Style({
			stroke: new Stroke({ color: '#1e40af', width: 2 }),
			fill: new Fill({ color: 'rgba(37,99,235,0.35)' }),
		});

		// Click handler
		const handleClick = (evt: MapBrowserEvent<UIEvent>) => {
			const feature = map.forEachFeatureAtPixel(evt.pixel, (f, layer) => {
				if (layer === regionLayer) return f as Feature<Geometry>;
				return undefined;
			});

			// Reset previous highlight
			if (selectedFeature) {
				selectedFeature.setStyle(undefined);
			}

			if (feature) {
				feature.setStyle(highlightStyle);
				setSelectedFeature(feature);
				overlay.setPosition(evt.coordinate);
			} else {
				setSelectedFeature(null);
				overlay.setPosition(undefined);
			}
		};

		map.on('click', handleClick);

		return () => {
			map.un('click', handleClick);
			map.removeOverlay(overlay);
		};
	}, [map, regionLayer, overlayElement]); // ✅ removed selectedFeature dependency

	const closeOverlay = () => {
		if (selectedFeature) selectedFeature.setStyle(undefined);
		setSelectedFeature(null);
	};

	return { selectedFeature, closeOverlay };
}
