import * as vscode from 'vscode';
import handleFileCreation from './actions/handleFileCreation';
import handleFolderCreation from './actions/handleFolderCreation';

export function activate(context: vscode.ExtensionContext) {

	// handle file creation
	const fileCreationWatcher = vscode.workspace
		.createFileSystemWatcher('**/*.{xml,php}')
		.onDidCreate(handleFileCreation);

	// handle folder creation
	const folderCreationWatcher = vscode.workspace
		.createFileSystemWatcher('**/')
		.onDidCreate(handleFolderCreation);

	context.subscriptions.push(fileCreationWatcher, folderCreationWatcher);

	console.log('"magentodev" is now active!');
}

export function deactivate() {}
