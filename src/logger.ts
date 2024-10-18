import * as vscode from 'vscode';

const channel = vscode.window.createOutputChannel('Magento Dev');

export default class Logger {
	public static write(message: string, level: string): void {
		const date = new Date();
		const time =
			date.getHours() +
			":" +
			date.getMinutes() +
			":" +
			date.getSeconds() +
			"." +
			date.getMilliseconds();
		const content = `${time} [${level}] ${message}`;
		channel.append(content + '\n');
		console.debug('[magentodev] ' + content);
	}

	public static log(message: string): void {
		Logger.write(message, 'LOG');
	}

	public static error(message: string): void {
		Logger.write(message, 'ERROR');
		vscode.window.showErrorMessage(message);
	}

	public static info(message: string): void {
		Logger.write(message, 'INFO');
	}

	public static warn(message: string): void {
		Logger.write(message, 'WARN');
	}
}
