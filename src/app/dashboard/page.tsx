'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/site/sidebar';
import { useMe } from '@/hooks/useUsers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
	const { data, isLoading } = useMe();
	const router = useRouter();
	const user = data?.user;

	if (isLoading) {
		return (
			<main className="grid min-h-screen place-items-center">
				<div className="text-sm text-muted-foreground">Loading…</div>
			</main>
		);
	}

	if (!user) {
		return (
			<main className="min-h-screen">
				<section className="mx-auto max-w-6xl px-4 pt-16 pb-12">
					<div className="flex flex-col items-center text-center">
						<Badge variant="secondary">
							CEN5011 · Advanced Software Engineering
						</Badge>
						<h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
							Miami Heat Vulnerability Index Dashboard
						</h1>
						<p className="mt-4 max-w-2xl text-balance text-muted-foreground">
							Interactive, neighborhood-level heat risk combining
							temperature, vegetation, and social vulnerability
							into one score.
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
							<StatItem
								label="Estimated excess deaths"
								value="600/yr"
							/>
							<StatItem
								label="Live weather overlays"
								value="Yes"
							/>
							<StatItem
								label="Region comparisons"
								value="Side-by-side"
							/>
							<StatItem label="Exportable" value="CSV/PDF" />
						</div>
					</div>
				</section>
				<footer className="border-t py-8 text-center text-sm text-muted-foreground">
					Miami Heat Vulnerability Index · Open source · FIU Knight
					Foundation School of Computing and Information Sciences
				</footer>
			</main>
		);
	}

	return (
		<div className="flex min-h-screen">
			<div className="hidden lg:block">
				<Sidebar />
			</div>
			<div className="flex w-full flex-col">
				<header className="flex items-center justify-between border-b px-4 py-3">
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">
							Signed in as
						</span>
						<Badge variant="outline">{user.email}</Badge>
						{user.isAdmin && <Badge>Admin</Badge>}
					</div>
					<div className="lg:hidden">
						<Button
							variant="outline"
							onClick={() => router.push('/dashboard')}
						>
							Menu
						</Button>
					</div>
				</header>
				<main className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle>Profile</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2 text-sm">
							<div className="flex items-center justify-between">
								<span>Name</span>
								<span className="text-muted-foreground">
									{user.name || '—'}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Email</span>
								<span className="text-muted-foreground">
									{user.email}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Role</span>
								<span className="text-muted-foreground">
									{user.isAdmin ? 'Admin' : 'User'}
								</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Quick links</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-2">
							<Link href="/map" legacyBehavior>
								<Button
									variant="secondary"
									className="justify-start"
								>
									Open map
								</Button>
							</Link>
							<Link href="/alerts" legacyBehavior>
								<Button
									variant="secondary"
									className="justify-start"
								>
									Manage alerts
								</Button>
							</Link>
							<Link href="/settings" legacyBehavior>
								<Button
									variant="secondary"
									className="justify-start"
								>
									Settings
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="lg:col-span-1 md:col-span-2">
						<CardHeader>
							<CardTitle>Todo</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
								<li>Add your neighborhood to favorites</li>
								<li>Set up heat alert thresholds</li>
								<li>Export last week’s report</li>
							</ul>
						</CardContent>
					</Card>
				</main>
				<footer className="border-t py-4 text-center text-xs text-muted-foreground">
					Miami HVI · © {new Date().getFullYear()}
				</footer>
			</div>
		</div>
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
