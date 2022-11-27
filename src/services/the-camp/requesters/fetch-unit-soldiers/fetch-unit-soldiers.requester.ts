import axios, { AxiosRequestConfig } from 'axios';

import { TheCampSession } from '../../../../common/types';
import { Parameter } from '../../../../core/http';
import {
	FetchUnitSoldierRawInfo,
	parseUnitSoldiers,
} from './parse-unit-soldiers';

export class FetchUnitSoldiersRequester {
	constructor(private readonly parse = parseUnitSoldiers) {}

	async request(
		dto: FetchSoldierDto,
		session: TheCampSession,
	): Promise<FetchUnitSoldierRawInfo[]> {
		const response = await axios.post(
			'https://www.thecamp.or.kr/consolLetter/viewConsolLetterMain.do',
			this.createPayload(dto),
			this.createOptions(session),
		);

		return this.parse(response);
	}

	private createPayload({
		입영부대Code,
		입영부대EduId,
	}: FetchSoldierDto): string {
		return new Parameter({
			trainUnitCd: 입영부대Code,
			trainUnitEduSeq: 입영부대EduId,
			divType: '1',
			noticeMgrSeq: '',
			trainUnitTypeCd: '',
			trainCafeContentSeq: '',
			enterPageType: 'main',
		}).toString();
	}

	private createOptions(session: TheCampSession): AxiosRequestConfig {
		return {
			headers: {
				Accept:
					'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
				'Content-Type': 'application/x-www-form-urlencoded',
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
export interface FetchSoldierDto {
	입영부대Code: string;
	입영부대EduId: string;
}

export const fetchUnitSoldiersRequester = new FetchUnitSoldiersRequester();
