import * as vscode from 'vscode';

export type Index = {[key: string]: {[key: string]: string}};

export default abstract class AbstractIndex {
	protected includePath: string = '';
	protected buffer: Index = {};

	/**
	 * Indexes the files in the workspace
	 *
	 * @returns Promise<void>
	 */
	public async index(): Promise<void> {
		const files = await vscode.workspace.findFiles(this.includePath);
		files.forEach(async file => {
			try {
				await this.processFile(file);
			} catch (error) {
				console.error('Can\'t process file index.', error, file);
			}
		});
	}

	public get(id: string): {[key: string]: string} {
		return this.buffer[id];
	}

	/**
	 * Get the buffer
	 *
	 * @returns Index
	 */
	public getAll(): Index {
		return this.buffer;
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
