<script lang="ts">
	const { children } = $props();
</script>

<div class="rounded-md border border-white/5 bg-white/3 p-4">
	{@render children()}
</div>
