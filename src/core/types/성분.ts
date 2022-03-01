export const 성분CodeMap = {
	'예비군인/훈련병': '0000490001',
	병사: '0000490002',
	장교: '0000490003',
	부사관: '0000490004',
	군무원: '0000490005',
	생도: '0000490006',
} as const;

export type 성분 = keyof typeof 성분CodeMap;
