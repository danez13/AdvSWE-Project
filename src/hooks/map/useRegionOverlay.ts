import { useEffect, useRef, useState } from 'react';
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

	// ✅ keep mutable ref to avoid ESLint warnings and stale closures
	const selectedFeatureRef = useRef<Feature<Geometry> | null>(null);

	useEffect(() => {
		if (!map || !overlayElement) return;

		const overlay = new Overlay({
			element: overlayElement,
			autoPan: { animation: { duration: 250 } },
		});
		map.addOverlay(overlay);

		const highlightStyle = new Style({
			stroke: new Stroke({ color: '#1e40af', width: 2 }),
			fill: new Fill({ color: 'rgba(37,99,235,0.35)' }),
		});

		const handleClick = (evt: unknown) => {
			const mapEvent = evt as MapBrowserEvent<PointerEvent>;
			const feature = map.forEachFeatureAtPixel(
				mapEvent.pixel,
				(f, layer) => {
					if (layer === regionLayer) return f as Feature<Geometry>;
					return undefined;
				}
			);

			// Reset previous highlight
			if (selectedFeatureRef.current) {
				selectedFeatureRef.current.setStyle(undefined);
			}

			if (feature) {
				feature.setStyle(highlightStyle);
				selectedFeatureRef.current = feature;
				setSelectedFeature(feature);
				overlay.setPosition(mapEvent.coordinate);
			} else {
				selectedFeatureRef.current = null;
				setSelectedFeature(null);
				overlay.setPosition(undefined);
			}
		};

		map.on(['click'], handleClick);

		return () => {
			map.un(['click'], handleClick);
			map.removeOverlay(overlay);
		};
	}, [map, regionLayer, overlayElement]);

	const closeOverlay = () => {
		if (selectedFeatureRef.current) {
			selectedFeatureRef.current.setStyle(undefined);
			selectedFeatureRef.current = null;
		}
		setSelectedFeature(null);
	};

	return { selectedFeature, closeOverlay };
}
