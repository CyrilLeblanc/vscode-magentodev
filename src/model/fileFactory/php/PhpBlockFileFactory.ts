import PhpClassFileFactory from "./PhpClassFileFactory";
import blockTemplate from "../../../template/php/block";

export default class PhpBlockFileFactory extends PhpClassFileFactory
{
	template = blockTemplate;
}
