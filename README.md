# the-camp
Client lib of the camp


# Installation
```bash
$ pnpm add the-camp
```

# Usage

```typescript
import { TheCampClient } from 'the-camp';

async function main() {
	const theCampClient = new TheCampClient();

	await theCampClient.login({
		id: 'email@test.com',
		password: 'password',
	});

	const { soldierId } = await theCampClient.registerSoldier({
		성분: '예비군인/훈련병',
		군종: '육군',
		이름: '홍길동',
		입영부대: '육군훈련소-논산',
		관계: '팬',
		생년월일: '2001-11-26',
		입영일: '2022-02-14',
		전화번호: '01094862564',
	});

	await theCampClient.sendLetter(soldierId, {
		작성자: '장지훈',
		제목: `내용은 곧 제목22`,
		내용: `제목은 곧 내용`,
	});
}
main();

```