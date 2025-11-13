import { useEffect, useState } from 'react';
import Overlay from 'ol/Overlay';
import { Style, Fill, Stroke } from 'ol/style';
import type Map from 'ol/Map';
import type Feature from 'ol/Feature';
import type VectorLayer from 'ol/layer/Vector';
import type VectorSource from 'ol/source/Vector';

interface UseRegionOverlayOptions {
	map: Map | null;
	regionLayer: VectorLayer<VectorSource> | null;
	overlayElement: HTMLElement | null;
}

export function useRegionOverlay({
	map,
	regionLayer,
	overlayElement,
}: UseRegionOverlayOptions) {
	const [selectedFeature, setSelectedFeature] = useState<Feature | null>(
		null
	);

	useEffect(() => {
		if (!map || !overlayElement) return;

		// Create overlay
		const overlay = new Overlay({
			element: overlayElement,
			autoPan: true,
		});
		map.addOverlay(overlay);

		const highlightStyle = new Style({
			stroke: new Stroke({ color: '#1e40af', width: 2 }),
			fill: new Fill({ color: 'rgba(37,99,235,0.35)' }),
		});

		const handleClick = (evt: any) => {
			const raw = map.forEachFeatureAtPixel(evt.pixel, (f, layer) => {
				if (layer === regionLayer) return f;
			});

			// Narrow FeatureLike to ol/Feature only if it provides setStyle
			const feature =
				raw && typeof (raw as any).setStyle === 'function'
					? (raw as unknown as Feature)
					: null;

			// remove highlight from previously selected
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
	}, [map, regionLayer, overlayElement]);

	// helper to close popup manually
	const closeOverlay = () => {
		if (selectedFeature) selectedFeature.setStyle(undefined);
		setSelectedFeature(null);
	};

	return {
		selectedFeature,
		closeOverlay,
	};
}
