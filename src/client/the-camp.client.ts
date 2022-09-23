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
	constructor(private readonly credential: Credential) {}

	private session?: TheCampSession;
	private async fetchSession(): Promise<TheCampSession> {
		if (!this.session) {
			this.session = await this.theCampService.login(this.credential);
		}
		return this.session;
	}

	async registerSoldier(
		soldierInfo: SoldierInfo,
	): Promise<{ soldierId: string }> {
		const session = await this.fetchSession();
		await this.theCampService.registerSoldier(soldierInfo, session);
		const soldiers = await this.theCampService.fetchSoldiers(session);

		for (const soldier of soldiers) {
			// 카페 가입되어 있으면 스킵
			if (soldier.hasCafe) continue;
			// 가입 안되어있으면 가입시켜~~
			await this.theCampService.registerCafe(
				{
					...soldierInfo,
					정렬번호: soldier.정렬번호,
					입영부대TypeCode: soldier.입영부대TypeCode,
				},
				session,
			);
		}

		const cafeRegisteredSoldiers = await this.theCampService.fetchSoldiers(
			session,
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
			session,
		);

		const soldierId = this.createSoldierId({
			훈련병Id,
			입영부대: soldierInfo.입영부대,
			입영부대EduId: soldier.입영부대EduId,
		});
		return { soldierId };
	}

	async sendLetter(soldierId: string, letterInfo: LetterInfo): Promise<void> {
		const soldierIdentifier = this.parseSoldierId(soldierId);
		const session = await this.fetchSession();
		await this.theCampService.sendLetter(
			{ ...soldierIdentifier, ...letterInfo },
			session,
		);
	}

	private createSoldierId({
		입영부대,
		입영부대EduId,
		훈련병Id,
	}: SoldierIdentifier): string {
		return `${입영부대}-${입영부대EduId}-${훈련병Id}`;
	}

	private parseSoldierId(soldierId: string): SoldierIdentifier {
		const [입영부대, 입영부대EduId, 훈련병Id] = soldierId.split('-');
		// TODO: validation
		return {
			입영부대: 입영부대 as 입영부대,
			입영부대EduId,
			훈련병Id,
		};
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
