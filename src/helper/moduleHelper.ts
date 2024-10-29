/**
 * Split the module name into a vendor and a name
 */
export function splitModuleName(moduleName: string): {
	vendor: string;
	name: string;
} {
	const parts = moduleName.split('_');

	return {
		vendor: parts[0],
		name: parts[1],
	};
}
