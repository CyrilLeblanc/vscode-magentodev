import * as vscode from 'vscode';
import AbstractIndex from './AbstractIndex';
import { getXmlContent } from '../helper/xml';

export type ThemeIndexRecord = {
	id: string;
	isInVendor: boolean;
	vendor: string;
	name: string;
	title: string;
	path: string;
	parent: string;
};

export default class ThemeIndex extends AbstractIndex {
	includePattern = '{app/design/**/theme.xml,vendor/**/theme.xml}';
	code = 'theme';
	buffer: { [key: string]: ThemeIndexRecord } = {};

	async indexFile(uri: vscode.Uri): Promise<void> {
		const themeXml = await getXmlContent(uri);
		const title = themeXml.theme.title._text;
		const parent = themeXml.theme?.parent?._text;
		const path = vscode.workspace.asRelativePath(
			vscode.Uri.joinPath(uri, '..')
		);
		const pathParts = path.split('/');
		const name = pathParts.pop() as ThemeIndexRecord['name'];
		const vendor = pathParts.pop() as ThemeIndexRecord['vendor'];
		const isInVendor = pathParts.pop() === 'vendor';
		const id = `${vendor}/${name}`;

		this.buffer[id] = {
			id,
			isInVendor,
			vendor,
			name,
			title,
			path,
			parent,
		};
	}
}
