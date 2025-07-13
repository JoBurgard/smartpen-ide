export type Project = {
	version: number;
	name: string;
	pages: {
		name: string;
		background?: {
			id: string;
			name: string;
			file: File;
			objectURL: string;
		};
		codes: {
			oid: number;
			name: string;
			x: number;
			y: number;
		}[];
	}[];
};

export const project: Project = $state({
	version: 1,
	name: 'Smartpen Project',
	pages: [
		{
			name: 'Page 1',
			codes: [],
		},
	],
});

export const ui: Record<string, any> = $state({
	selectedCode: null,
});
