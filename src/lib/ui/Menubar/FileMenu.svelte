<script lang="ts">
	import type { Menubar } from '@melt-ui/svelte';

	type Props = {
		createMenu: Menubar['builders']['createMenu'];
	};
	const { createMenu }: Props = $props();

	const {
		elements: { menu, item, trigger },
	} = createMenu();
</script>

<button {...$trigger} use:trigger class="btn btn-ghost btn-sm">File</button>
<ul
	{...$menu}
	use:menu
	class="menu menu-sm bg-base-100 [&>li:is([data-highlighted])>span]:bg-white/10"
>
	<li {...$item} use:item on:m-click={() => alert('open')}><span>Open...</span></li>
	<li {...$item} use:item on:m-click={() => alert('save')}><span>Save</span></li>
	<li {...$item} use:item on:m-click={() => alert('quit')}><span>Quit</span></li>
</ul>
