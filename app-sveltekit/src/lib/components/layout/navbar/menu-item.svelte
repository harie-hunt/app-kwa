<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let href: string, label: string, active: boolean;
</script>

<a
	{href}
	class={cn(
		'focus:outline-none active:text-blue-600 focus:text-gray-700 hover:text-gray-700 transition-colors',
		{ 'text-blue-600': active }
	)}
>
	{label}
</a>
