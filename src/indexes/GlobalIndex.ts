import AbstractIndex, { Index } from "./AbstractIndex";
import ThemeIndex from "./ThemeIndex";

export default class GlobalIndex {
	private indexes: {[key: string]: AbstractIndex};

	constructor() {
		this.indexes = {
			'theme': new ThemeIndex()
		};
	}

	/**
	 * Index all the indexes
	 */
	public async indexAll() {
		for (const code in this.indexes) {
			const index = this.indexes[code];
			await index.index();
		}
	}

	/**
	 * Get an index by its code
	 *
	 * @param index
	 * @returns AbstractIndex
	 */
	public getIndex(index: string) {
		return this.indexes[index];
	}

	/**
	 * Get all the indexes
	 */
	public getAll() {
		var data: {[key: string]: Index} = {};

		for (const code in this.indexes) {
			const index = this.indexes[code];
			data[code] = index.getAll();
		}

		return data;
	}
}
