<script lang="ts">
	import Table from '$lib/ui/table/table.svelte';

	const schema = [
		{ label: 'No', name: 'no' },
		{ label: 'Nama', name: 'nama' }
	];

	const values: Record<string, any>[] = [
		{ no: 'a1', nama: 'Apus' },
		{ no: 'a2', nama: 'Sissi' }
	];
</script>

<h2 class="mb-3 font-medium">Simpanan Pokok belum lunas</h2>

<div class="rounded-md">
	<Table {schema} {values} />
</div>
