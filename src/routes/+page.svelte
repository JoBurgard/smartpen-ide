<script lang="ts">
	import { project } from '$lib/state.svelte';
	import CardSidebar from '$lib/ui/CardSidebar.svelte';
	import { v4 } from 'uuid';
	import { draggable, events } from '@neodrag/svelte';
	import { dev } from '$app/environment';
	import { Inspect } from 'svelte-inspect-value';
	import Menubar from '$lib/ui/Menubar/Menubar.svelte';

	let graphicFileInput: HTMLInputElement;
	let activePage = 0;

	let page = $derived(project.pages[activePage]);
	let background = $derived(page.background);
	let codes = $derived(page.codes);
</script>

{#if dev}
	<Inspect.Panel value={project} />
{/if}

<div class="flex h-dvh w-dvw flex-col">
	<div class="shrink-0">
		<Menubar />
	</div>
	<div class="flex min-h-0 grow">
		<div class="relative grid max-w-full grow overflow-auto [&>*]:[grid-area:1/1]">
			{#if background}
				<img
					src={background.objectURL}
					alt="image {background.name}"
					class="pointer-events-none block h-auto max-h-none w-auto max-w-none select-none"
					draggable="false"
				/>
			{/if}
			{#each codes as item (item.oid)}
				<img
					alt="image {item.name}"
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
			<div class="absolute inset-0 flex gap-2">
				<button type="button" class="btn btn-neutral btn-sm">Page 1</button>
				<button type="button" class="btn btn-neutral btn-sm">Page 2</button>
				<button type="button" class="btn btn-neutral btn-sm">Page 3</button>
				<button type="button" class="btn btn-neutral btn-sm">Page 4</button>
			</div>
		</div>
		<div class="bg-base-200 flex w-96 shrink-0 flex-col gap-4 p-4">
			<div class="grow">
				<CardSidebar>
					<h3 class="text-xs font-bold tracking-wider">Properties</h3>
				</CardSidebar>
			</div>
			<CardSidebar>
				<h3 class="text-xs font-bold tracking-wider">OID-Codes</h3>
				<div class="mb-4 flex flex-col-reverse">
					{#each codes as item (item.name)}
						<div class="truncate rounded-md bg-white/3 px-2 py-1 text-end">{item.name}</div>
					{/each}
				</div>
				<button
					type="button"
					class="btn btn-sm mb-4 w-full"
					onclick={() => {
						// TODO:
					}}
				>
					<span class="icon-[mdi--dots-grid]"></span>
					Create Script Code
				</button>
				<button
					type="button"
					class="btn btn-sm w-full"
					onclick={() => {
						const answer = prompt('Please enter a number ranging from 0 to 1000', '900');
						if (!answer) {
							return;
						}
						codes.push({ name: answer, oid: parseInt(answer), x: 0, y: 0 });
					}}
				>
					<span class="icon-[mdi--dots-grid]"></span>
					Create Product Code
				</button>
			</CardSidebar>
			<CardSidebar>
				<h3 class="mb-4 text-xs font-bold tracking-wider">Page Image</h3>

				{#if background}
					<div class="truncate rounded-md bg-white/3 px-2 py-1 text-end">{background.name}</div>
				{:else}
					<button type="button" class="btn btn-sm w-full" onclick={() => graphicFileInput.click()}>
						<span class="icon-[mdi--paperclip]"></span>
						Choose...
					</button>
				{/if}

				<input
					type="file"
					class="pointer-events-none invisible fixed h-0 w-0"
					bind:this={graphicFileInput}
					accept=".jpg,.jpeg,.png"
					oninput={(event) => {
						const file = event.currentTarget.files?.[0];
						if (!file) {
							return;
						}

						page.background = {
							file,
							id: v4(),
							name: file.name,
							objectURL: URL.createObjectURL(file),
						};
					}}
				/>
			</CardSidebar>
		</div>
	</div>
</div>
