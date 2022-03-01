import { Cookie, Session } from '@core/http';
import { AxiosResponse } from 'axios';

export function parseLogin(response: AxiosResponse): Session {
	assertsResponse(response);

	const cookies: Cookie[] = [];
	const setCookie = response.headers['set-cookie'];
	// TODO: asserts

	if (!setCookie?.length) {
		throw new Error('');
	}

	for (const cookie of setCookie) {
		const [key, value] = cookie.split(';')[0].split('=');
		cookies.push({ key, value });
	}

	return { cookies };
}

function assertsResponse(response: any) {
	if (response.data.resultCd === '9000')
		throw new Error('가입된 계정이 아닙니다. 회원가입 후 이용해주세요.');

	if (response.data.resultCd === '9001')
		throw new Error('이메일 또는 비밀번호가 맞지 않습니다.');

	if (response.data.resultCd !== '0000')
		throw new Error(
			response.data?.resultMsg || '알 수 없는 오류가 발생하였습니다',
		);
}
