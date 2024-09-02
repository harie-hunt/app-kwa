<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { SchemaTable } from '$lib/utils/type';
	import TbodyCell from './tbody-cell.svelte';
	import TbodyRow from './tbody-row.svelte';
	import Tbody from './tbody.svelte';
	import TheadCell from './thead-cell.svelte';
	import Thead from './thead.svelte';

	export let schema: SchemaTable[], values: Record<string, any>[];
</script>

<div class={cn('overflow-x-auto rounded-md', $$props.class)}>
	<table class="text-left w-full border-collapse">
		<Thead>
			{#each schema as { label, name, func, ...rest }}
				<TheadCell {...rest}>{label}</TheadCell>
			{/each}
			{#if $$slots.default}
				<TheadCell center>Aksi</TheadCell>
			{/if}
		</Thead>
		<Tbody>
			{#each values as value}
				<TbodyRow>
					{#each schema as { label, name, func, ...rest }}
						<TbodyCell {...rest}>{func ? func(value[name]) : value[name]}</TbodyCell>
					{/each}

					{#if $$slots.default}
						<td class="text-center">
							<slot />
						</td>
					{/if}
				</TbodyRow>
			{/each}
		</Tbody>
	</table>
</div>
