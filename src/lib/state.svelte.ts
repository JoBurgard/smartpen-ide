export type Project = {
	pages: {
		name: string;
		graphics: {
			name: string;
			file: File;
			objectURL: string;
			x: number;
			y: number;
			id: string;
		}[];
	}[];
};

export const project: Project = $state({
	pages: [
		{
			name: 'Page 1',
			graphics: [],
		},
	],
});

export const ui: Record<string, any> = $state({
	selectedCode: null,
});
