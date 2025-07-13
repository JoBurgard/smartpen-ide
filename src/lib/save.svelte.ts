import * as path from '@tauri-apps/api/path';
import { save } from '@tauri-apps/plugin-dialog';
import { create, exists, mkdir, writeTextFile } from '@tauri-apps/plugin-fs';
import { project } from './state.svelte';

export async function saveProject() {
	const selectedPath = await save({
		title: 'Specify where to save (please use a specific directory for your project)',
		defaultPath: 'smartpen_project.spp',
		filters: [
			{
				name: 'Smartpen-Project',
				extensions: ['spp'],
			},
		],
	});

	if (!selectedPath) {
		return;
	}

	const contents = JSON.stringify({ notifications: true });
	await writeTextFile(selectedPath, contents);

	const dirPath = await path.dirname(selectedPath);
	const backgroundsDir = await path.join(dirPath, 'backgrounds');
	for (const page of project.pages) {
		if (page.background) {
			if (!exists(backgroundsDir)) {
				await mkdir(backgroundsDir);
			}
			const file = await create(
				await path.join(
					backgroundsDir,
					`${page.background.file.name}__${page.background.id}.${(await path.extname(page.background.file.name)) || 'unknown'}`,
				),
			);
			const content = await page.background.file.arrayBuffer();
			await file.write(new Uint8Array(content));
			await file.close();
		}
	}
}
