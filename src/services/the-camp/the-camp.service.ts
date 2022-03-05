import { TheCampSession } from '@common/types';
import { Credential } from '@core/types';

import {
	FetchSoldierDto,
	FetchSoldierRawInfo,
	fetchSoldiersRequester as _fetchSoldiersRequester,
	FetchUnitSoldierRawInfo,
	fetchUnitSoldiersRequester as _fetchSoldierRequester,
	loginRequester as _loginRequester,
	RegisterCafeDto,
	registerCafeRequester as _registerCafeRequester,
	RegisterSoldierDto,
	registerSoldierRequester as _registerSoldierRequester,
	SendLetterDto,
	sendLetterRequester as _sendLetterRequester,
} from './requesters';

export class TheCampService {
	constructor(
		private readonly loginRequester = _loginRequester,
		private readonly registerSoldierRequester = _registerSoldierRequester,
		private readonly registerCafeRequester = _registerCafeRequester,
		private readonly fetchSoldiersRequester = _fetchSoldiersRequester,
		private readonly fetchSoldierRequester = _fetchSoldierRequester,
		private readonly sendLetterRequester = _sendLetterRequester,
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

	async registerCafe(
		dto: RegisterCafeDto,
		session: TheCampSession,
	): Promise<void> {
		await this.registerCafeRequester.request(dto, session);
	}

	async fetchSoldiers(session: TheCampSession): Promise<FetchSoldierRawInfo[]> {
		return await this.fetchSoldiersRequester.request(session);
	}

	// 주의: 한 부대에 여러 인편 케이스 못찾음
	async fetchUnitSoldiers(
		dto: FetchSoldierDto,
		session: TheCampSession,
	): Promise<FetchUnitSoldierRawInfo> {
		// TODO: 한 부대에 여러 인편 케이스 찾아서 대응하기
		const soldiers = await this.fetchSoldierRequester.request(dto, session);
		return soldiers[0];
	}

	async sendLetter(dto: SendLetterDto, session: TheCampSession): Promise<void> {
		await this.sendLetterRequester.request(dto, session);
	}
}
export const theCampService = new TheCampService();
