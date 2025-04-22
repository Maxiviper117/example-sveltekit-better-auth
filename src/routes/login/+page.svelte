<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<div class="flex h-screen items-center justify-center bg-gray-100">
	<form
		method="POST"
		class="mx-auto mt-10 max-w-sm space-y-6 rounded bg-white p-6 shadow"
		autocomplete="off"
		use:enhance
	>
		<h2 class="text-center text-2xl font-bold">Login</h2>
		{#if form?.error}
			<div class="rounded bg-red-100 p-2 text-red-700">{form.error}</div>
		{/if}
		<div>
			<label for="email" class="mb-1 block font-medium">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				required
				class="w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
			/>
		</div>
		<div>
			<label for="password" class="mb-1 block font-medium">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				required
				class="w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
			/>
		</div>
		<button
			type="submit"
			class="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700">Login</button
		>
		<a href="/signup">
			<button
				type="button"
				class="w-full rounded bg-gray-600 py-2 text-white transition hover:bg-gray-700"
				>Sign Up</button
			>
		</a>
	</form>
</div>
