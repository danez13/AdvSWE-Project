import dynamic from 'next/dynamic';
import { Sidebar } from '@/components/site/sidebar';
const OLMap = dynamic(() => import('@/components/site/map'), { ssr: true });

export default function MapPage() {
	return (
		<div className="flex max-h-screen">
			<div className="hidden lg:block">
				<Sidebar />
			</div>
			<div className="flex-1">
				<OLMap />
			</div>
		</div>
	);
}
