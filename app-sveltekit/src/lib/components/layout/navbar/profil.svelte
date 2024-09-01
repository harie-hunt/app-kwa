<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
</script>

<div class={cn('', $$props.class)}>
	<button
		class="flex hover:border-gray-400 focus:outline-none focus:border-gray-400 transition-colors items-center gap-x-1 border py-1 px-1.5 rounded-md"
	>
		<Icon icon="mdi:user-circle" class="h-5 w-5 text-gray-500" />
		<span class="hidden md:block">nama</span>
	</button>
</div>
