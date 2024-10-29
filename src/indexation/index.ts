import AbstractIndex from './AbstractIndex';
import ModuleIndex from './ModuleIndex';
import ThemeIndex from './ThemeIndex';

export const themeIndex = new ThemeIndex();
export const moduleIndex = new ModuleIndex();

/**
 * Start indexing all the indexes
 */
export function IndexAll() {
	const indexList: AbstractIndex[] = [themeIndex, moduleIndex];

	indexList.forEach((index) => index.startIndexing());
}
