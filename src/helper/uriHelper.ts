import * as vscode from 'vscode';

/**
 * Guess the namespace of the file based on a given uri
 */
export function guessNamespace(uri: vscode.Uri): string {
	const relativePath = vscode.workspace.asRelativePath(uri);
	const pathParts = relativePath.split(/[\/\\]/);
	
	// remove app/code
	pathParts.shift();
	pathParts.shift();

	// remove fileName
	pathParts.pop();

	return pathParts.join('\\');
}

/**
 * Guess the class name of the file based on a given uri
 */
export function guessClassName(uri: vscode.Uri): string {
	const fileName = uri.fsPath.split('/').pop();
	if (!fileName) {
		return '';
	}

	return fileName.split('.').shift() || '';
}

export function guessModule(uri: vscode.Uri): string {
	const relativePath = vscode.workspace.asRelativePath(uri);
	const parts = relativePath.split('/');

	// Remove 'app/code' from the beginning
	parts.shift();
	parts.shift();

	return parts.shift() + '_' + parts.shift();
}