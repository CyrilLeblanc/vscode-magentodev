import { guessClassName, guessNamespace } from "../../../helper/uriHelper";
import AbstractPhpFileFactory from "./AbstractPhpFileFactory";
import classTemplate from "../../../template/php/class";

export default class PhpClassFileFactory extends AbstractPhpFileFactory
{
	template = classTemplate;

	async getTemplateData() {
		return Object.assign(super.getTemplateData(), {
			namespace: this.getNamespace(),
			className: this.getClassName()
		});
	}

	/**
	 * Guess the class name from the uri
	 */
	protected getClassName(): string {
		return guessClassName(this.uri);
	}

	/**
	 * Guess the namespace from the uri
	 */
	protected getNamespace(): string {
		return guessNamespace(this.uri);
	}
}
