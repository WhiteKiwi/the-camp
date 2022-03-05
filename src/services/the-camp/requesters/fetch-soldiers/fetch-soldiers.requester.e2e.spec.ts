import { loginRequester } from '../login';
import { fetchSoldiersRequester } from './fetch-soldiers.requester';

describe.skip('FetchSoldiersRequester e2e', () => {
	it('성공', async () => {
		const session = await loginRequester.request({
			id: '',
			password: '',
		});
		await fetchSoldiersRequester.request(session);
	});
});
