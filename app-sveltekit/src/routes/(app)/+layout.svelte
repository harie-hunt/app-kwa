<script lang="ts">
	import Navbar from '$lib/components/layout/navbar/navbar.svelte';
	import { title } from '$lib/stores';

	// import type { LayoutData } from './$types';
	// export let data: LayoutData;
</script>

<Navbar />

<div class="container px-6 mx-auto">
	<header class="mb-6">
		<h1 class="text-4xl font-medium text-gray-500">{$title}</h1>
	</header>

	<slot />
</div>
