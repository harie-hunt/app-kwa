<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

{#each Array.from({ length: 3 }) as _}
	<div transition:fade class="space-y-3 rounded-md bg-white p-3">
		<div class="h-5 w-1/3 animate-pulse rounded-full bg-slate-300"></div>
		<div class="h-6 w-2/3 animate-pulse rounded-full bg-slate-200"></div>
	</div>
{/each}
