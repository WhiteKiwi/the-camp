import axios, { AxiosRequestConfig } from 'axios';

import { TheCampSession } from '../../../../common/types';
import { Parameter } from '../../../../core/http';
import {
	관계,
	관계CodeMap,
	군종,
	군종CodeMap,
	성분,
	성분CodeMap,
	입영부대,
	입영부대CodeMap,
} from '../../../../core/types';
import { assertsResponse } from './asserts-response';

export class RegisterSoldierRequester {
	constructor(private readonly asserts = assertsResponse) {}

	async request(
		dto: RegisterSoldierDto,
		session: TheCampSession,
	): Promise<void> {
		const response = await axios.post(
			'https://www.thecamp.or.kr/missSoldier/insertDirectMissSoldierA.do',
			this.createPayload(dto, session),
			this.createOptions(session),
		);
		this.asserts(response);
	}

	private createPayload(
		{
			성분,
			군종,
			이름,
			입영부대,
			관계,
			생년월일,
			입영일,
			전화번호,
		}: RegisterSoldierDto,
		session: TheCampSession,
	): string {
		return new Parameter({
			iuid: session.extra?.IUID || '',
			missSoldierClassCdNm: 성분,
			missSoldierClassCd: 성분CodeMap[성분],
			grpCdNm: 군종,
			grpCd: 군종CodeMap[군종],
			trainUnitCd: 입영부대CodeMap[입영부대],
			missSoldierRelationshipCd: 관계CodeMap[관계],
			name: 이름,
			birth: 생년월일,
			enterDate: 입영일,
			phoneNo: 전화번호 || '',
			countryCode: '39|+82',
			normalUnitCd: '',
			normalUnitNm: '',
			soldierClassCd: '',
		}).toString();
	}

	private createOptions(session: TheCampSession): AxiosRequestConfig {
		return {
			headers: {
				Accept: 'application/json, text/javascript, */*; q=0.01',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'User-Agent':
					' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.70 Whale/3.13.131.27 Safari/537.36',
				Host: 'www.thecamp.or.kr',
				Origin: 'https://www.thecamp.or.kr',
				Referer:
					' https://www.thecamp.or.kr/missSoldier/viewMissSoldierSearch.do',
				'X-Requested-With': 'XMLHttpRequest',
				'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Whale";v="3"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"macOS"',
				'Sec-Fetch-Site': 'same-origin',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Dest': 'empty',
				Cookie: session.cookies
					.map(({ key, value }) => `${key}=${value}`)
					.join('; '),
			},
		};
	}
}

export interface RegisterSoldierDto {
	성분: 성분;
	군종: 군종;
	관계: 관계;
	입영부대: 입영부대;
	이름: string;
	생년월일: string; // yyyy-MM-dd
	입영일: string; // yyyy-MM-dd
	전화번호?: string;
}
export const registerSoldierRequester = new RegisterSoldierRequester();
