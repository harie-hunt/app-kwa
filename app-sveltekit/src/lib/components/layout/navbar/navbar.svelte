<script lang="ts">
	import Brand from './brand.svelte';
	import NavMenu from './nav-menu.svelte';
	import Profil from './profil.svelte';
</script>

<div class="bg-white border-b mb-6">
	<header class="flex items-center gap-x-6 container px-6 mx-auto">
		<Brand />
		<NavMenu />
		<Profil class="ms-auto" />
	</header>
</div>
