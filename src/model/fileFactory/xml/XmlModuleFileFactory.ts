import { guessModule } from "../../../helper/uriHelper";
import XmlFileFactory from "./XmlFileFactory";

export default class XmlModuleFileFactory extends XmlFileFactory
{
	async getXmlObject() {
		return {
			config: {
				_attributes: {
					"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
					"xsi:noNamespaceSchemaLocation": "urn:magento:framework:Module/etc/module.xsd",
				},
				module: {
					_attributes: {
						name: this.getModuleName(),
						setup_version: "0.0.1",
					},
					sequence: {
						module: {
							_attributes: {
								name: "Vendor_Module",
							}
						}
					}
				}
			}
		};
	}

	/**
	 * Get the module name based on the file path.
	 */
	protected getModuleName(): string
	{
		return guessModule(this.uri);
	}
}
