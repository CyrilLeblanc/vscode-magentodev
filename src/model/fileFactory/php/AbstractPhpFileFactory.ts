import AbstractFileFactory from '../AbstractFileFactory';

export default abstract class AbstractPhpFileFactory extends AbstractFileFactory
{
	protected template: Function = () => '';

	/**
	 * Get the content for the file
	 */
	async create() {
		return this.template(await this.getTemplateData());
	}

	/**
	 * Get the template data
	 */
	protected async getTemplateData(): Promise<any> {
		return {};
	}
}
