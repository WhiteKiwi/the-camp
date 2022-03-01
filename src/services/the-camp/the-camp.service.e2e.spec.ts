import { theCampService } from './the-camp.service';

describe.skip('TheCampService e2e', () => {
	it('성공', async () => {
		const session = await theCampService.login({
			id: '',
			password: '',
		});
		await theCampService.registerSoldier(
			{
				성분: '예비군인/훈련병',
				군종: '육군',
				이름: '홍길동',
				입영부대: '육군훈련소-논산',
				관계: '팬',
				생년월일: '2001-01-01',
				입영일: '2022-02-14',
				전화번호: '01012341234',
			},
			session,
		);
		await theCampService.registerCafe(
			{
				이름: '홍길동',
				생년월일Code: '08IyuIy6/tXS/vveGiNc+Q==',
				입영일: '2022-02-14',
				군종: '육군',
				입영부대: '육군훈련소-논산',
				입영부대TypeCode: '0000140001',
				관계: '배우자',
			},
			session,
		);
		await theCampService.sendLetter(
			{
				제목: '내용은 곧 제목',
				작성자: '장지훈',
				내용: `하이 요즘 뭐해
				바쁘니
				자니 메롱
				냠냠`,
				입영부대: '육군훈련소-논산',
				입영부대EduId: '',
				훈련병Id: '',
			},
			session,
		);
	});
});
