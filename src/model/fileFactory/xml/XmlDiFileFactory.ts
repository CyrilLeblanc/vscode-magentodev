import AbstractXmlFileFactory from "./AbstractXmlFileFactory";

export default class XmlDiFileFactory extends AbstractXmlFileFactory
{
	public getXmlObject(): object {
		return {
			config: {
				_attributes: {
					"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
					"xsi:noNamespaceSchemaLocation": "urn:magento:framework:ObjectManager/etc/config.xsd",
				}
			}
		};
	}
}
