import * as vscode from 'vscode';
import AbstractFileFactory from '../model/fileFactory/AbstractFileFactory';
import PhpClassFileFactory from '../model/fileFactory/php/PhpClassFileFactory';
import PhpRegistrationFileFactory from '../model/fileFactory/php/PhpRegistrationFileFactory';
import XmlFileFactory from '../model/fileFactory/xml/XmlFileFactory';
import XmlModuleFileFactory from '../model/fileFactory/xml/XmlModuleFileFactory';
import XmlDiFileFactory from '../model/fileFactory/xml/XmlDiFileFactory';
import { guessNamespace } from '../helper/uriHelper';
import PhpControllerFileFactory from '../model/fileFactory/php/PhpControllerFileFactory';
import PhpBlockFileFactory from '../model/fileFactory/php/PhpBlockFileFactory';

/**
 * Handle the file creation based on the give URI
 *
 * @param {vscode.Uri} fileUri
 */
export default async function handleFileCreation(fileUri: vscode.Uri) {
	const fileFactory = getFileFactory(fileUri);
	if (!fileFactory) {
		return;
	}

	const content = fileFactory.create();
	vscode.workspace.fs.writeFile(fileUri, Buffer.from(content));
}

/**
 * Get the file factory based on the given URI
 *
 * @param {vscode.Uri} fileUri
 * @returns {AbstractFileFactory|null}
 */
function getFileFactory(fileUri: vscode.Uri): AbstractFileFactory | null {
	const relativePath = vscode.workspace.asRelativePath(fileUri);
	const file = relativePath.split(/[\/\\]/).pop();
	const fileExtension = file?.split('.').pop();
	const fileName = file?.split('.').shift();
	var FileFactoryClass = null;

	if (!fileName && !fileExtension) {
		return null;
	}

	// handle PHP files
	if (fileExtension === 'php') {
		FileFactoryClass = PhpClassFileFactory;

		const namespace = guessNamespace(fileUri);
		const parts = namespace.split('\\');
		const vendor = parts.shift();
		const module = parts.shift();
		const type = parts.shift();

		switch(type) {
			case 'Model':
				FileFactoryClass = PhpClassFileFactory;
				break;
			case 'Controller':
				FileFactoryClass = PhpControllerFileFactory;
				break;
			case 'Block':
				FileFactoryClass = PhpBlockFileFactory;
				break;
		}

		if (fileName === 'registration') {
			FileFactoryClass = PhpRegistrationFileFactory;
		}
	}

	// handle XML files
	if (fileExtension === 'xml') {
		FileFactoryClass = XmlFileFactory;

		if (fileName === 'module') {
			FileFactoryClass = XmlModuleFileFactory;
		}

		if (fileName === 'di') {
			FileFactoryClass = XmlDiFileFactory;
		}
	}

	if (FileFactoryClass) {
		return new FileFactoryClass(fileUri);
	}

	return null;
}
