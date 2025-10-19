import { QueryClient } from '@tanstack/react-query';

export interface AuthData {
	token: string;
	email?: string;
	name?: string;
}

export const queryClient = new QueryClient();

export const fetchConfig = {
	baseUrl: 'http://localhost:8080/',
};

export function buildUrl(
	base: string,
	params: Record<string, string | number | boolean | undefined | null>
) {
	const baseUrl = fetchConfig.baseUrl;
	const url = new URL(baseUrl + base);
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.set(key, String(value));
		}
	});
	return url.toString().split(baseUrl)[1];
}

export const makeFetchRequest = async (
	endpoint: string,
	fetchOptions: RequestInit = {},
	options: { shouldThrow?: boolean; raw?: boolean } = {
		shouldThrow: true,
		raw: false,
	}
) => {
	const url = fetchConfig.baseUrl + endpoint;

	// Build headers robustly
	const headers = new Headers(
		fetchOptions.headers as HeadersInit | undefined
	);
	if (!headers.has('Content-Type'))
		headers.set('Content-Type', 'application/json');

	// Auth
	const token = JSON.parse(
		localStorage.getItem('authData') || '{}'
	) as AuthData;
	if (token?.token) headers.set('Authorization', `Bearer ${token.token}`);

	const config: RequestInit = {
		...fetchOptions,
		credentials: 'include',
		headers,
	};

	try {
		const response = await fetch(url, config);
		console.log(
			`[fetch] ${endpoint} -> ${response.status} ${response.statusText};`
		);

		if (!response.ok && options.shouldThrow) {
			throw new Error('HTTP error! Status: ' + response.status);
		}
		if (options.raw) return response;

		const data = await response.json();

		return data;
	} catch (error) {
		console.error('[fetch] Error:', error);
		throw error;
	}
};
