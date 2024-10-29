import * as vscode from 'vscode';
import { ElementCompact, xml2js } from 'xml-js';

/**
 * Get the content of an XML file.
 */
export async function getXmlContent(uri: vscode.Uri): Promise<ElementCompact> {
	const rawContent = await vscode.workspace.fs.readFile(uri);
	return xml2js(rawContent.toString(), { compact: true }) as ElementCompact;
}
