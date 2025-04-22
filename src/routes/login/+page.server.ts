import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth-server';
import { setCookiesFromHeader } from '$lib/server/utils/set-cookie';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// Handle form submission logic here
		// Example: parse form data
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Validate the form data
		if (!email || !password) {
			return fail(400, { error: 'All fields are required' });
		}

		const response = await auth.api.signInEmail({
			body: {
				email,
				password
			},
			asResponse: true
		});

		if (!response.ok) {
			const errorData = await response.json();
			return fail(response.status, { error: errorData?.message || 'Failed to sign in' });
		}

		// Set cookies from the response
		const setCookie = response.headers.get('set-cookie');
		setCookiesFromHeader(setCookie, cookies);

		throw redirect(303, '/dashboard'); // Redirect to the dashboard after successful login
	}
};
