import sdk from 'node-appwrite';
import { APPWRITE_DB_ID, APPWRITE_SESSIONS_ID } from '$env/static/private';
import { databases } from '$lib/server/AppWrite.js';
import { redirect } from '@sveltejs/kit';

export async function load({ url, cookies }) {
	const id = url.searchParams.get('sessionID');
	const userid = cookies.get('userid');
	if (id && userid) {
		const session = await databases.listDocuments(APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, [
			sdk.Query.equal('$id', id),
			sdk.Query.equal('userid', userid)
		]);
		return {
			session: session.documents[0]
		};
	} else {
		return {
			session: null
		};
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const sessionID = data.get('sessionID');
		const title = data.get('title');
		const abstract = data.get('abstract');
		const userid = cookies.get('userid');

		if (sessionID && sessionID.length > 0) {
			await updateSession(sessionID, title, abstract);
		} else if (userid) {
			await createSession(title, abstract, userid);
		}
		throw redirect(303, '/');
	}
};

async function updateSession(sessionID, title, abstract) {
	const session = await databases.updateDocument(APPWRITE_DB_ID, APPWRITE_SESSIONS_ID, sessionID, {
		Title: title,
		Abstract: abstract
	});
}

async function createSession(title, abstract, userid) {
	const session = await databases.createDocument(
		APPWRITE_DB_ID,
		APPWRITE_SESSIONS_ID,
		sdk.ID.unique(),
		{ Title: title, Abstract: abstract, userid: userid }
	);
}
