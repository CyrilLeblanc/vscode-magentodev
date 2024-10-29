import * as vscode from 'vscode';

export default function handleFolderCreation(fileUri: vscode.Uri) {
	const relativePath = vscode.workspace.asRelativePath(fileUri);
	const parts = relativePath.split(/[\/\\]/);

	// verify that the relativePath match the expected pattern for a module
	// e.g. `app/code/Vendor/Module`
	const isModule = parts.length === 4 && parts[0] === 'app' && parts[1] === 'code';
	if (!isModule) {
		return;
	}

	// create `registration.php` and `etc/module.xml` file
	// the content of the files is managed in `handleFileCreation.ts`
	const paths = [
		vscode.Uri.joinPath(fileUri, 'registration.php'),
		vscode.Uri.joinPath(fileUri, 'etc', 'module.xml'),
	];

	paths.forEach((uri) => vscode.workspace.fs.writeFile(uri, Buffer.from('')));
}
