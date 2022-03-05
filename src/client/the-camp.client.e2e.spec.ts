import { TheCampClient } from './the-camp.client';

describe('TheCampClient e2e', () => {
	it('성공', async () => {
		const theCampClient = new TheCampClient();

		await theCampClient.login({
			id: process.env.ID!,
			password: process.env.PASSWORD!,
		});

		const soldierIdentifier = await theCampClient.registerSoldier({
			성분: '예비군인/훈련병',
			군종: '육군',
			이름: '홍길동',
			입영부대: '육군훈련소-논산',
			관계: '팬',
			생년월일: '2001-11-26',
			입영일: '2022-02-14',
			전화번호: '01094862564',
		});

		await theCampClient.sendLetter(soldierIdentifier, {
			작성자: '장지훈',
			제목: `내용은 곧 제목22`,
			내용: `제목은 곧 내용`,
		});
	});
});
