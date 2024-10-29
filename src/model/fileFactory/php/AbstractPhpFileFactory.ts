import AbstractFileFactory from '../AbstractFileFactory';

export default abstract class AbstractPhpFileFactory extends AbstractFileFactory
{
	protected template: Function = () => '';

	/**
	 * Get the content for the file
	 *
	 * @returns {string}
	 */
	public create(): string {
		return this.template(this.getTemplateData());
	}

	/**
	 * Get the template data
	 *
	 * @returns {any}
	 */
	protected getTemplateData(): any {
		return {};
	}
}
