export type Project = {
	pages: {
		name: string;
		background: {
			name: string;
			file: File;
			objectURL: string;
			id: string;
		};
		codes: {
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
