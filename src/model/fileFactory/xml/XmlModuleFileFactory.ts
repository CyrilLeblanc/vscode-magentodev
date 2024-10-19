import AbstractXmlFileFactory from "./AbstractXmlFileFactory";

export default class XmlModuleFileFactory extends AbstractXmlFileFactory
{
	public getXmlObject(): object {
		return {
			config: {
				_attributes: {
					"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
					"xsi:noNamespaceSchemaLocation": "urn:magento:framework:Module/etc/module.xsd",
				},
				module: {
					_attributes: {
						name: this.uriDescription.vendor + "_" + this.uriDescription.module,
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
}
