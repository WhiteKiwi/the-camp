import { extractInnerTexts } from '@core/string';
import { AxiosResponse } from 'axios';

export interface FetchSoldierRawInfo {
	입영부대Code: string; // trainUnitCd
	입영부대EduId: string; // trainUnitEduSeq
	군인Code: string; // unitCd
	입영일: string; // enterDate
	생년월일: string; // birthDay
	이름: string; // name
}

export function parseSoldiers({
	data,
}: AxiosResponse<string>): FetchSoldierRawInfo[] {
	const fnCafeCreateCheckLines = extractInnerTexts(
		data,
		'javascript:fn_cafeMainLink2(',
		'보고싶은군인',
	);
	return fnCafeCreateCheckLines.map(parseSoldier);
}

// fnLine: fn_cafeCreateCheck(...)
function parseSoldier(fnLine: string): FetchSoldierRawInfo {
	const [fn_cafeMainLink2, fn_findArmyArrngmtResult] = fnLine.split(
		'javascript:fn_findArmyArrngmtResult(',
	);
	const [입영부대Code, 입영부대EduId] = fn_cafeMainLink2
		.split(');')[0]
		.replaceAll("'", '')
		.split(',');

	const [군인Code, 입영일, 생년월일, 이름] = fn_findArmyArrngmtResult
		.split(');')[0]
		.replaceAll("'", '')
		.split(',');

	return {
		입영부대Code,
		입영부대EduId,
		군인Code,
		입영일: 입영일.replaceAll('.', ''),
		생년월일,
		이름,
	};
}
