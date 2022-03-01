import { Session } from '@core/http';
import { Credential } from '@core/types';

import { loginRequester as _loginRequester } from './requesters';

export class TheCampService {
	constructor(private readonly loginRequester = _loginRequester) {}

	async login(credential: Credential): Promise<Session> {
		return await this.loginRequester.request(credential);
	}
}
