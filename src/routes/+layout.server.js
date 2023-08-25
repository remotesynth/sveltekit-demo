import { redirect } from '@sveltejs/kit';

export async function load({ request, cookies }) {
	const path = new URL(request.url).pathname;
	if (path !== '/authenticate') {
		const userid = cookies.get('userid');
		if (!userid) {
			throw redirect(307, '/authenticate');
		}
	}
}
