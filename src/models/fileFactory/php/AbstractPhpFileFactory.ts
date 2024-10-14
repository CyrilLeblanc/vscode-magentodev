import AbstractFileFactory from '../AbstractFileFactory';
import template from '../../../templates/php/class';
import { UriDescriptionPhp } from '../../../types';

export default abstract class AbstractPhpFileFactory extends AbstractFileFactory
{
	protected template: string = template;

	public constructor(
		protected uriDescription: UriDescriptionPhp
	) {
		super(uriDescription);
	}

	/**
	 * @inheritdoc
	 */
	protected getTemplateData(): {[key: string]: string} {
		return {
			namespace: this.uriDescription.namespace,
			className: this.uriDescription.className
		};
	}

	/**
	 * Get the content for the file
	 */
	public create(): string {
		const data = this.getTemplateData();

		var result = this.template;
		Object.keys(data).forEach((key) => {
			const regex = new RegExp(`{{${key}}}`, 'g');
			result = result.replace(regex, data[key]);
		});

		return result;
	}
}
