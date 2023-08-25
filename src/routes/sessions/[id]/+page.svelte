<script>
	import Button from '$lib/button.svelte';
	import { page } from '$app/stores';
	export let data;
	const session = data.session;
	const cfps = data.cfps;
	const accept = $page.url.searchParams.get('accept');
</script>

<div class="mx-auto mb-12 text-center md:max-w-2xl">
	<h2
		class="mb-4 text-3xl font-bold leading-tight tracking-tighter text-gray-700 md:text-5xl dark:text-gray-300"
	>
		{session.Title}
	</h2>
	<div class="flex items-center justify-center">
		<p class="inline-block mr-3 text-blue-500 dark:text-blue-300">
			Created: {new Date(session['$createdAt']).toDateString()}
		</p>
		<p class="inline-block text-blue-500 dark:text-blue-300">
			Updated: {new Date(session['$updatedAt']).toDateString()}
		</p>
	</div>
</div>
<div class="mx-auto md:max-w-3xl">
	<div
		class="pb-10 mb-8 text-lg text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 md:text-xl whitespace-pre-wrap"
	>
		{session.Abstract}
	</div>
	<h2 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-300 md:text-3xl">
		Submissions
	</h2>
	<ol
		class="mb-10 text-base text-gray-500 list-decimal list-inside md:px-5 md:text-lg dark:text-gray-400"
	>
		{#each cfps as cfp}
			<li>
				{cfp.Conference} | Submitted on: {new Date(cfp.SubmissionDate).toDateString()} |
				{#if cfp.Accepted}
					Accepted
				{:else}
					<a
						href={`/accept/${session['$id']}/${cfp['$id']}`}
						class="text-blue-500 dark:text-blue-300"
						data-sveltekit-reload>Accepted?</a
					>
				{/if}
			</li>
		{/each}
	</ol>
	<Button url="/">Back Home</Button>
</div>
