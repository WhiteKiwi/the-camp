import { TheCampSession } from '@common/types';
import { Credential } from '@core/types';

import {
	loginRequester as _loginRequester,
	RegisterSoldierDto,
	registerSoldierRequester as _registerSoldierRequester,
} from './requesters';

export class TheCampService {
	constructor(
		private readonly loginRequester = _loginRequester,
		private readonly registerSoldierRequester = _registerSoldierRequester,
	) {}

	async login(credential: Credential): Promise<TheCampSession> {
		return await this.loginRequester.request(credential);
	}

	/**
	 * 주의: 잘못된 정보여도 성공 응답이 옴
	 */
	async registerSoldier(
		dto: RegisterSoldierDto,
		session: TheCampSession,
	): Promise<void> {
		await this.registerSoldierRequester.request(dto, session);
	}
}
export const theCampService = new TheCampService();
