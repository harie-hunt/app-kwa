<script lang="ts">
	import { page } from '$app/stores';
	import MenuItem from './menu-item.svelte';

	const menus: [string, string, boolean][] = [
		['Dashboard', '/', false],
		['Anggota', '/anggota', false],
		['Transaksi', '/transaksi', false]
	];

	$: setmenus = menus.map((menu) => {
		const path = $page.url.pathname;
		const href = menu[1];
		menu[2] = (path === '/' && href === '/') || (href !== '/' && path.includes(href));
		return menu;
	});
</script>

<nav class="font-medium text-gray-400 flex gap-x-3">
	{#each setmenus as [label, href, active]}
		<MenuItem {href} {label} {active} />
	{/each}
</nav>
