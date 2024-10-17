import AbstractIndex from "./AbstractIndex";
import ThemeIndex from "./ThemeIndex";

const indexes = {
	'theme': new ThemeIndex()
} as {[key: string]: AbstractIndex};

/**
 * Index all the indexes
 *
 * @returns Promise<void>
 */
export async function indexAll(): Promise<void> {
	for (const index in indexes) {
		await indexes[index].index();
	}
}

/**
 * Get an index by its code
 *
 * @param index {string}
 * @returns {AbstractIndex}
 */
export function getIndex(index: string) {
	return indexes[index];
}

export default indexes;
