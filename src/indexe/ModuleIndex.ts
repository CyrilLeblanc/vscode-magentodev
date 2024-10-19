import * as vscode from 'vscode';
import AbstractIndex from "./AbstractIndex";
import { ElementCompact, xml2js } from 'xml-js';

export default class ModuleIndex extends AbstractIndex {
	includePattern = '{app/code/**/module.xml,vendor/**/module.xml}';
	code = 'module';

	async processFile(uri: vscode.Uri): Promise<void> {
		const rawContent = await vscode.workspace.fs.readFile(uri);
		const content = xml2js(rawContent.toString(), {compact: true}) as ElementCompact;
		const moduleName = content.config?.module?._attributes?.name;
		const rootPath = vscode.Uri.joinPath(uri, '..', '..');

		this.buffer[moduleName] = {
			name: moduleName,
			rootPath: rootPath.fsPath,
		};
	}
}
