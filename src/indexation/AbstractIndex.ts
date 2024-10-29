import * as vscode from 'vscode';
import Logger from '../logger';

export type AbstractIndexRecord = { [key: string]: string };
export type Index = { [key: string]: any };

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
	public async startIndexing(): Promise<void> {
		const files = await vscode.workspace.findFiles(
			this.includePattern,
			this.excludePattern
		);

		for(const file of files) {
			try {
				await this.processFile(file);
			} catch (error) {
				console.error("Can't process file index.", error, file);
			}
		}

		Logger.info(`Indexing ${this.code} done`);
		this.isReady = true;
	}

	/**
	 * Get an item from the buffer
	 *
	 * @param {string} key
	 * @returns {Promise<AbstractIndexRecord>}
	 */
	public async get(key: string): Promise<AbstractIndexRecord> {
		if (this.buffer[key]) {
			return this.buffer[key];
		}

		await this.waitForReady();

		return this.buffer[key];
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
