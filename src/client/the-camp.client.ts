import { TheCampSession } from '@common/types';
import { Credential, 관계, 군종, 성분, 입영부대 } from '@core/types';

import { TheCampService } from '../services/the-camp';

export class TheCampClient {
	private readonly theCampService: TheCampService = new TheCampService();
	private session!: TheCampSession;

	async login(credential: Credential): Promise<void> {
		this.session = await this.theCampService.login(credential);
	}

	async sendLetter(
		soldierInfo: SoldierInfo,
		letterInfo: LetterInfo,
	): Promise<void> {
		if (!this.isLoggedIn()) {
			throw new Error('로그인 후에 위문편지 전송이 가능합니다.');
		}

		// TODO: soldierInfo를 1회만 만들어서 재사용 할 수 있는 방법 생각하여 registerSoldier, registerCafe를 sendLetter에서 분리하기
		await this.theCampService.registerSoldier(soldierInfo, this.session);
		await this.theCampService.registerCafe(soldierInfo, this.session);

		await this.theCampService.sendLetter(
			{ ...soldierInfo, ...letterInfo },
			this.session,
		);
	}

	isLoggedIn(): boolean {
		return Boolean(this.session);
	}
}

export interface SoldierInfo {
	성분: 성분;
	군종: 군종;
	관계: 관계;
	입영부대: 입영부대;

	이름: string;
	생년월일: string; // yyyy-MM-dd
	입영일: string; // yyyy-MM-dd
	전화번호?: string;

	// TODO: 아래 필드들 사이트에서 fetch 하도록 작업
	생년월일Code: string;
	입영부대TypeCode: string;

	입영부대EduId: string;
	훈련병Id: string;
}

export interface LetterInfo {
	제목: string;
	내용: string;
	작성자: string;
}
