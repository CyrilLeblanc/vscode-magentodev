import XmlFileFactory from "./XmlFileFactory";

export default class XmlDiFileFactory extends XmlFileFactory
{
	async getXmlObject() {
		return {
			config: {
				_attributes: {
					"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
					"xsi:noNamespaceSchemaLocation": "urn:magento:framework:ObjectManager/etc/config.xsd",
				},
				_comment: 'Put your code here'
			}
		};
	}
}
