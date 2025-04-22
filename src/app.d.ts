declare global {
	namespace App {
		// Add your types here
		interface Locals {
			user?: {
				[key: string]: any;
			} | null;
			session?: {
				[key: string]: any;
			} | null;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
