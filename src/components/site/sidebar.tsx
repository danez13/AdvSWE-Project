'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLogout } from '@/hooks/useUsers';

const navItems = [
	{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const logout = useLogout();

	const handleLogout = useCallback(() => {
		logout();
		router.push('/');
	}, [logout, router]);

	return (
		<aside className="sticky top-0 flex h-dvh w-full flex-col border-r bg-background/60 backdrop-blur lg:w-64">
			{/* Brand */}
			<div className="flex items-center gap-2 border-b px-4 py-3">
				<div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
					<span className="text-xs font-semibold">HVI</span>
				</div>
				<div className="leading-tight">
					<div className="text-sm font-semibold">Miami HVI</div>
					<div className="text-xs text-muted-foreground">
						Dashboard
					</div>
				</div>
			</div>

			{/* Nav */}
			<nav className="flex flex-1 flex-col gap-1 p-2">
				{navItems.map((item) => {
					const active = pathname === item.href;
					const Icon = item.icon;
					return (
						<Link
							key={item.href}
							href={item.href}
							aria-current={active ? 'page' : undefined}
							className={cn(
								'group flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors',
								'hover:bg-accent hover:text-accent-foreground',
								active && 'bg-accent text-accent-foreground'
							)}
						>
							<Icon className="h-4 w-4 shrink-0" />
							<span className="truncate">{item.label}</span>
						</Link>
					);
				})}

				<div className="mt-auto" />

				{/* Logout */}
				<Button
					variant="ghost"
					onClick={handleLogout}
					className="mb-2 justify-start gap-2 rounded-xl px-3 py-2 text-sm"
				>
					<LogOut className="h-4 w-4" />
					Logout
				</Button>
			</nav>
		</aside>
	);
}
