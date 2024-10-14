import * as vscode from "vscode";
import uriDescriptor from "../models/uriDescriptor";
import { UriDescription, UriDescriptionPhp, UriDescriptionXml } from "../types";
import PhpRegistrationFileFactory from "../models/fileFactory/php/PhpRegistrationFileFactory";
import XmlModuleFileFactory from "../models/fileFactory/xml/XmlModuleFileFactory";

export default function handleFolderCreation(fileUri: vscode.Uri) {
	const uriDescription = uriDescriptor.describe(fileUri);
	const { relativePath } = uriDescription;
	const parts = relativePath.split("/");

	if (parts.length === 4) {
		createRegistrationFile(uriDescription, fileUri);
		createModuleFile(uriDescription, fileUri);
	}
}

/**
 * Create the `registration.php` file
 *
 * @param uriDescription
 * @param fileUri
 */
function createRegistrationFile(uriDescription: UriDescription, fileUri: vscode.Uri) {
	const phpUriDescription = {
		...uriDescription,
		type: "registration",
	} as UriDescriptionPhp;
	const contentFactory = new PhpRegistrationFileFactory(phpUriDescription);
	const content = contentFactory.create();

	const registrationFileUri = vscode.Uri.joinPath(fileUri, "registration.php");
	vscode.workspace.fs.writeFile(registrationFileUri, Buffer.from(content));
}

/**
 * Create the `etc/module.xml` file
 *
 * @param uriDescription
 * @param fileUri
 */
function createModuleFile(uriDescription: UriDescription, fileUri: vscode.Uri) {
	const xmlUriDescription = {
		...uriDescription,
		type: "module",
	} as UriDescriptionXml;
	const contentFactory = new XmlModuleFileFactory(xmlUriDescription);
	const content = contentFactory.create();

	const moduleFileUri = vscode.Uri.joinPath(fileUri, "etc/module.xml");
	vscode.workspace.fs.writeFile(moduleFileUri, Buffer.from(content));
}
