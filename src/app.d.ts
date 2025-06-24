// See https://svelte.dev/docs/kit/types#app.d.ts

// from WebUI
type DataTypes = string | number | boolean | Uint8Array;

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	var webui: {
		// TODO: type the function names
		call: (fn: string, ...args: DataTypes[]) => Promise<DataTypes>;
	};
}

export {};
