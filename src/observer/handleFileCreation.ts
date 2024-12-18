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
import XmlLayoutFileFactory from '../model/fileFactory/xml/XmlLayoutFileFactory';
import { moduleIndex } from '../indexation';
import XmlEventsFileFactory from '../model/fileFactory/xml/XmlEventsFileFactory';
import PhpObserverFileFactory from '../model/fileFactory/php/PhpObserverFileFactory';

/**
 * Handle the file creation based on the give URI
 */
export default async function handleFileCreation(fileUri: vscode.Uri) {
	// check if the file is empty (for when the file created by an extension)
	const fileStat = await vscode.workspace.fs.stat(fileUri);
	if (fileStat.size !== 0) {
		return;
	}

	const fileFactory = getFileFactory(fileUri);
	if (!fileFactory) {
		return;
	}

	const content = await fileFactory.create();
	vscode.workspace.fs.writeFile(fileUri, Buffer.from(content));

	if (fileFactory.constructor.name === 'XmlModuleFileFactory') {
		moduleIndex.indexFile(fileUri);
	}
}

/**
 * Get the file factory based on the given URI
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
			case 'Controller':
				FileFactoryClass = PhpControllerFileFactory;
				break;
			case 'Block':
				FileFactoryClass = PhpBlockFileFactory;
				break;
			case 'Observer':
				FileFactoryClass = PhpObserverFileFactory;
				break;
			default:
				FileFactoryClass = PhpClassFileFactory;
				break;
		}

		if (fileName === 'registration') {
			FileFactoryClass = PhpRegistrationFileFactory;
		}
	}

	// handle XML files
	if (fileExtension === 'xml') {
		FileFactoryClass = XmlFileFactory;
		const parts = relativePath.split(/[\/\\]/);
		const directory = parts[parts.length - 2];

		switch (fileName) {
			case 'module':
				FileFactoryClass = XmlModuleFileFactory;
				break;
			case 'di':
				FileFactoryClass = XmlDiFileFactory;
				break;
			case 'events':
				FileFactoryClass = XmlEventsFileFactory;
				break;
			default:
				FileFactoryClass = XmlFileFactory;
				break;
		}

		if (directory === 'layout') {
			FileFactoryClass = XmlLayoutFileFactory;
		}
	}

	if (FileFactoryClass) {
		return new FileFactoryClass(fileUri);
	}

	return null;
}
