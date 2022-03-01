import { LoginRequester } from './login.requester';

describe.skip('LoginRequester e2e', () => {
	it('성공', async () => {
		const loginRequester = new LoginRequester();

		const session = await loginRequester.request({
			id: '',
			password: '',
		});
		console.log('session', session);
	});
});
