<script lang="ts">
	import { registerFlowItem } from './shared/engine.js';
	import { onMount } from 'svelte';
	import type { ProxyElement } from './ProxyElement.js';

	type $$Props = ProxyElement & {
		to: string;
	};

	let ref: HTMLElement;

	onMount(() => {
		if (ref) {
			registerFlowItem(ref);
		}
	});

	$: {
		if (ref) {
			registerFlowItem(ref);
		}
	}
</script>

<svelte:element
	this={$$props.this ?? 'div'}
	bind:this={ref}
	{...$$props}
	data-flowover-item={$$props.to}
>
	<slot />
</svelte:element>
