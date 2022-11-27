import axios, { AxiosRequestConfig } from 'axios';

import { TheCampSession } from '../../../../common/types';
import { Parameter } from '../../../../core/http';
import { Credential } from '../../../../core/types';
import { parseLogin } from './parse-login';

export class LoginRequester {
	constructor(private readonly parse = parseLogin) {}

	async request(credential: Credential): Promise<TheCampSession> {
		const response = await axios.post(
			'https://www.thecamp.or.kr/login/loginA.do',
			this.createPayload(credential),
			this.createOptions(),
		);
		return this.parse(response);
	}

	private createPayload(credential: Credential) {
		return new Parameter({
			userId: credential.id,
			userPwd: credential.password,
			state: 'email-login',
			autoLoginYn: 'Y',
			withdrawDate: '',
			withdrawReason: '',
			reCertYn: '',
			telecomCd: '',
			telecomNm: '',
			osType: '',
			osVersion: '',
			deviceModel: '',
			appVersion: '',
			deviceWidth: '',
			deviceHeight: '',
			resultCd: '',
			resultMsg: '',
			findPwType: 'pwFind',
		}).toString();
	}

	private createOptions(): AxiosRequestConfig {
		return {
			headers: {
				Accept: 'application/json, text/javascript, */*; q=0.01',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'User-Agent':
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.70 Whale/3.13.131.27 Safari/537.36',
				Host: 'www.thecamp.or.kr',
				Origin: 'https://www.thecamp.or.kr',
				Referer: 'https://www.thecamp.or.kr/login/viewLogin.do',
				'X-Requested-With': 'XMLHttpRequest',
				'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Whale";v="3"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"macOS"',
				'Sec-Fetch-Site': 'same-origin',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Dest': 'empty',
			},
		};
	}
}
export const loginRequester = new LoginRequester();
