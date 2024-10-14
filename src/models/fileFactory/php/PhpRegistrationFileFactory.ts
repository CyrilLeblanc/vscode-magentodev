import AbstractPhpFileFactory from "./AbstractPhpFileFactory";
import template from "../../../templates/php/registration";
export default class PhpRegistrationFileFactory extends AbstractPhpFileFactory {

	template = template;

	protected getTemplateData(): {[key: string]: string} {
		return {
			vendor: this.uriDescription.vendor,
			module: this.uriDescription.module
		};
	}
}
