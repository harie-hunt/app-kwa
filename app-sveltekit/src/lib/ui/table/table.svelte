<script lang="ts">
	import TbodyCell from './tbody-cell.svelte';
	import TbodyRow from './tbody-row.svelte';
	import Tbody from './tbody.svelte';
	import TheadCell from './thead-cell.svelte';
	import Thead from './thead.svelte';

	type SchemaTable = {
		label: string;
		name: string;
		func?: (arg: any) => void;
	}[];
	export let schema: SchemaTable, values: Record<string, any>[];
</script>

<div class="overflow-x-auto rounded-md border">
	<table class="text-left w-full border-collapse">
		<Thead>
			{#each schema as { label }}
				<TheadCell>{label}</TheadCell>
			{/each}
		</Thead>
		<Tbody>
			{#each values as value}
				<TbodyRow>
					{#each schema as { name }}
						<TbodyCell>{value[name]}</TbodyCell>
					{/each}
				</TbodyRow>
			{/each}
		</Tbody>
	</table>
</div>
