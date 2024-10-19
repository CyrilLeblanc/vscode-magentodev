import Logger from "../logger";
import AbstractIndex, { Index } from "./AbstractIndex";
import ModuleIndex from "./ModuleIndex";
import ThemeIndex from "./ThemeIndex";

export default class GlobalIndex {
	protected indexes: {[key: string]: AbstractIndex};

	constructor() {
		this.indexes = {
			'theme': new ThemeIndex(),
			'module': new ModuleIndex(),
		};
	}

	/**
	 * Index all the indexes
	 */
	public async indexAll() {
		for (const code in this.indexes) {
			await this.indexes[code].index();
		}

		Logger.info('All indexes are ready.');
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
	public async getAll() {
		var data: {[key: string]: Index} = {};

		for (const code in this.indexes) {
			const index = this.indexes[code];
			data[code] = await index.getAll();
		}

		return data;
	}
}
