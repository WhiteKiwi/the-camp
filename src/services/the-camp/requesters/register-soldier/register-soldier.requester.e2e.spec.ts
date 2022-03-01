import { loginRequester } from '../login';
import { registerSoldierRequester } from './register-soldier.requester';

describe.skip('RegisterSoldierRequester e2e', () => {
	it('성공', async () => {
		const session = await loginRequester.request({
			id: '',
			password: '',
		});
		await registerSoldierRequester.request(
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
	});
});
