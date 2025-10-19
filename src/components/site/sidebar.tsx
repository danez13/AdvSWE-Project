'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Map, Bell, Settings, LogOut } from 'lucide-react';

const navItems = [
	{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
	{ href: '/map', label: 'Map', icon: Map },
	{ href: '/alerts', label: 'Alerts', icon: Bell },
	{ href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ onLogout }: { onLogout?: () => void }) {
	const pathname = usePathname();
	return (
		<aside className="flex h-full w-full flex-col gap-2 border-r p-3 lg:w-64">
			<div className="px-2 py-1 text-sm font-semibold">Miami HVI</div>
			<nav className="flex flex-1 flex-col gap-1">
				{navItems.map((item) => {
					const ActiveIcon = item.icon;
					const active = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent',
								active && 'bg-accent'
							)}
							legacyBehavior
						>
							<ActiveIcon className="h-4 w-4" />
							<span>{item.label}</span>
						</Link>
					);
				})}
				<div className="mt-auto" />
				<Button
					variant="ghost"
					className="justify-start gap-2 px-3"
					onClick={onLogout}
				>
					<LogOut className="h-4 w-4" />
					Logout
				</Button>
			</nav>
		</aside>
	);
}
