import * as vscode from 'vscode';
import AbstractIndex from './AbstractIndex';
import { getXmlContent } from '../helper/xml';

export type ModuleIndexRecord = {
	name: string;
	rootPath: string;
};

export default class ModuleIndex extends AbstractIndex {
	includePattern = '{app/code/**/etc/module.xml,vendor/**/etc/module.xml}';
	code = 'module';
	buffer: { [key: string]: ModuleIndexRecord } = {};

	async indexFile(uri: vscode.Uri): Promise<void> {
		const xmlContent = await getXmlContent(uri);
		const moduleName = xmlContent.config?.module?._attributes?.name as string;
		const rootPath = vscode.workspace.asRelativePath(
			vscode.Uri.joinPath(uri, '..', '..')
		);

		this.buffer[moduleName] = {
			name: moduleName,
			rootPath: rootPath,
		};
	}

	/**
	 * Find a module corresponding to the given uri.
	 */
	async findModuleByUri(
		uri: vscode.Uri
	): Promise<ModuleIndexRecord | undefined> {
		const relativePath = vscode.workspace.asRelativePath(uri);

		for (const moduleName in this.buffer) {
			const module = this.buffer[moduleName];

			if (relativePath.startsWith(module.rootPath)) {
				return module;
			}
		}
	}
}
