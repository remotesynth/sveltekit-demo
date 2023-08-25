import sdk from 'node-appwrite';
import { APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, APPWRITE_CFP_ID } from '$env/static/private';
import { databases } from '$lib/server/AppWrite.js';

export async function load({ params, url }) {
	const cfpid = url.searchParams.get('accept');
	if (cfpid) {
		await databases.updateDocument(APPWRITE_DB_ID, APPWRITE_CFP_ID, cfpid, { Accepted: true });
	}
	const session = await databases.listDocuments(APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, [
		sdk.Query.equal('$id', params.id)
	]);
	const cfps = await databases.listDocuments(APPWRITE_DB_ID, APPWRITE_CFP_ID, [
		sdk.Query.equal('SessionID', params.id),
		sdk.Query.orderDesc('SubmissionDate')
	]);
	if (session.documents.length) {
		return {
			session: session.documents[0],
			cfps: cfps.documents
		};
	} else {
		return {
			session: {
				Title: 'Not found',
				Abstract: 'The session you are looking for does not exist.'
			},
			cfps: []
		};
	}
}
