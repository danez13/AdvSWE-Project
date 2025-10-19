import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { buildUrl, makeFetchRequest } from './fetchConfig';

export type User = {
	id: string;
	email: string;
	name: string;
	isAdmin: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
};

export type RegisterRequest = { email: string; password: string };
export type LoginRequest = { email: string; password: string };

type AuthResponse = { message?: string; user: User; token: string };
type UserResponse = { user: User };
type UsersResponse = { users: User[] };

const qk = {
	me: ['users', 'me'] as const,
	byId: (id: string) => ['users', 'id', id] as const,
	byEmail: (email: string) => ['users', 'email', email] as const,
	all: ['users', 'all'] as const,
};

const setAuthData = (r: AuthResponse) => {
	const payload = { token: r.token, email: r.user.email, name: r.user.name };
	if (typeof window !== 'undefined')
		localStorage.setItem('authData', JSON.stringify(payload));
};

const clearAuthData = () => {
	if (typeof window !== 'undefined') localStorage.removeItem('authData');
};

export const useRegisterUser = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (body: RegisterRequest) =>
			makeFetchRequest('users/register', {
				method: 'POST',
				body: JSON.stringify(body),
			}) as Promise<AuthResponse>,
		onSuccess: (data) => {
			setAuthData(data);
			qc.setQueryData(qk.me, { user: data.user } as UserResponse);
			qc.invalidateQueries({ queryKey: qk.all });
		},
	});
};

export const useLoginUser = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (body: LoginRequest) =>
			makeFetchRequest('users/login', {
				method: 'POST',
				body: JSON.stringify(body),
			}) as Promise<AuthResponse>,
		onSuccess: (data) => {
			setAuthData(data);
			qc.setQueryData(qk.me, { user: data.user } as UserResponse);
			qc.invalidateQueries({ queryKey: qk.all });
		},
	});
};

export const useLogout = () => {
	const qc = useQueryClient();
	return () => {
		clearAuthData();
		qc.removeQueries({ queryKey: qk.me });
	};
};

export const useMe = (enabled = true) =>
	useQuery({
		queryKey: qk.me,
		queryFn: () =>
			makeFetchRequest('users/me', {
				method: 'GET',
			}) as Promise<UserResponse>,
		enabled,
		staleTime: 60_000,
	});

export const useUserById = (id: string | undefined, enabled = true) =>
	useQuery({
		queryKey: id ? qk.byId(id) : ['users', 'id', 'nil'],
		queryFn: () =>
			makeFetchRequest(buildUrl('users/id', { id: id! }), {
				method: 'GET',
			}) as Promise<UserResponse>,
		enabled: !!id && enabled,
		staleTime: 60_000,
	});

export const useUserByEmail = (email: string | undefined, enabled = true) =>
	useQuery({
		queryKey: email ? qk.byEmail(email) : ['users', 'email', 'nil'],
		queryFn: () =>
			makeFetchRequest(buildUrl('users/email', { email: email! }), {
				method: 'GET',
			}) as Promise<UserResponse>,
		enabled: !!email && enabled,
		staleTime: 60_000,
	});

export const useAllUsers = (enabled = true) =>
	useQuery({
		queryKey: qk.all,
		queryFn: () =>
			makeFetchRequest('users/all', {
				method: 'GET',
			}) as Promise<UsersResponse>,
		enabled,
		staleTime: 30_000,
	});
