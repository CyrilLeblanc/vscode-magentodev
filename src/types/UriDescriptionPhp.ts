import { UriDescription } from "./UriDescription";

export type UriDescriptionPhp = UriDescription & {
	namespace: string;
	className: string;
	type: 'api' | 'block' | 'controller' | 'cron' | 'helper' | 'model' | 'observer' | 'plugin' | 'setup' | 'ui_component' | string;
	fullyQualifiedName: string;
};
