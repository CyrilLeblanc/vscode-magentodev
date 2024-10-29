import * as vscode from 'vscode';

export default abstract class AbstractFileFactory {
	/**
	 * Constructor
	 *
	 * @param {vscode.Uri} uri - The URI of the file to create
	 */
	constructor(
		protected uri: vscode.Uri
	) {
	}

	/**
	 * Create the file content
	 *
	 * @returns {string}
	 */
	public abstract create(): string;
}
