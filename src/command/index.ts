import * as vscode from 'vscode';
import overrideInTheme from './overrideInTheme';
import reindexAll from './reindexAll';

/**
 * The list of commands.
 *
 * The key is the command id without the "magentodev." prefix,
 * and the value is the handler function.
 */
const commands = {
	overrideInTheme,
	reindexAll,
};

/**
 * The prefix for all commands.
 */
const COMMAND_ID_PREFIX = 'magentodev.';

export default function registerCommands(context: vscode.ExtensionContext) {
	Object.entries(commands).forEach(([command, handler]) => {
		const commandId = COMMAND_ID_PREFIX + command;
		context.subscriptions.push(
			vscode.commands.registerCommand(commandId, handler)
		);
	});
}
