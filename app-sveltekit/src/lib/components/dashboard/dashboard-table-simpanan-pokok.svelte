<script lang="ts">
	import Table from '$lib/ui/table/table.svelte';
	import { formatNumberRibuan } from '$lib/utils/format';

	type SimpananWithAnggota = {
		no: string;
		nama: string;
		nilai: number;
	};

	type SchemaTable = {
		label: string;
		name: keyof SimpananWithAnggota;
		func?: (arg: any) => void;
	}[];

	const schema: SchemaTable = [
		{ label: 'No', name: 'no' },
		{ label: 'Nama', name: 'nama' },
		{ label: 'Nilai', name: 'nilai', func: formatNumberRibuan }
	];

	const values: SimpananWithAnggota[] = [
		{ no: 'a1', nama: 'Apus', nilai: 500000 },
		{ no: 'a2', nama: 'Sissi', nilai: 400000 }
	];
</script>

<h2 class="mb-3 font-medium">Simpanan Pokok belum lunas</h2>

<div class="rounded-md">
	<Table {schema} {values} />
</div>
