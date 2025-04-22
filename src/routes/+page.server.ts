import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.user || locals.session) {
		return {
			user: locals.user
		};
	}
	return {};
}) satisfies PageServerLoad;
