import * as vscode from 'vscode';

export default abstract class AbstractFileFactory {
	/**
	 * Constructor
	 */
	constructor(
		protected uri: vscode.Uri
	) {
	}

	/**
	 * Create the file content
	 */
	public abstract create(): Promise<string>;
}
