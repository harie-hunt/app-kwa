<script lang="ts">
	import DashboardTableSimpananPokok from '$lib/components/dashboard/dashboard-table-simpanan-pokok.svelte';
	import DashboardTableSimpananWajib from '$lib/components/dashboard/dashboard-table-simpanan-wajib.svelte';
	import Gadget from '$lib/components/dashboard/gadget.svelte';
	import { title } from '$lib/stores';

	import type { PageData } from './$types';
	export let data: PageData;
	title.set('Dashboard');
</script>

<Gadget promise={data.promise_rekap} />

{#await data.promise_belum_transaksi}
	<p>..</p>
{:then value}
	<pre>{JSON.stringify(value, null, 2)}</pre>
{/await}

<hr class="my-6" />

<div class="space-y-6">
	<DashboardTableSimpananPokok />
	<DashboardTableSimpananWajib />
</div>
