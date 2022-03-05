import { readFileSync } from 'fs';
import { join } from 'path';

import { parseUnitSoldiers } from './parse-unit-soldiers';

describe('parseUnitSoldiers', () => {
	it('성공', () => {
		const data = readFileSync(join(__dirname, 'test/성공.txt'), 'utf-8');

		expect(parseUnitSoldiers({ data } as any)).toEqual({
			훈련병Id: '1561180',
		});
	});
});
