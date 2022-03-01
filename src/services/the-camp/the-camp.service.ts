import { TheCampSession } from '@common/types';
import { Credential } from '@core/types';

import { loginRequester as _loginRequester } from './requesters';

export class TheCampService {
	constructor(private readonly loginRequester = _loginRequester) {}

	async login(credential: Credential): Promise<TheCampSession> {
		return await this.loginRequester.request(credential);
	}
}
