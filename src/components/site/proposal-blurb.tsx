import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProposalBlurb() {
	return (
		<section id="use-cases" className="mx-auto max-w-6xl px-4 pb-16">
			<Card>
				<CardHeader>
					<CardTitle>Purpose</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>
						Extreme heat is rising in Miami due to urban heat
						islands and limited greenery. Vulnerable communities
						face greater risk, yet the relevant data is fragmented.
					</p>
					<p>
						This dashboard integrates environment, demographics, and
						health indicators to surface neighborhood-level risk and
						support planning for cooling centers, tree planting, and
						outreach.
					</p>
				</CardContent>
			</Card>
		</section>
	);
}
