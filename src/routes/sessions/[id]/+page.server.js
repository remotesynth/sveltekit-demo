import sdk from 'node-appwrite';
import { APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, APPWRITE_CFP_ID } from '$env/static/private';
import { databases } from '$lib/server/AppWrite.js';

export async function load({ params }) {
	const session = await databases.listDocuments(APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, [
		sdk.Query.equal('$id', params.id)
	]);
	const cfps = await databases.listDocuments(APPWRITE_DB_ID, APPWRITE_CFP_ID, [
		sdk.Query.equal('SessionID', params.id),
		sdk.Query.orderDesc('SubmissionDate')
	]);
	return {
		session: session.documents[0],
		cfps: cfps.documents
	};
}
