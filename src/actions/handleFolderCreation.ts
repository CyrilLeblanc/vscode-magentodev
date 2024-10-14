import * as vscode from "vscode";
import uriDescriptor from "../models/uriDescriptor";
import { UriDescription } from "../types";

export default function handleFolderCreation(fileUri: vscode.Uri) {
	const uriDescription = uriDescriptor.describe(fileUri);
	const { relativePath } = uriDescription;
	const parts = relativePath.split("/");

	if (parts.length === 4) {
		createRegistrationFile(uriDescription);
		createModuleFile(uriDescription);
	}
}

function createRegistrationFile(uriDescription: UriDescription) {

}

function createModuleFile(uriDescription: UriDescription) {
}
