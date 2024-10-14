import AbstractPhpFileFactory from "./AbstractPhpFileFactory";
import template from '../../../templates/php/class';

export default class PhpClassFileFactory extends AbstractPhpFileFactory {
	template = template;
}
