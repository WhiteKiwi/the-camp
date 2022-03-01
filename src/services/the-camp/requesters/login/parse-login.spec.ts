import { parseLogin } from './parse-login';
import 성공 from './test/성공.json';
import 실패_credentail from './test/실패-credentail.json';
import 실패_가입회원아님 from './test/실패-가입회원아님.json';

describe('parseLogin', () => {
	it('성공', () => {
		const cookies = parseLogin(성공 as any);

		expect(cookies).toEqual([
			{ key: 'userId', value: 'paul2314%40naver.com' },
			{ key: 'Token', value: 'sUl%2B4ShTmCqsX%2BXtf7X8MQ%3D%3D' },
			{ key: 'iuid', value: '5302760' },
			{
				key: 'nickname',
				value: '%EC%A0%95%EC%9B%90%EB%B0%B0_%28%EC%9D%BC%EB%B0%98%29',
			},
			{ key: 'name', value: '%EC%A0%95%EC%9B%90%EB%B0%B0' },
			{ key: 'memberGradeCd', value: '0000340003' },
			{ key: 'userId', value: 'paul2314%40naver.com' },
			{ key: 'checkAutoLogin', value: 'off' },
			{ key: 'checkSaveId', value: 'off' },
		]);
	});

	it('실패_credentail', () => {
		expect(() => parseLogin(실패_credentail as any)).toThrow(
			'이메일 또는 비밀번호가 맞지 않습니다.',
		);
	});

	it('실패_가입회원아님', () => {
		expect(() => parseLogin(실패_가입회원아님 as any)).toThrow(
			'가입된 계정이 아닙니다. 회원가입 후 이용해주세요.',
		);
	});
});
