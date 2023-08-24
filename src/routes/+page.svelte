<script>
	import CFPCard from '$lib/cfpCard.svelte';
	import Button from '$lib/button.svelte';
	export let data;
</script>

<div class="w-36 m-4 float-right">
	<Button url="/addSession">New Session</Button>
</div>
<h2
	class="mb-4 text-3xl font-bold leading-tight tracking-tighter text-gray-700 md:text-5xl dark:text-gray-300"
>
	Current Sessions
</h2>
{#each data.sessions as session}
	<CFPCard {session} />
{/each}
