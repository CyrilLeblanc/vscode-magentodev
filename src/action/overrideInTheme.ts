import * as vscode from 'vscode';
import globalIndex from '../indexe';
import uriDescriptor from '../model/uriDescriptor';

const themeIndex = globalIndex.getIndex('theme');

export default async function overrideInTheme(uri: vscode.Uri) {
	const choices = await getChoices();

	// ask the user to select a theme
	const choice = await vscode.window.showQuickPick(choices, {
		placeHolder: 'Select a theme'
	});

	if (!choice) {
		return;
	}

	const themeId = choice.value;
	const themeInfo = themeIndex.get(themeId);

	// TODO: implement the rest of the function
}

async function getChoices() {
	const themes = await themeIndex.getAll();

	return Object.values(themes).map(theme => {
		return {
			label: `${theme.area} - ${theme.title}`,
			description: theme.id,
			value: theme.id
		};
	});
}
