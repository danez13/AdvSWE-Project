import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Hero() {
	return (
		<section className="mx-auto max-w-6xl px-4 pt-16 pb-12">
			<div className="flex flex-col items-center text-center">
				<Badge variant="secondary">
					CEN5011 · Advance Software Engineering
				</Badge>
				<h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
					Miami Heat Vulnerability Index Dashboard
				</h1>
				<p className="mt-4 max-w-2xl text-balance text-muted-foreground">
					Interactive, neighborhood-level heat risk combining
					temperature, vegetation, and social vulnerability into one
					score.
				</p>
				<div className="mt-6 flex flex-col gap-3 sm:flex-row">
					<Link href="/signup" legacyBehavior>
						<Button size="lg">Create account</Button>
					</Link>
					<Link href="/login" legacyBehavior>
						<Button variant="secondary" size="lg">
							Log in
						</Button>
					</Link>
				</div>
				<Separator className="mt-10" />
				<div className="mt-6 grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
					<StatItem label="Estimated excess deaths" value="600/yr" />
					<StatItem label="Live weather overlays" value="Yes" />
					<StatItem label="Region comparisons" value="Side-by-side" />
					<StatItem label="Exportable" value="CSV/PDF" />
				</div>
			</div>
		</section>
	);
}

function StatItem({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg border p-4">
			<div className="text-2xl font-semibold">{value}</div>
			<div className="text-sm text-muted-foreground">{label}</div>
		</div>
	);
}
