import { Navbar } from '@/components/site/navbar';
import { Hero } from '@/components/site/hero';
import { FeatureCards } from '@/components/site/feature-cards';
import { ProposalBlurb } from '@/components/site/proposal-blurb';

export default function Page() {
	return (
		<>
			<Navbar />
			<main className="min-h-screen">
				<Hero />
				<FeatureCards />
				<ProposalBlurb />
				<footer className="border-t py-8 text-center text-sm text-muted-foreground">
					Miami Heat Vulnerability Index · Open source · FIU Knight
					Foundation School of Computing and Information Sciences
				</footer>
			</main>
		</>
	);
}
