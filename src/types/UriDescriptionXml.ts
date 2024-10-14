import { UriDescription } from "./UriDescription";

export type UriDescriptionXml = UriDescription & {
	type: 'module' | 'config' | 'layout' | 'di' | string;
};
