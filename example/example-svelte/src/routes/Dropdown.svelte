<script>
	import FlowSlot from '../../../../src/svelte/src/lib/FlowSlot.svelte';
	import FlowScope from '../../../../src/svelte/src/lib/FlowScope.svelte';
	import FlowItem from '../../../../src/svelte/src/lib/FlowItem.svelte';
	import { slide } from 'svelte/transition';

	let open = false;
</script>

<FlowScope>
	<div class="relative inline-flex">
		<FlowSlot name="dropdown-above" class="absolute bottom-full w-full h-96" />
		<button
			on:click={() => {
				open = !open;
			}}
			class="bg-slate-200 hover:bg-slate-100 rounded-xl p-2 px-4 border border-slate-300 shadow-sm"
		>
			Dropdown
		</button>
		<FlowSlot
			name="dropdown-below"
			fallback="dropdown-above"
			class="absolute top-full w-full h-96"
		/>

		{#if open}
			<FlowItem to="dropdown-below" class="absolute left-0 w-full top-full">
				<div transition:slide class="flex flex-col space-y-4 bg-slate-900 rounded-lg">
					<button class="p-2 text-white">Item 1</button>
					<button class="p-2 text-white">Item 2</button>
					<button class="p-2 text-white">Item 3</button>
					<button class="p-2 text-white">Item 4</button>
				</div>
			</FlowItem>
		{/if}
	</div>
</FlowScope>
