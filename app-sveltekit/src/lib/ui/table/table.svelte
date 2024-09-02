<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import TbodyCell from './tbody-cell.svelte';
	import TbodyRow from './tbody-row.svelte';
	import Tbody from './tbody.svelte';
	import TheadCell from './thead-cell.svelte';
	import Thead from './thead.svelte';

	export let schema: {
			label: string;
			name: string;
			func?: (arg: any) => void;
		}[],
		values: Record<string, any>[];
</script>

<div class={cn('overflow-x-auto rounded-md', $$props.class)}>
	<table class="text-left w-full border-collapse">
		<Thead>
			{#each schema as { label }}
				<TheadCell>{label}</TheadCell>
			{/each}
		</Thead>
		<Tbody>
			{#each values as value}
				<TbodyRow>
					{#each schema as { name, func }}
						<TbodyCell>{func ? func(value[name]) : value[name]}</TbodyCell>
					{/each}
				</TbodyRow>
			{/each}
		</Tbody>
	</table>
</div>
