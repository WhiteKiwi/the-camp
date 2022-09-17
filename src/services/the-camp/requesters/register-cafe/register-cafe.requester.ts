import { TheCampSession } from '@common/types';
import { Parameter } from '@core/http';
import {
	관계,
	관계CodeMap,
	군종,
	군종CodeMap,
	입영부대,
	입영부대CodeMap,
} from '@core/types';
import axios, { AxiosRequestConfig } from 'axios';

import { assertsResponse } from './asserts-response';

export class RegisterCafeRequester {
	constructor(private readonly asserts = assertsResponse) {}

	async request(dto: RegisterCafeDto, session: TheCampSession): Promise<void> {
		const response = await axios.post(
			'https://www.thecamp.or.kr/main/cafeCreateCheckA.do',
			this.createPayload(dto),
			this.createOptions(session),
		);

		this.asserts(response);
	}

	private createPayload({
        정렬번호,
		이름,
		군종,
		관계,
		입영부대,
		입영일,
		생년월일,
		입영부대TypeCode,
	}: RegisterCafeDto): string {
		return new Parameter({
			regOrder: 정렬번호,
			name: 이름,
			enterDate: 입영일.replaceAll('-', ''),
			birth: 생년월일.replaceAll('-', ''),
			trainUnitTypeCd: 입영부대TypeCode,
			trainUnitCd: 입영부대CodeMap[입영부대],
			grpCd: 군종CodeMap[군종],
			traineeRelationshipCd: 관계CodeMap[관계],
		}).toString();
	}


	private createOptions(session: TheCampSession): AxiosRequestConfig {
		return {
			headers: {
				Accept: 'application/json, text/javascript, */*; q=0.01',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest',
				'User-Agent':
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.70 Whale/3.13.131.27 Safari/537.36',
				Host: 'www.thecamp.or.kr',
				Origin: 'https://www.thecamp.or.kr',
				Referer: 'https://www.thecamp.or.kr/eduUnitCafe/viewEduUnitCafeMain.do',
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
export interface RegisterCafeDto {
    정렬번호: string;
	이름: string;
	입영부대: 입영부대;
	군종: 군종;
	관계: 관계;
	// yyyy-MM-dd
	입영일: string;

	생년월일: string;
	입영부대TypeCode: string;
}

export const registerCafeRequester = new RegisterCafeRequester();
