import * as vscode from 'vscode';
import AbstractPhpFileFactory from './AbstractPhpFileFactory';
import registrationTemplate from '../../../template/php/registration';

export default class PhpRegistrationFileFactory extends AbstractPhpFileFactory {
	template = registrationTemplate;

	getTemplateData() {
		return {
			moduleName: this.guessModuleName(),
		};
	}

	/**
	 * Guess the module name based on the file path.
	 */
	protected guessModuleName() {
		const relativePath = vscode.workspace.asRelativePath(this.uri);
		const parts = relativePath.split('/');

		// Remove 'app/code' from the beginning
		parts.shift();
		parts.shift();

		return parts.shift() + '_' + parts.shift();
	}
}
