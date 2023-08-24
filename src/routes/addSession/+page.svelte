<script>
	export let data;
	let sessionID = '';
	let title = '';
	let abstract = '';
	if (data.session) {
		sessionID = data.session['$id'];
		title = data.session.Title;
		abstract = data.session.Abstract;
	}
</script>

<div class="pb-6 border-b border-gray-100 dark:border-gray-700">
	<h2 class="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
		Add/Edit Session Abstract
	</h2>
</div>
<form method="POST">
	<input type="hidden" name="sessionID" value={sessionID} />
	<div class="py-6 border-b border-gray-100 dark:border-gray-800">
		<div class="w-full md:w-9/12">
			<div class="flex flex-wrap -m-3">
				<div class="w-full p-3 md:w-1/3">
					<p class="text-base font-semibold text-gray-700 dark:text-gray-400">Session Title</p>
				</div>
				<div class="w-full p-3 md:flex-1">
					<input
						name="title"
						required
						class="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
						type="text"
						placeholder="title"
						value={title}
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="py-6 border-b border-gray-100 dark:border-gray-800">
		<div class="w-full md:w-9/12">
			<div class="flex flex-wrap -m-3">
				<div class="w-full p-3 md:w-1/3">
					<p class="text-sm font-semibold text-gray-800 dark:text-gray-400">Abstract</p>
				</div>
				<div class="w-full p-3 md:flex-1">
					<textarea
						name="abstract"
						rows="4"
						placeholder="your text here.."
						required
						class="block w-full px-4 py-4 leading-tight placeholder-gray-400 border rounded dark:placeholder-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800"
						>{abstract}</textarea
					>
				</div>
			</div>
		</div>
	</div>
	<div class="flex pt-6 flex-wrap -m-1.5">
		<div class="w-full md:w-auto p-1.5">
			<a
				href="/"
				class="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-700 hover:border-gray-300"
			>
				<p>Cancel</p>
			</a>
		</div>
		<div class="w-full md:w-auto p-1.5">
			<button
				class="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600"
			>
				<p>Save</p>
			</button>
		</div>
	</div>
</form>
