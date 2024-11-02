import PhpClassFileFactory from "./PhpClassFileFactory";
import observerTemplate from "../../../template/php/observer";

export default class PhpObserverFileFactory extends PhpClassFileFactory {
    template = observerTemplate;
}