import { TheCampSession } from '@common/types';
import {
	Credential,
	관계,
	군종,
	성분,
	입영부대,
	입영부대CodeMap,
} from '@core/types';

import { TheCampService } from '../services/the-camp';

export class TheCampClient {
	private readonly theCampService: TheCampService = new TheCampService();
	private session!: TheCampSession;

	async login(credential: Credential): Promise<void> {
		this.session = await this.theCampService.login(credential);
	}

	async registerSoldier(soldierInfo: SoldierInfo): Promise<SoldierIdentifier> {
		if (!this.isLoggedIn()) {
			throw new Error('로그인 후에 군인등록이 가능합니다.');
		}

		await this.theCampService.registerSoldier(soldierInfo, this.session);
		const soldiers = await this.theCampService.fetchSoldiers(this.session);

		for (const soldier of soldiers) {
			// 카페 가입되어 있으면 스킵
			if (soldier.hasCafe) continue;
			// 가입 안되어있으면 가입시켜~~
			await this.theCampService.registerCafe(
                	{ ...soldierInfo, 정렬번호: soldier.정렬번호, 입영부대TypeCode: soldier.입영부대TypeCode,  },
				this.session,
			);
		}

		const cafeRegisteredSoldiers = await this.theCampService.fetchSoldiers(
			this.session,
		);
		const soldier = cafeRegisteredSoldiers
			.filter((soldier) => soldier.hasCafe)
			.find((soldier) => {
				if (soldier.이름 !== soldierInfo.이름) {
					return false;
				}
				if (soldier.입영부대Code !== 입영부대CodeMap[soldierInfo.입영부대]) {
					return false;
				}
				if (soldier.입영일 !== soldierInfo.입영일) {
					return false;
				}
				return true;
			});

		if (!soldier || !soldier.hasCafe) {
			throw new Error('군인의 카페가 개설되지 않았습니다.');
		}

		const [{ 훈련병Id }] = await this.theCampService.fetchUnitSoldiers(
			{
				입영부대Code: soldier.입영부대Code,
				입영부대EduId: soldier.입영부대EduId,
			},
			this.session,
		);

		return {
			훈련병Id,
			입영부대: soldierInfo.입영부대,
			입영부대EduId: soldier.입영부대EduId,
		};
	}

	async sendLetter(
		soldierIdentifier: SoldierIdentifier,
		letterInfo: LetterInfo,
	): Promise<void> {
		if (!this.isLoggedIn()) {
			throw new Error('로그인 후에 위문편지 전송이 가능합니다.');
		}

		await this.theCampService.sendLetter(
			{ ...soldierIdentifier, ...letterInfo },
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
}

export interface SoldierIdentifier {
	입영부대: 입영부대;
	입영부대EduId: string;
	훈련병Id: string;
}
export interface LetterInfo {
	제목: string;
	내용: string;
	작성자: string;
}
