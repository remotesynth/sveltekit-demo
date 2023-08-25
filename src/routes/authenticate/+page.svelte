<script>
	import { ID, Client, Account } from 'appwrite';
	import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
	export let message = '';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID);

	const urlParams = $page.url.searchParams;
	if (urlParams.has('userId') && urlParams.has('secret')) {
		const userid = urlParams.get('userId');
		const secret = urlParams.get('secret');
		const account = new Account(client);

		const promise = account.updateMagicURLSession(userid, secret);
		promise.then(
			function (response) {
				if (browser) {
					document.cookie = `userid=${userid}; path=/`;
					document.cookie = `sessionid=${response['$id']}; path=/`;
					goto('/');
				}
			},
			function (error) {
				message = 'Something went wrong!';
				console.log(error);
			}
		);
	}

	async function onSubmit(e) {
		const data = new FormData(e.target);
		const email = data.get('email');
		if (email && email.length > 0) {
			const account = new Account(client);
			const res = account.createMagicURLSession(ID.unique(), email, $page.url.href);

			res.then(
				function (response) {
					message = 'Check your email for a magic link!';
				},
				function (error) {
					message = 'Something went wrong!';
					console.log(error);
				}
			);
		} else {
			message = 'No email was found. Please try again';
		}
	}
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			{#if message.length > 0}
				<div
					class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
					role="alert"
				>
					<svg
						class="fill-current w-4 h-4 mr-2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><path
							d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
						/></svg
					>
					<p>{message}</p>
				</div>
			{/if}
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in to your account
				</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={onSubmit}>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Your email</label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="name@company.com"
							required
						/>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>Sign in</button
					>
				</form>
			</div>
		</div>
	</div>
</section>
