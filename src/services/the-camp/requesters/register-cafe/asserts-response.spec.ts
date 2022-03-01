import { assertsResponse } from './asserts-response';
import 성공 from './test/성공.json';
import 성공_가입 from './test/성공-가입.json';
import 실패_개설전 from './test/실패-개설전.json';
import 실패_오픈대기 from './test/실패-오픈대기.json';

describe('assertsResponse', () => {
	it('성공', () => {
		expect(() => assertsResponse(성공 as any)).not.toThrow();
	});

	it('성공-가입', () => {
		expect(() => assertsResponse(성공_가입 as any)).not.toThrow();
	});

	it('실패-개설전', () => {
		expect(() => assertsResponse(실패_개설전 as any)).toThrow(
			'입영일 부터 10일 이내에 개설됩니다. (오픈카페 전체보기를 통해 확인 가능합니다.)',
		);
	});

	it('실패-오픈대기', () => {
		expect(() => assertsResponse(실패_오픈대기 as any)).toThrow(
			'훈련병 정보 대기중. 카페 개설은 되었으나 훈련병의 정보가 업데이트 되지 않아 카페 가입이 불가능합니다.(입영일부터 10일 이내 업데이트 됩니다.)',
		);
	});
});
