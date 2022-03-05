import { extractInnerTexts } from '@core/string';
import { AxiosResponse } from 'axios';

export type FetchSoldierRawInfo =
	| {
			hasCafe: true;
			입영부대Code: string; // trainUnitCd
			입영부대EduId: string; // trainUnitEduSeq
			군인Code: string; // unitCd
			입영일: string; // enterDate
			생년월일yyyyMMdd_CanBeEncoded: string; // birthDay
			이름: string; // name
	  }
	| {
			hasCafe: false;
			정렬번호: string; // regOrder
			이름: string; // name
			입영일: string; // enterDate
			생년월일yyyyMMdd_CanBeEncoded: string; // birth
			입영부대TypeCode: string; // trainUnitTypeCd
			입영부대Code: string; // trainUnitCd
			군종Code: string; // grpCd
			관계Code: string; // traineeRelationshipCd;
	  };

export function parseSoldiers({
	data,
}: AxiosResponse<string>): FetchSoldierRawInfo[] {
	const soldiersCafeHas = parseSoldiersCafeHas(data);
	const soldiersCafeHasNot = parseSoldiersCafeHasNot(data);
	return soldiersCafeHas.concat(soldiersCafeHasNot);
}

function parseSoldiersCafeHas(body: string): FetchSoldierRawInfo[] {
	const fn_cafeMainLinkLines = extractInnerTexts(
		body,
		'javascript:fn_cafeMainLink2(',
		'보고싶은군인',
	);
	return fn_cafeMainLinkLines.map(parseSoldierCafeHas);
}

// fnLine: fn_cafeCreateCheck(...)
function parseSoldierCafeHas(fnLine: string): FetchSoldierRawInfo {
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
		hasCafe: true,
		입영부대Code,
		입영부대EduId,
		군인Code,
		입영일: 입영일.replaceAll('.', '-'),
		생년월일yyyyMMdd_CanBeEncoded: 생년월일,
		이름,
	};
}

function parseSoldiersCafeHasNot(body: string): FetchSoldierRawInfo[] {
	const fnCafeCreateCheckLines = extractInnerTexts(
		body,
		'javascript:fn_cafeCreateCheck(',
		');',
	);
	return fnCafeCreateCheckLines.map(parseSoldierCafeHasNot);
}

function parseSoldierCafeHasNot(fnLine: string): FetchSoldierRawInfo {
	const [
		정렬번호,
		이름,
		입영일,
		생년월일CanBeEncoded,
		입영부대TypeCode,
		입영부대Code,
		군종Code,
		관계Code,
	] = fnLine.replaceAll("'", '').split(',');

	return {
		hasCafe: false,
		정렬번호,
		이름,
		입영일: 입영일.replaceAll('.', '-'),
		생년월일yyyyMMdd_CanBeEncoded: 생년월일CanBeEncoded,
		입영부대TypeCode,
		입영부대Code,
		군종Code,
		관계Code,
	};
}
