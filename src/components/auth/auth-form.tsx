'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginUser, useRegisterUser } from '@/hooks/useUsers';

type Mode = 'login' | 'signup';

export function AuthForm({ mode = 'login' }: { mode?: Mode }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const router = useRouter();

	const login = useLoginUser();
	const register = useRegisterUser();

	const isLoading = false;
	const errorMsg = useMemo(() => {
		const err = (login.error || register.error) as Error | undefined;
		return err?.message ?? '';
	}, [login.error, register.error]);

	const onSubmit = async (e: React.FormEvent) => {
		console.log('Submitting form');
		e.preventDefault();
		if (mode === 'login') {
			const res = await login
				.mutateAsync({ email, password })
				.catch(() => null);
			if (res) router.push('/dashboard');
			return;
		}
		const res = await register
			.mutateAsync({ email, password })
			.catch(() => null);
		if (res) router.push('/dashboard');
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>
					{mode === 'login' ? 'Log in' : 'Create account'}
				</CardTitle>
				<CardDescription>
					{mode === 'login'
						? 'Access your dashboard'
						: 'Start tracking heat vulnerability in your area'}
				</CardDescription>
			</CardHeader>
			<form onSubmit={onSubmit}>
				<CardContent className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							required
							autoComplete="email"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
							autoComplete={
								mode === 'login'
									? 'current-password'
									: 'new-password'
							}
						/>
					</div>
					{mode === 'signup' && (
						<div className="grid gap-2">
							<Label htmlFor="name">Full name</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Your name"
							/>
						</div>
					)}
					{errorMsg && (
						<p className="text-sm text-red-600">{errorMsg}</p>
					)}
					<Button
						className={`w-full ${isLoading ? 'cursor-not-allowed' : 'border border-black'}`}
						type="submit"
						disabled={isLoading}
					>
						{isLoading
							? mode === 'login'
								? 'Logging in…'
								: 'Creating…'
							: mode === 'login'
								? 'Log in'
								: 'Sign up'}
					</Button>
				</CardContent>
			</form>
			<CardFooter className="flex w-full items-center justify-between text-sm">
				{mode === 'login' ? (
					<>
						<Link
							href="/signup"
							className="text-muted-foreground underline"
						>
							Create account
						</Link>
						<Link
							href="#"
							className="text-muted-foreground underline"
						>
							Forgot password
						</Link>
					</>
				) : (
					<Link
						href="/login"
						className="text-muted-foreground underline"
					>
						Already have an account? Log in
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}
