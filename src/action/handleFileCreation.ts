import * as vscode from "vscode";
import AbstractFileFactory from "../model/fileFactory/AbstractFileFactory";
import uriDescriptor from "../model/uriDescriptor";
import { UriDescriptionPhp, UriDescriptionXml } from "../type";
import PhpControllerFileFactory from "../model/fileFactory/php/PhpControllerFileFactory";
import PhpBlockFileFactory from "../model/fileFactory/php/PhpBlockFileFactory";
import PhpRegistrationFileFactory from "../model/fileFactory/php/PhpRegistrationFileFactory";
import PhpClassFileFactory from "../model/fileFactory/php/PhpClassFileFactory";
import XmlModuleFileFactory from "../model/fileFactory/xml/XmlModuleFileFactory";
import XmlDiFileFactory from "../model/fileFactory/xml/XmlDiFileFactory";

/**
 * Handle the file creation based on the give URI
 *
 * @param {vscode.Uri} fileUri
 */
export default async function handleFileCreation(fileUri: vscode.Uri) {
	const fileFactory = getFileFactory(fileUri);

	if (fileFactory) {
		const content = fileFactory.create();
		setFileContent(fileUri, content);
	}
}

/**
 * Get file Factory based on file uri
 *
 * @param fileUri
 */
function getFileFactory(fileUri: vscode.Uri): AbstractFileFactory|null {
	const uriDescription = uriDescriptor.describe(fileUri);
	switch(uriDescription.fileExtension) {
		case "php":
			const uriDescriptionPhp = uriDescription as UriDescriptionPhp;
			switch(uriDescriptionPhp.type) {
				case "registration":
					return new PhpRegistrationFileFactory(uriDescriptionPhp);
				case "controller":
					return new PhpControllerFileFactory(uriDescriptionPhp);
				case "block":
					return new PhpBlockFileFactory(uriDescriptionPhp);
				default:
					return new PhpClassFileFactory(uriDescriptionPhp);
			};
		case "xml":
			const uriDescriptionXml = uriDescription as UriDescriptionXml;
			switch(uriDescriptionXml.type) {
				case "module":
					return new XmlModuleFileFactory(uriDescriptionXml);
				case "di":
					return new XmlDiFileFactory(uriDescriptionXml);
				default:
					return null;
			}
	}

	return null;
}

/**
 *
 * @param fileUri {vscode.Uri}
 * @param content {string}
 */
async function setFileContent(fileUri: vscode.Uri, content: string) {
	try {
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);

		await editor.edit((editBuilder) => {
			// remove all file content
			const lastLine = document.lineAt(document.lineCount - 1);
			const textRange = new vscode.Range(
				new vscode.Position(0, 0),
				lastLine.range.end
			);
			editBuilder.delete(textRange);

			// Add new content
			editBuilder.insert(new vscode.Position(0, 0), content);
		});
	} catch (error) {
		vscode.window.showErrorMessage("Failed to add the default content");
	}
}
