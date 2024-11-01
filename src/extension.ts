import * as vscode from 'vscode';
import registerCommands from './command';
import Logger from './logger';
import { IndexAll } from "./indexation";
import handleFileCreation from './observer/handleFileCreation';
import handleFolderCreation from './observer/handleFolderCreation';

export async function activate(context: vscode.ExtensionContext) {
	Logger.info('MagentoDev extension activating...');

	// get all Magento workspaces
	const magentoWorkspaces = await getMagentoWorkspaces();
	if (magentoWorkspaces.length === 0) {
		return;
	}

	registerCommands(context);

	IndexAll();

	// watch for file and folder creation in Magento workspaces
	for (const workspace of magentoWorkspaces) {
		// handle file creation
		const fileCreationWatcher = vscode.workspace
			.createFileSystemWatcher(new vscode.RelativePattern(workspace, 'app/{code,design}/**/*.{xml,php}'))
			.onDidCreate(handleFileCreation);

		// handle folder creation
		const folderCreationWatcher = vscode.workspace
			.createFileSystemWatcher(new vscode.RelativePattern(workspace, 'app/{code,design}/**/'))
			.onDidCreate(handleFolderCreation);

		context.subscriptions.push(
			fileCreationWatcher,
			folderCreationWatcher
		);
	}

	Logger.info('MagentoDev Tools extension activated');
}

export function deactivate() {}

/**
 * Get all Magento workspaces
 *
 * @returns Promise<vscode.WorkspaceFolder[]> - The list of Magento workspaces
 */
async function getMagentoWorkspaces(): Promise<vscode.WorkspaceFolder[]> {
	const workspaces = vscode.workspace.workspaceFolders;
	const result = [];
	if (!workspaces) {
		return [];
	}

	for (const workspace of workspaces) {
		try {
			// check if composer.json file exists
			const composerJsonUri = vscode.Uri.joinPath(workspace.uri, 'composer.json');
			await vscode.workspace.fs.stat(composerJsonUri);

			// parse the content of composer.json
			const composerJsonContent = await vscode.workspace.fs.readFile(composerJsonUri);
			const composerJsonString = Buffer.from(composerJsonContent).toString('utf8');
			const composerJsonObj = JSON.parse(composerJsonString);

			// check if the composer.json file is a Magento workspace
			if (!composerJsonObj?.require['magento/product-community-edition']) {
				throw new Error('Not a Magento workspace');
			}

			// check if there's a app/code folder
			const appCode = vscode.Uri.joinPath(workspace.uri, 'app', 'code');
			await vscode.workspace.fs.stat(appCode);

			Logger.info(`Magento workspace found: ${workspace.uri.fsPath}`);
			result.push(workspace);
		} catch (e) {
			Logger.info(`Not a Magento workspace: ${workspace.uri.fsPath}`);
		}
	}

	return result;
}
