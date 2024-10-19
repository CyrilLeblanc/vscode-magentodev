import * as vscode from 'vscode';
import AbstractIndex from './AbstractIndex';
import { ElementCompact, xml2js } from 'xml-js';

export default class ThemeIndex extends AbstractIndex {
	includePattern = '{app/design/**/theme.xml,vendor/**/theme.xml}';
	code = 'theme';

	async processFile(uri: vscode.Uri): Promise<void> {
		const rawContent = await vscode.workspace.fs.readFile(uri);
		const content = xml2js(rawContent.toString(), {compact: true}) as ElementCompact;
		const title = content.theme.title._text;
		const parent = content.theme?.parent?._text;
		const path = uri.fsPath.replace('theme.xml', '');
		const pathParts = uri.fsPath.split('/');
		const area = pathParts.slice(-4)[0];
		const vendor = pathParts.slice(-3)[0];
		const name = pathParts.slice(-2)[0];
		const id = `${vendor}/${name}`;

		this.buffer[id] = {
			id,
			area,
			vendor,
			name,
			title,
			path,
			parent,
		};
	}
}
