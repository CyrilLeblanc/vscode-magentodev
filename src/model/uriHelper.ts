import * as vscode from 'vscode';

/**
 * Parse the URI to relative uri and split parts
 */
export function parseUriToRelativeParts(uri: vscode.Uri): string[] {
	const relativeUri = vscode.workspace.asRelativePath(uri);
	relativeUri.replaceAll('\\', '/');

	return relativeUri.split('/');
}

/**
 * Get the vendor name based on the URI
 */
export function getVendorName(uri: vscode.Uri): string|null {
	const parts = parseUriToRelativeParts(uri);

	if (parts[0] === "vendor") {
		return parts[1];
	}

	switch(parts[1]) {
		case "code":
			return parts[2];
		case "design":
			return parts[3];
	}

	return null;
}

/**
 * Get the module name based on the URI
 */
export function getModuleName(uri: vscode.Uri): string|null {
	const parts = parseUriToRelativeParts(uri);

	if (parts[0] === "vendor") {
		return parts[2];
	}

	switch(parts[1]) {
		case "code":
			return parts[3];
		case "design":
			return parts[4];
	}

	return null;
}

/**
 * Get the module ID based on the URI
 */
export function getModuleId(uri: vscode.Uri): string|null {
	const moduleName = getModuleName(uri);
	const vendorName = getVendorName(uri);

	if (!moduleName || !vendorName) {
		return null;
	}

	return `${vendorName}_${moduleName}`;
}
