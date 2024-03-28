<script lang="ts">
	import type { ProxyElement } from './ProxyElement.js';

	type $$Props = ProxyElement & {
		name?: string;
	};
</script>

<svelte:element this={$$props.this ?? 'div'} {...$$props} data-flowover-scope={$$props.name ?? ''}>
	<slot />
</svelte:element>
