<script lang="ts">
	import type { PageData } from './$types';
	import { authClient } from '$lib/client/auth/auth-client';
	// const session = authClient.useSession();

	let { data }: { data: PageData } = $props();
	// $inspect({ data });
</script>

<section class="flex h-screen items-center justify-center bg-gray-100">
	<div class="container mx-auto mt-10 max-w-sm space-y-6 rounded bg-white p-6 shadow">
		<h1>Dashboard</h1>
		{#if data.user}
			<p>Welcome, {data.user.email}!</p>
		{:else}
			<a href="/login">Sign In</a>
		{/if}
	</div>
</section>
