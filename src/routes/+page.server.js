import sdk from 'node-appwrite';
import { APPWRITE_DB_ID, APPWRITE_SESSIONS_ID } from '$env/static/private';
import { databases } from '$lib/server/AppWrite.js';

export async function load({ cookies }) {
	const sessions = await databases.listDocuments(APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, [
		sdk.Query.equal('userid', cookies.get('userid')),
		sdk.Query.orderDesc('$createdAt')
	]);
	return {
		sessions: sessions.documents
	};
}
