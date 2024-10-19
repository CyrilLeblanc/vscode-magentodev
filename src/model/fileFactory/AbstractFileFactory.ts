import { UriDescription } from '../../type';

export default abstract class AbstractFileFactory {
	protected template: string = '';

	public constructor(
		protected uriDescription: UriDescription
	) {
	}

	public abstract create(): string;
}
