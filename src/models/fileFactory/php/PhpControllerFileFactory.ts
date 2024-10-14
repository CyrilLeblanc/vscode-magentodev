import AbstractPhpFileFactory from "./AbstractPhpFileFactory";
import template from "../../../templates/php/controller";

export default class PhpControllerFileFactory extends AbstractPhpFileFactory
{
	template = template;
}
