// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || !locals.session) {
		throw redirect(303, '/login');
	}

	return {
		user: locals.user
	};
};
