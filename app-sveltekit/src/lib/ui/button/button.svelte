<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {}
</script>

<button
	type="button"
	{...$$props}
	class={cn(
		'border active:opacity-80 transition-colors rounded-md px-3 py-1 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 focus:outline-none focus:border-gray-400',
		$$props.class
	)}
>
	<slot />
</button>
