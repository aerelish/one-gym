export const simpleLogger = {
	error: (message: string) => {
		console.error(`[ERROR] ${message}`);
	},
	info: (message: string) => {
		console.log(`[INFO] ${message}`);
	},
	warn: (message: string) => {
		console.warn(`[WARN] ${message}`);
	},
};
