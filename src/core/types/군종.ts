export const 군종CodeMap = {
	육군: '0000010001',
	해군: '0000010002',
	공군: '0000010003',
	해병대: '0000010004',
} as const;

export type 군종 = keyof typeof 군종CodeMap;
