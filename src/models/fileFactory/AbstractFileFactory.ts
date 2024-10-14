import { UriDescription } from '../../types';

export default abstract class AbstractFileFactory {
	protected template: string = '';

	public constructor(
		protected uriDescription: UriDescription
	) {
	}

	public abstract create(): string;
}
