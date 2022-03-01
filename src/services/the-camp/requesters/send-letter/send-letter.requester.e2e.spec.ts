import { loginRequester } from '../login';
import { sendLetterRequester } from './send-letter.requester';

describe('SendLetterRequester e2e', () => {
	it('성공', async () => {
		const session = await loginRequester.request({
			id: '',
			password: '',
		});
		await sendLetterRequester.request(
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
