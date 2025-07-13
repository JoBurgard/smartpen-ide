<script lang="ts">
	import { saveProject } from '$lib/save.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.ctrlKey && event.key === 's') {
			saveProject();
		}
	}}
/>

{@render children()}
