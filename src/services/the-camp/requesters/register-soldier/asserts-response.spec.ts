import { assertsResponse } from './asserts-response';
import 성공_신규등록 from './test/성공-신규등록.json';
import 성공_이미등록된군인 from './test/성공-이미등록된군인.json';

describe('assertsResponse', () => {
	it('성공-신규등록', () => {
		expect(() => assertsResponse(성공_신규등록 as any)).not.toThrow();
	});

	it('성공-이미등록된군인', () => {
		expect(() => assertsResponse(성공_이미등록된군인 as any)).not.toThrow();
	});

	it('실패', () => {
		expect(() =>
			assertsResponse({
				data: {
					resultCd: '-1',
					resultMsg: '알 수 없는 오류가 발생하였습니다.',
				},
			} as any),
		).toThrow('알 수 없는 오류가 발생하였습니다.');
	});
});
