<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let right: boolean | undefined = undefined,
		center: boolean | undefined = undefined;
</script>

<td class={cn('py-3 px-6', { 'text-right': right, 'text-center': center })}>
	<slot />
</td>
