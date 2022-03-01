import { TheCampClient } from './the-camp.client';

describe.skip('TheCampClient e2e', () => {
	it('성공', async () => {
		const theCampClient = new TheCampClient();

		await theCampClient.login({
			id: '',
			password: '',
		});

		await theCampClient.sendLetter(
			{
				성분: '예비군인/훈련병',
				군종: '육군',
				이름: '홍길동',
				입영부대: '육군훈련소-논산',
				관계: '팬',
				생년월일: '2001-01-01',
				입영일: '2022-02-14',
				전화번호: '01012341234',

				생년월일Code: '08IyuIy6/tXS/vveGiNc+Q==',
				입영부대TypeCode: '0000140001',
				입영부대EduId: '',
				훈련병Id: '',
			},
			{
				작성자: '장지훈',
				제목: `내용은 곧 제목`,
				내용: `제목은
				곧
				내용`,
			},
		);
	});
});
