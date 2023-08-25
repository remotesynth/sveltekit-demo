# An example SvelteKit app

This is a simple app example using SvelteKit. The app allows a user to create new session abstracts and indicate where they have submitted a CFP for that session. It is functional but intended purely for example purposes.

The application uses AppWrite on the backend for both data storage and authentication using magic links. If you'd like to run the application, you'll need the following environment variables from your AppWrite account.

```
APPWRITE_API_KEY=MY_KEY
PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
PUBLIC_APPWRITE_PROJECT_ID=PROJECTID
APPWRITE_DB_ID=DATABASE_ID
APPWRITE_SESSIONS_ID=SESSIONS_COLLECTION_ID
APPWRITE_CFP_ID=CFP_COLLECTIONS_ID
```

The current structure of the collections are:

**Session**
Title string Required
Abstract string Required
userid string Required

**cfps**

SessionID string Required
Conference string Required
ConferenceDate datetime Required
SubmissionDate datetime Required
Accepted boolean
URL string Required