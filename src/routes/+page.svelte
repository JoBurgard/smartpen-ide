<script lang="ts">
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button
	type="button"
	onclick={async () => {
		const answer = await webui.call('helloWorld', 'hello');
		console.log(answer);
	}}>Hello World</button
>
