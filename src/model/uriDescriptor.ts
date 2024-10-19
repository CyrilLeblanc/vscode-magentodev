import * as vscode from "vscode";
import { UriDescription, UriDescriptionPhp, UriDescriptionXml } from "../type";
import { uriDescriptionPhtml } from "../type/UriDescriptionPhtml";

export default {
	/**
	 * Describe a URI
	 *
	 * @param uri {vscode.Uri}
	 * @returns {UriDescription}
	 */
	describe(uri: vscode.Uri): UriDescription {
		const relativePath = this.getRelativePath(uri);
		const fileExtension = this.getFileExtension(relativePath);

		var basicDescription = {
			vendor: this.getVendor(relativePath),
			module: this.getModule(relativePath),
			moduleRoot: this.getModuleRoot(relativePath),
			fileExtension: fileExtension,
			relativePath,
		};

		switch (fileExtension) {
			case "xml":
				return this.describeXml(relativePath, basicDescription);
			case "php":
				return this.describePhp(relativePath, basicDescription);
			case "phtml":
				return this.describePhtml(relativePath, basicDescription);
			default:
				return basicDescription;
		}
	},

	/**
	 * Get the relative path from the URI
	 *
	 * @param uri {vscode.Uri}
	 * @returns {string}
	 */
	getRelativePath(uri: vscode.Uri): string {
		const workspace = vscode.workspace.workspaceFolders;
		if (!workspace) {
			return "";
		}

		const workspacePath = workspace[0].uri.path;
		const relativePath = uri.path.replace(workspacePath + "/", "");

		return relativePath;
	},

	/**
	 * Get the file extension from a URI
	 *
	 * @param relativePath {string}
	 * @returns {string}
	 */
	getFileExtension(relativePath: string): string {
		return relativePath.split(".").pop() || "";
	},

	/**
	 * Get the vendor name from the URI
	 *
	 * @param relativePath {string}
	 * @returns {UriDescription['vendor']}
	 */
	getVendor(relativePath: string): UriDescription["vendor"] {
		const isModule = relativePath.startsWith("app/code/");
		const isTheme = relativePath.startsWith("app/design/");

		if (!isModule && !isTheme) {
			return "";
		}

		const pathParts = relativePath.split("/");

		switch (true) {
			case isModule:
				return pathParts[2];
			case isTheme:
				return pathParts[1];
			default:
				return "";
		}
	},

	/**
	 * Get the module name from the URI
	 *
	 * @param relativePath {string}
	 * @returns {UriDescription['module']}
	 */
	getModule(relativePath: string): UriDescription["module"] {
		const isModule = relativePath.startsWith("app/code/");
		const isTheme = relativePath.startsWith("app/design/");

		if (!isModule && !isTheme) {
			return "";
		}

		const pathParts = relativePath.split("/");

		switch (true) {
			case isModule:
				return pathParts[3];
			case isTheme:
				return pathParts[2];
			default:
				return "";
		}
	},

	/**
	 * Get the module root from the URI
	 *
	 * @param relativePath {string}
	 * @returns {string}
	 */
	getModuleRoot(relativePath: string): string {
		const isModule = relativePath.startsWith("app/code/");

		if (!isModule) {
			return "";
		}

		const pathParts = relativePath.split("/");
		const moduleRoot = pathParts.slice(0, 4).join("/");

		return moduleRoot;
	},

	/**
	 * Describe an XML file
	 *
	 * @param relativePath {string}
	 * @param description {UriDescription}
	 * @returns {UriDescriptionXml}
	 */
	describeXml(relativePath: string, description: UriDescription): UriDescriptionXml {
		var fileName = relativePath.split("/").pop() || "";
		var fileParts = fileName.split(".");
		fileParts.pop();
		var type = fileParts.join(".");

		return {
			...description,
			type: type as UriDescriptionXml["type"],
		};
	},

	/**
	 * Describe a PHP file
	 *
	 * @param relativePath {string}
	 * @param description {UriDescription}
	 * @returns {UriDescriptionPhp}
	 */
	describePhp(relativePath: string, description: UriDescription): UriDescriptionPhp {
		return {
			...description,
			namespace: this.getPhpNamespace(relativePath),
			className: this.getPhpClassName(relativePath),
			type: this.getPhpType(relativePath),
			fullyQualifiedName: this.getPhpFullyQualifiedName(relativePath),
		};
	},

	/**
	 * Get the PHP namespace from a URI
	 *
	 * @param relativePath {string}
	 * @returns {string}
	 */
	getPhpNamespace(relativePath: string): string {
		// only for app/code files
		if (!relativePath.startsWith("app/code/")) {
			return "";
		}
		const pathParts = relativePath.replace("app/code/", "").split("/");
		pathParts.pop();
		const namespace = pathParts.join("\\");

		return namespace.replaceAll(".php", "");
	},

	/**
	 * Get the PHP class name from a URI
	 *
	 * @param relativePath {string}
	 */
	getPhpClassName(relativePath: string): string {
		const fileName = relativePath.split("/").pop() || "";
		const fileParts = fileName.split(".");
		fileParts.pop();
		const className = fileParts.join(".");

		return className;
	},

	/**
	 * Get the PHP file type from a URI
	 *
	 * @param relativePath {string}
	 * @returns {string}
	 */
	getPhpType(relativePath: string): string {
		// handle registration.php
		if (relativePath.endsWith("/registration.php")) {
			return "registration";
		}

		// handle the rest of the files
		const pathParts = relativePath.split("/");
		const type = pathParts[4].toLowerCase();

		return type;
	},

	/**
	 * Get the fully qualified name of a PHP class
	 *
	 * @param relativePath {string}
	 * @returns {string}
	 */
	getPhpFullyQualifiedName(relativePath: string): string {
		const namespace = this.getPhpNamespace(relativePath);
		const fileName = relativePath.split("/").pop() || "";
		const fileParts = fileName.split(".");
		fileParts.pop();
		const className = fileParts.join(".");

		return namespace + "\\" + className;
	},

	/**
	 * Describe a PHTML file
	 *
	 * @param relativePath {string}
	 * @param description {UriDescription}
	 * @returns {uriDescriptionPhtml}
	 */
	describePhtml(relativePath: string, description: UriDescription): uriDescriptionPhtml {
		const type = 'template';

		return {
			...description,
			type,
		};
	}
};
