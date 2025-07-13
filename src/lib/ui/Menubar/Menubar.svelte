<script lang="ts">
	import { createMenubar } from '@melt-ui/svelte';
	import FileMenu from './FileMenu.svelte';

	const {
		elements: { menubar },
		builders: { createMenu },
	} = createMenubar();
</script>

<div {...$menubar} use:menubar class="bg-base-300 border-b border-white/5">
	<FileMenu {createMenu} />
</div>
