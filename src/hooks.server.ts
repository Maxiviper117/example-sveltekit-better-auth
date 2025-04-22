import { auth } from '$lib/server/auth-server'; // path to your auth file
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { json, redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const fetchedSession = await auth.api.getSession({
		headers: event.request.headers
	});

	if (fetchedSession) {
		const { user, session } = fetchedSession;
		event.locals.session = session;
		event.locals.user = user;
	} else {
		delete event.locals.session;
		delete event.locals.user;
	}

	// Global protection for admin routes
	if (event.url.pathname.startsWith('/admin/')) {
		if (!event.locals.user || !event.locals.session) {
			redirect(303, '/login');
			// return json(
			// 	{ error: 'Unauthorized' },
			// 	{
			// 		status: 401
			// 	}
			// );
		}
	}

	return svelteKitHandler({ event, resolve, auth });
};
