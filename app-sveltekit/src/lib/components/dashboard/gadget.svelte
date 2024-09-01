<script lang="ts">
	import { formatNumberRibuan, formatNumberRupiah } from '$lib/utils/format';
	import GadgetItem from './gadget-item.svelte';
</script>

<ul class="grid md:grid-cols-3 gap-x-6">
	<GadgetItem values={{ title: 'Anggota', nilai: 43 }} suffix="Orang" func={formatNumberRibuan} />
	<GadgetItem values={{ title: 'Simpanan', nilai: 24560500 }} func={formatNumberRupiah} />
	<GadgetItem values={{ title: 'Pinjaman', nilai: 10000000 }} func={formatNumberRupiah} />
</ul>
