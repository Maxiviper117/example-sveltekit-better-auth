<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client/auth/auth-client';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { PageProps } from './$types';
	import { page } from '$app/state';

	function handleLogout() {
		authClient.signOut({
			fetchOptions: {
				onSuccess(context) {
					goto('/');
				}
			}
		});
	}

	let { children } = $props();
</script>

<nav class="flex items-center justify-between bg-gray-800 p-4">
	<div>
		<a href="/dashboard" class="text-blue-500 hover:underline">Dashboard</a>
		{#if !page.data.user}
			<a href="/login" class="text-blue-500 hover:underline">Login</a>
			<a href="/signup" class="text-blue-500 hover:underline">Sign Up</a>
		{/if}
	</div>
	{#if page.data.user}
		<div>
			<button
				onclick={handleLogout}
				class="rounded bg-blue-300 px-4 py-2 font-bold text-white transition hover:bg-red-700"
			>
				Logout
			</button>
		</div>
	{/if}
</nav>
<main>
	{@render children()}
</main>
