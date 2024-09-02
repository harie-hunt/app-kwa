<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let right: boolean | undefined = undefined,
		center: boolean | undefined = undefined;
</script>

<th
	scope="col"
	class={cn('px-6 py-1.5 font-medium text-gray-500', {
		'text-right': right,
		'text-center': center
	})}
>
	<slot />
</th>
