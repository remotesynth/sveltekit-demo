import { APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, APPWRITE_CFP_ID } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { databases } from '$lib/server/AppWrite.js';

export async function load({ params }) {
	await databases.updateDocument(APPWRITE_DB_ID, APPWRITE_CFP_ID, params.id, { Accepted: true });
	throw redirect(302, '/sessions/' + params.session);
}
