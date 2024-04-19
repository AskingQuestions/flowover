<script>
	import FlowItem from '../../../../src/svelte/src/lib/FlowItem.svelte';
	import FlowSlot from '../../../../src/svelte/src/lib/FlowSlot.svelte';
	import Dropdown from './Dropdown.svelte';

	// import { FlowSlot, FlowItem } from '@flowover/svelte';

	let idx = 0;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<main
		style="
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
	>
		<img src="/logo.svg" alt="logo" style="max-height: 48px" />

		<div class="flex flex-row w-full p-4 h-[100vh]">
			<div class="flex-1 flex flex-col bg-slate-950">
				<FlowItem to={`footer${idx}`} class="bg-slate-900 rounded-lg p-10">
					<textarea class="resize"></textarea>
				</FlowItem>
			</div>
			<div class="flex-1 flex flex-col space-y-4">
				<textarea class="resize"></textarea>
				<div>
					<Dropdown></Dropdown>
				</div>
				<FlowSlot
					autosize="y"
					on:click={() => {
						idx = 0;
					}}
					name="footer0"
					class="bg-black p-4 rounded-xl resize"
				></FlowSlot>
				<FlowSlot
					autosize="none"
					on:click={() => {
						idx = 1;
					}}
					name="footer1"
					class="bg-black p-4 rounded-xl "
				></FlowSlot>
				<FlowSlot
					autosize="y"
					on:click={() => {
						idx = 2;
					}}
					name="footer2"
					class="bg-black p-4 rounded-xl "
				></FlowSlot>
			</div>
		</div>
	</main>
</section>

<style>
</style>
