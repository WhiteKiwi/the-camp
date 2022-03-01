# the-camp
Client lib of the camp


# Installation
```bash
$ y add install the-camp
```

# Usage

```typescript
import { TheCampClient } from 'the-camp';

async function main() {
	const theCampClient = new TheCampClient();

	await theCampClient.login({
		id: 'id@test.com',
		password: '{password}',
	});

	await theCampClient.sendLetter(
		{
			성분: '예비군인/훈련병',
			군종: '육군',
			이름: '홍길동',
			입영부대: '육군훈련소-논산',
			관계: '팬',
			생년월일: '2001-01-01',
			입영일: '2022-02-14',
			전화번호: '01012341234',

			// 아래 값들은 현재 직접 뽑아야 함
			// TODO: 사이트에서 긁어오게 작업하기
			생년월일Code: '08IyuIy6/tXS/vveGiNc+Q==', // birth
			입영부대TypeCode: '0000140001', // trainUnitTypeCd
			입영부대EduId: '14030', // trainUnitEduSeq
			훈련병Id: '', // traineeMgrSeq
		},
		{
			작성자: '장지훈',
			제목: `내용은 곧 제목`,
			내용: `제목은
			곧
			내용`,
		},
	);
}
main();

```