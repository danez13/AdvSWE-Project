'use client';

import { Button } from '@/components/ui/button';

interface Props {
	value: number;
	onChange: (lvl: number) => void;
}

export default function RegionLevelControl({ value, onChange }: Props) {
	const levels = [0, 1, 2];

	return (
		<div className="space-y-2">
			<h3 className="text-sm font-semibold text-gray-700">
				Region Level
			</h3>
			<div className="flex space-x-2">
				{levels.map((lvl) => (
					<Button
						key={lvl}
						variant={value === lvl ? 'default' : 'outline'}
						size="sm"
						onClick={() => onChange(lvl)}
					>
						Level {lvl}
					</Button>
				))}
			</div>
		</div>
	);
}
