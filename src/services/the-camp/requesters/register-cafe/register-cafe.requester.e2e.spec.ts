import { loginRequester } from '../login';
import { registerCafeRequester } from './register-cafe.requester';

describe.skip('RegisterCafeRequester e2e', () => {
	it('성공', async () => {
		const session = await loginRequester.request({
			id: process.env.ID!,
			password: process.env.PASSWORD!,
		});
		await registerCafeRequester.request(
			{
                정렬번호: '1',
				이름: '홍길동',
				생년월일: '2001-01-01',
				입영일: '2022-02-14',
				군종: '육군',
				입영부대: '육군훈련소-논산',
				입영부대TypeCode: '0000140001',
				관계: '배우자',
			},
			session,
		);
	});
});
