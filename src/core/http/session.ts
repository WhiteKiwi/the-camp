import { Cookie } from './cookie';

export interface Session<T = undefined> {
	cookies: Cookie[];
	extra?: T;
}
