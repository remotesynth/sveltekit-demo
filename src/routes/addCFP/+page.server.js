import sdk from 'node-appwrite';
import { APPWRITE_DB_ID, APPWRITE_CFP_ID, APPWRITE_SESSIONS_ID } from '$env/static/private';
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

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const sessionID = data.get('sessionID');
		const conference = data.get('conference');
		const conferenceDate = data.get('conferenceDate');
		const submissionDate = data.get('dateSubmitted');
		const conferenceURL = data.get('url');

		const cfp = await databases.createDocument(APPWRITE_DB_ID, APPWRITE_CFP_ID, sdk.ID.unique(), {
			SessionID: sessionID,
			Conference: conference,
			ConferenceDate: conferenceDate,
			Accepted: false,
			SubmissionDate: submissionDate,
			URL: conferenceURL
		});
		throw redirect(303, '/');
	}
};
