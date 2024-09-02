<script lang="ts">
	import { cn } from '$lib/utils/cn';
</script>

<!-- 
@component
### Card
slot `head` `foot`
 -->
<section class={cn('bg-white border rounded-md', $$props.class)}>
	{#if $$slots.head}
		<header class="border-b px-6 py-3 bg-gray-50 font-semibold text-lg text-slate-500">
			<slot name="head" />
		</header>
	{/if}

	<div class="p-6">
		<slot />
	</div>

	{#if $$slots.foot}
		<footer class="flex items-center gap-2 px-6 py-3 border-t">
			<slot name="foot" />
		</footer>
	{/if}
</section>
