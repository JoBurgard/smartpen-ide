<script lang="ts">
	import { project } from '$lib/state.svelte';
	import CardSidebar from '$lib/ui/CardSidebar.svelte';
	import { v4 } from 'uuid';
	import { draggable, events } from '@neodrag/svelte';
	import { dev } from '$app/environment';
	import { Inspect } from 'svelte-inspect-value';

	let graphicFileInput: HTMLInputElement;
	let activePage = 0;

	let graphics = $derived(project.pages[activePage].graphics);
</script>

{#if dev}
	<Inspect.Panel value={project} />
{/if}

<div class="flex h-dvh w-dvw">
	<div class="relative grid h-screen max-w-full grow overflow-auto [&>*]:[grid-area:1/1]">
		{#each graphics as item (item.id)}
			<img
				src={item.objectURL}
				alt="Grafik"
				class="block h-auto max-h-none w-auto max-w-none select-none"
				draggable="false"
				{@attach draggable([
					events({
						onDrag: (data) => {
							item.x = data.offset.x;
							item.y = data.offset.y;
						},
					}),
				])}
			/>
		{/each}
		<div class="absolute top-4 left-4 flex gap-2">
			<button type="button" class="btn btn-neutral btn-sm">Seite 1</button>
			<button type="button" class="btn btn-neutral btn-sm">Seite 2</button>
			<button type="button" class="btn btn-neutral btn-sm">Seite 3</button>
			<button type="button" class="btn btn-neutral btn-sm">Seite 4</button>
		</div>
	</div>
	<div class="bg-base-200 flex w-96 shrink-0 flex-col gap-4 p-4">
		<div class="grow">
			<CardSidebar>
				<h3 class="text-xs font-bold tracking-wider">Eigenschaften</h3>
			</CardSidebar>
		</div>
		<CardSidebar>
			<h3 class="text-xs font-bold tracking-wider">Codes</h3>
		</CardSidebar>
		<CardSidebar>
			<h3 class="mb-4 text-xs font-bold tracking-wider">Grafiken</h3>

			<div class="mb-4 flex flex-col-reverse">
				{#each graphics as item (item.name)}
					<div class="truncate rounded-md bg-white/3 px-2 py-1 text-end">{item.name}</div>
				{/each}
			</div>
			<button type="button" class="btn btn-sm w-full" onclick={() => graphicFileInput.click()}>
				<span class="i-[mdi--plus]"></span>
				Laden
			</button>
			<input
				type="file"
				class="pointer-events-none invisible fixed h-0 w-0"
				bind:this={graphicFileInput}
				accept=".jpg,.jpeg,.png"
				oninput={(event) => {
					for (const file of event.currentTarget.files ?? []) {
						graphics.push({
							name: file.name,
							file,
							objectURL: URL.createObjectURL(file),
							x: 0,
							y: 0,
							id: v4(),
						});
					}
				}}
			/>
		</CardSidebar>
	</div>
</div>
