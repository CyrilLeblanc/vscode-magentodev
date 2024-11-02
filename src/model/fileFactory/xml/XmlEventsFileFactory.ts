import XmlFileFactory from './XmlFileFactory';

export default class XmlEventsFileFactory extends XmlFileFactory {
	async getXmlObject() {
		return {
			config: {
				_attributes: {
					'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
					'xsi:noNamespaceSchemaLocation': 'urn:magento:framework:Event/etc/events.xsd',
				},
				_comment: 'Put your code here',
			},
		};
	}
}
