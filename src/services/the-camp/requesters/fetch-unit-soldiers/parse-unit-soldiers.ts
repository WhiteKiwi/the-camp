import { AxiosResponse } from 'axios';

import { extractInnerText } from '../../../../core/string';

export interface FetchUnitSoldierRawInfo {
	// 생년월일: string;
	// 이름: string;
	훈련병Id: string;
}

// 주의: 한 부대에 여러 인편 케이스 못찾음
export function parseUnitSoldiers(
	response: AxiosResponse,
): FetchUnitSoldierRawInfo[] {
	const 훈련병Id = extractInnerText(
		response.data,
		['if(', '> 0) {', "traineeMgrSeq = '"],
		"';",
	);

	return [
		{
			훈련병Id,
		},
	];
}
