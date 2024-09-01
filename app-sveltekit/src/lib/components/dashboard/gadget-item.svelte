<script lang="ts">
	type Values = {
		title: string;
		nilai: number;
	};

	export let values: Values,
		suffix: string | undefined = undefined,
		func: ((arg: number) => string) | undefined = undefined;
</script>

<li class="bg-white p-3 border rounded-md">
	<h1 class="font-semibold text-gray-400 text-lg">{values.title}</h1>
	<div class="text-2xl font-medium">
		{func ? func(values.nilai) : values.nilai}
		{#if suffix}
			<span class="text-gray-400 text-sm">{suffix}</span>
		{/if}
	</div>
</li>
