import { WebUI } from '@webui-dev/bun-webui';
import type { WebUIEvent } from '@webui-dev/bun-webui/src/types';

function helloWorld(event: WebUIEvent) {
	console.log(event.arg.string(0));
	return 'world';
}

const appWindow = new WebUI();

appWindow.bind('helloWorld', helloWorld);

if (process.env.NODE_ENV === 'production') {
	WebUI.setDefaultRootFolder('build');
	appWindow.show(await Bun.file('build/index.html').text());

	await WebUI.wait();
} else {
	console.log('Starting dev environment...');
	const vite = Bun.spawn({
		cmd: ['vite', 'dev'],
		stdout: 'inherit'
	});

	const port = 5100;
	const ok = appWindow.setPort(port);

	console.log(`WebUI Port is set to ${port} (success: ${ok})`);

	process.on('exit', () => {
		vite.kill('SIGTERM');
	});

	appWindow.show('http://localhost:5173');

	await WebUI.wait();
}

process.exit(0);
