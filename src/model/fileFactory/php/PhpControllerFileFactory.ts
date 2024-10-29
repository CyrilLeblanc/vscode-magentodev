import PhpClassFileFactory from "./PhpClassFileFactory";
import controllerTemplate from "../../../template/php/controller";

export default class PhpControllerFileFactory extends PhpClassFileFactory
{
	template = controllerTemplate;
}
