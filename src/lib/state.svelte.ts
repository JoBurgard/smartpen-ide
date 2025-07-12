import type { Project } from './types/project';

export const project: Project = $state({
	graphics: [],
});

export const ui: Record<string, any> = $state({
	selectedCode: null,
});
