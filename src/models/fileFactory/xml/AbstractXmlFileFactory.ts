import { UriDescriptionXml } from "../../../types";
import AbstractFileFactory from "../AbstractFileFactory";
import { js2xml } from "xml-js";

export default abstract class AbstractXmlFileFactory extends AbstractFileFactory
{
	public constructor(
		protected uriDescription: UriDescriptionXml
	) {
		super(uriDescription);
	}

	/**
	 * Create the file content
	 *
	 * @returns {string}
	 */
	public create(): string {
		return js2xml(
			{
				_declaration: {
					_attributes: {
						version: "1.0", encoding: "utf-8"
					},
				},
				...this.getXmlObject()
			},
			{ spaces: 4, compact: true }
		);
	}

	/**
	 * Get the XML object
	 *
	 * @returns {object}
	 */
	public getXmlObject(): object {
		return {};
	}
}
