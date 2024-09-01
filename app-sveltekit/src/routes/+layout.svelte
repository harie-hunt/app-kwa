<script lang="ts">
	import { title } from '$lib/stores';
	import '../app.css';

	// import type { LayoutData } from './$types';
	// export let data: LayoutData;
</script>

<svelte:head>
	<title>{$title} | Koperasi Wanita Anggrek</title>
</svelte:head>

<slot />
