import { 입영부대CodeMap } from '../../../../core/types';
import { loginRequester } from '../login';
import { fetchUnitSoldiersRequester } from './fetch-unit-soldiers.requester';

describe.skip('FetchUnitSoldiersRequester e2e', () => {
	it('성공', async () => {
		const session = await loginRequester.request({
			id: process.env.ID!,
			password: process.env.PASSWORD!,
		});
		await fetchUnitSoldiersRequester.request(
			{
				입영부대Code: 입영부대CodeMap['육군훈련소-논산'],
				입영부대EduId: '14030',
			},
			session,
		);
	});
});
