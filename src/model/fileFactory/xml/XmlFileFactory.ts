import AbstractFileFactory from "../AbstractFileFactory";
import { js2xml } from "xml-js";

export default class XmlFileFactory extends AbstractFileFactory
{
	/**
	 * Create the file content
	 */
	public async create() {
		const xmlObject = await this.getXmlObject();
		
		return js2xml(
			{
				_declaration: {
					_attributes: {
						version: "1.0", encoding: "utf-8"
					},
				},
				...xmlObject
			},
			{ spaces: 4, compact: true }
		);
	}

	/**
	 * Get the XML object
	 */
	public async getXmlObject(): Promise<object> {
		return {};
	}
}
