import { TheCampSession } from '@common/types';
import { Parameter } from '@core/http';
import { 입영부대, 입영부대CodeMap } from '@core/types';
import axios, { AxiosRequestConfig } from 'axios';

import { assertsResponse } from './asserts-response';

export class SendLetterRequester {
	constructor(private readonly asserts = assertsResponse) {}

	async request(dto: SendLetterDto, session: TheCampSession): Promise<void> {
		const response = await axios.post(
			'https://www.thecamp.or.kr/consolLetter/insertConsolLetterA.do',
			this.createPayload(dto),
			this.createOptions(session),
		);

		this.asserts(response);
	}

	private createPayload({
		제목,
		작성자,
		내용,
		입영부대,
		입영부대EduId,
		훈련병Id,
	}: SendLetterDto): string {
		return (
			new Parameter({
				traineeMgrSeq: 훈련병Id,
				sympathyLetterSubject: '#제목#제목#제목#제목#',
				sympathyLetterContent: this.createLetterContent(작성자, 내용),
				trainUnitCd: 입영부대CodeMap[입영부대],
				trainUnitEduSeq: 입영부대EduId,
				boardDiv: 'sympathyLetter',
				tempSaveYn: 'N',
				sympathyLetterEditorFileGroupSeq: '',
				fileGroupMgrSeq: '',
				fileMgrSeq: '',
				sympathyLetterMgrSeq: '',
			})
				.toString()
				// 제목은 공백을 +로 치환해야함 일단 하드코딩딩딩
				.replace(
					encodeURIComponent('#제목#제목#제목#제목#'),
					제목.trim().split(' ').map(encodeURIComponent).join('+'),
				)
		);
	}

	private createLetterContent(작성자: string, 내용: string): string {
		return (
			`<p>작성자: ${작성자}</p>` +
			내용
				.split('\n')
				.map((line) => `<p>${line.trim() || '&nbsp;'}</p>`)
				.join('')
		).replaceAll(' ', '&nbsp;');
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
export interface SendLetterDto {
	제목: string;
	작성자: string;
	내용: string;
	입영부대: 입영부대;
	// trainUnitEduSeq
	입영부대EduId: string;
	// traineeMgrSeq
	훈련병Id: string;
}

export const sendLetterRequester = new SendLetterRequester();
