import sdk from 'node-appwrite';
import { APPWRITE_DB_ID, APPWRITE_SESSIONS_ID } from '$env/static/private';
import { databases } from '$lib/server/AppWrite.js';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	const id = url.searchParams.get('sessionID');
	if (id) {
		const session = await databases.listDocuments(APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, [
			sdk.Query.equal('$id', id)
		]);
		return {
			session: session.documents[0]
		};
	} else {
		throw redirect(307, '/');
	}
}
