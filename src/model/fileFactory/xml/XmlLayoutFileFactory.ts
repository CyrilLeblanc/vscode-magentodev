import * as vscode from 'vscode';
import XmlFileFactory from "./XmlFileFactory";

export default class XmlLayoutFileFactory extends XmlFileFactory
{
	async getXmlObject() {
		const layoutType = await this.askForLayoutType();

		return {
			config: {
				_attributes: {
					"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
					"layout": layoutType,
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

	/**
	 * Ask for layout type
	 */
	protected async askForLayoutType(): Promise<string|undefined> {
		return vscode.window.showQuickPick([
			{
				label: '1column',
				description: 'One column layout'
			},
			{
				label: '2columns-left',
				description: 'Two columns layout with left bar'
			},
			{
				label: '2columns-right',
				description: 'Two columns layout with right bar'
			},
			{
				label: '3columns',
				description: 'Three columns layout'
			},
			{
				label: 'empty',
				description: 'Empty layout'
			}
		], {
			placeHolder: 'Select layout type'
		}).then((selected) => {
			if (selected) {
				return selected.label;
			}
		});
	}

}
