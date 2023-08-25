<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { Client, Account } from 'appwrite';
	import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

	// check that the user is logged in
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID);
	const account = new Account(client);
	const promise = account.get();
	promise.then(
		function (response) {
			// do nothing
		},
		function (error) {
			if (browser) goto('/authenticate');
		}
	);
</script>

<section class="bg-white dark:bg-gray-800">
	<div class="container px-4 mx-auto">
		<div
			class="p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-900 dark:border-gray-900"
		>
			<slot />
		</div>
	</div>
</section>
