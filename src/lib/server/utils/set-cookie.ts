// Utility to parse and set cookies from a set-cookie header

import type { Cookies } from '@sveltejs/kit';

export function setCookiesFromHeader(setCookieHeader: string | null, cookies: Cookies) {
	if (!setCookieHeader) return;

	// Support multiple cookies (split by comma, but beware commas in values)
	const cookieStrings = setCookieHeader.split(/,(?=[^;]+=[^;]+)/g);

	for (const cookieString of cookieStrings) {
		const [cookiePair, ...cookieAttributes] = cookieString.split(';');
		const [cookieName, cookieValue] = cookiePair.split('=');

		const options: Parameters<Cookies['set']>[2] = {
			path: '/',
			httpOnly: cookieString.includes('HttpOnly'),
			sameSite: cookieString.includes('SameSite=Lax') ? 'lax' : undefined,
			maxAge: (() => {
				const match = cookieString.match(/Max-Age=(\d+)/);
				return match ? Number(match[1]) : undefined;
			})()
		};

		cookies.set(cookieName.trim(), decodeURIComponent(cookieValue), options);
	}
}
