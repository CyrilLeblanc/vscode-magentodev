import AbstractPhpFileFactory from "./AbstractPhpFileFactory";

export default class PhpRegistrationFileFactory extends AbstractPhpFileFactory {

	protected getTemplateData(): {[key: string]: string} {
		return {
			vendor: this.uriDescription.vendor,
			module: this.uriDescription.module
		};
	}
}
