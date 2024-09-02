<script lang="ts">
	import LoadingGadget from '$lib/ui/loading/loading-gadget.svelte';
	import { formatNumberRibuan, formatNumberRupiah } from '$lib/utils/format';
	import type { Rekap } from '$lib/utils/type';
	import GadgetItem from './gadget-item.svelte';

	export let promise: Promise<Rekap>;
</script>

<ul class="grid gap-x-6 md:grid-cols-3">
	{#await promise}
		<LoadingGadget />
	{:then value}
		<GadgetItem
			values={{ title: 'Anggota', nilai: value.anggota }}
			suffix="Orang"
			func={formatNumberRibuan}
		/>
		<GadgetItem values={{ title: 'Simpanan', nilai: value.simpanan }} func={formatNumberRupiah} />
		<GadgetItem values={{ title: 'Pinjaman', nilai: value.pinjaman }} func={formatNumberRupiah} />
	{/await}
</ul>
