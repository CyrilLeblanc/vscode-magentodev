import * as vscode from 'vscode';
import { themeIndex, moduleIndex } from '../indexation';
import { ThemeIndexRecord } from '../indexation/ThemeIndex';

export default async function overrideInTheme(uri: vscode.Uri) {
	const themeIndexRecord = await askForTheme();
	if (!themeIndexRecord) {
		return;
	}

	const newUri = await getNewUri(uri, themeIndexRecord);
	if (!newUri) {
		return;
	}

	overrideContent(uri, newUri);
}

/**
 * Ask the user to select a theme.
 */
async function askForTheme(): Promise<ThemeIndexRecord | undefined> {
	const themes = await themeIndex.getAll();
	const choices: any[] = [];

	Object.values(themes).forEach((theme) => {
		if (theme.isInVendor) {
			return;
		}

		choices.push({
			label: theme.title,
			description: theme.id,
			value: theme.id,
		});
	});

	// ask the user to select a theme
	const choice = await vscode.window.showQuickPick(choices, {
		placeHolder: 'Vendor/ThemeName',
		title: 'Select a theme in which to override the file',
	});

	if (!choice) {
		return;
	}

	return themes[choice.value];
}

/**
 * Get the new URI for the file to override.
 */
async function getNewUri(uri: vscode.Uri, theme: ThemeIndexRecord): Promise<vscode.Uri|undefined> {
	const sourceModule = await moduleIndex.findModuleByUri(uri);
	if (!sourceModule) {
		vscode.window.showErrorMessage('Could not find the module for the given file');
		return;
	}

	const relativePath = vscode.workspace.asRelativePath(uri);
	const inModulePath = relativePath.replaceAll(sourceModule.rootPath, '');
	const parts = inModulePath.split('/').filter(Boolean);

	if (parts.shift() !== 'view') {
		vscode.window.showErrorMessage('Invalid file to override');
		return;
	}

	// remove the area (frontend, adminhtml, base)
	const area = parts.shift();
	if (['frontend', 'adminhtml', 'base'].indexOf(area!) === -1) {
		vscode.window.showErrorMessage('Invalid file to override');
		return;
	}

	return vscode.Uri.joinPath(
		vscode.workspace.workspaceFolders![0].uri,
		theme.path,
		sourceModule.name,
		...parts
	);
}

/**
 * Override the content of the original file with the content of the new file.
 */
async function overrideContent(originalUri: vscode.Uri, newUri: vscode.Uri) {
	// get content of the original file
	const originalContent = await vscode.workspace.fs.readFile(originalUri);
	const originalContentString = new TextDecoder().decode(originalContent);
	const originalContentLines = originalContentString.split('\n');
	const originalContentLastLineLength = originalContentLines[originalContentLines.length - 1].length;

	// get content of the new file
	try {
		const oldContent = await vscode.workspace.fs.readFile(newUri);

		// ask the user if they want to override the file
		const answer = await vscode.window.showInformationMessage(
			`An override already exists. Do you still want to override it?`,
			'Yes',
			'No',
			'Show file'
		);

		switch (answer) {
			case 'Yes':
				break;

			case 'No':
				return;

			case 'Show file':
				vscode.window.showTextDocument(newUri);
				return;
		}
	} catch (e) {
		// file does not exist
	}

	// create the new file
	await vscode.workspace.fs.writeFile(newUri, originalContent);

	// open an editor for the new file
	const editor = await vscode.window.showTextDocument(newUri, {
		selection: new vscode.Selection(
			new vscode.Position(0, 0),
			new vscode.Position(originalContentLines.length - 1, originalContentLastLineLength)
		),
	});

	// replace the content of the new file
	await editor.edit((editBuilder) => {
		editBuilder.replace(
			new vscode.Range(
				new vscode.Position(0, 0),
				new vscode.Position(originalContentLines.length - 1, originalContentLastLineLength)
			),
			originalContentString
		);
	});
}