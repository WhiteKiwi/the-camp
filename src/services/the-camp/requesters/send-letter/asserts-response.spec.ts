import { assertsResponse } from './asserts-response';
import 성공 from './test/성공.json';

describe('assertsResponse', () => {
	it('성공', () => {
		expect(() => assertsResponse(성공 as any)).not.toThrow();
	});

	it('실패', () => {
		expect(() =>
			assertsResponse({
				data: {
					resultCd: '-1',
				},
			} as any),
		).toThrow('알 수 없는 오류가 발생하였습니다.');
	});
});
