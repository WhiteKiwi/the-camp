import { theCampService } from './the-camp.service';

describe.skip('TheCampService e2e', () => {
	it('성공', async () => {
		// const session = await theCampService.login({
		await theCampService.login({
			id: '',
			password: '',
		});
	});
});
