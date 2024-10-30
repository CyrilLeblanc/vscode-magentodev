import XmlFileFactory from "./XmlFileFactory";

export default class XmlLayoutFileFactory extends XmlFileFactory
{
	public getXmlObject(): object {
		return {
			config: {
				_attributes: {
					"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
					"layout": "1column",
					"xsi:noNamespaceSchemaLocation": "urn:magento:framework:View/Layout/etc/page_configuration.xsd",
				},
				body: {
					referenceContainer: {
						_attributes: {
							name: "content"
						},
						_comment: 'Put your code here'
					}
				}
			}
		};
	}
}
