<script lang="ts">
	import Button from '$lib/ui/button/button.svelte';
	import Card from '$lib/ui/card/card.svelte';
	import Table from '$lib/ui/table/table.svelte';
	import { formatNumberRibuan } from '$lib/utils/format';
	import type { SchemaTable } from '$lib/utils/type';

	type SimpananWithAnggota = {
		no: string;
		nama: string;
		nilai: number;
	};

	const schema: (SchemaTable & { name: keyof SimpananWithAnggota })[] = [
		{ label: 'Nama', name: 'nama' },
		{ label: 'No', name: 'no' },
		{ label: 'Nilai', name: 'nilai', right: true, func: formatNumberRibuan }
	];

	const values: SimpananWithAnggota[] = [
		{ no: 'a1', nama: 'Apus', nilai: 500000 },
		{ no: 'a2', nama: 'Sissi', nilai: 40000 }
	];
</script>

<Card class="md:max-w-lg">
	<h2 slot="head">Simpanan Pokok belum lunas</h2>

	<div class="-mx-6 -my-4">
		<Table {schema} {values}>
			<Button>Bayar</Button>
		</Table>
	</div>

	<div slot="foot">Total : 12</div>
</Card>
