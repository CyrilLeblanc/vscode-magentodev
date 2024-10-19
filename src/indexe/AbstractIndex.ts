import * as vscode from 'vscode';

export type IndexRecord = {[key: string]: string};
export type Index = {[key: string]: IndexRecord};

export default abstract class AbstractIndex {
	public code = '';
	protected includePattern: string = '';
	protected excludePattern: string = '**{test,Test}**';
	protected buffer: Index = {};
	protected isReady: boolean = false;

	/**
	 * Indexes the files in the workspace
	 *
	 * @returns {Promise<void>}
	 */
	public async index(): Promise<void> {
		if (this.isReady) {
			return;
		}

		const files = await vscode.workspace.findFiles(this.includePattern, this.excludePattern);
		files.forEach(async file => {
			try {
				await this.processFile(file);
			} catch (error) {
				console.error('Can\'t process file index.', error, file);
			}
		});

		this.isReady = true;
	}

	/**
	 * Get an item from the buffer
	 *
	 * @param {string} id
	 * @returns {Promise<IndexRecord>}
	 */
	public async get(id: string): Promise<IndexRecord> {
		if (this.buffer[id]) {
			return this.buffer[id];
		}

		await this.waitForReady();

		return this.buffer[id];
	}

	/**
	 * Get the buffer
	 *
	 * @returns {Promise<Index>}
	 */
	public async getAll(): Promise<Index> {
		await this.waitForReady();
		return this.buffer;
	}

	/**
	 * Wait for the index to be ready
	 *
	 * @returns Promise<void>
	 */
	protected waitForReady(): Promise<void> {
		return new Promise((resolve) => {
			const interval = setInterval(() => {
				if (this.isReady) {
					clearInterval(interval);
					resolve();
				}
			}, 100);
		});
	}

	/**
	 * Update the buffer with the file content
	 *
	 * @param uri
	 */
	protected async processFile(uri: vscode.Uri): Promise<void> {
		return new Promise(() => {});
	}
}
