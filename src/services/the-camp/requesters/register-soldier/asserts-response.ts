import { AxiosResponse } from 'axios';

export function assertsResponse(response: AxiosResponse) {
	const successCodes = ['0000', 'E001'];

	if (!successCodes.includes(response.data.resultCd)) {
		// TODO: 추가정보 로깅
		throw new Error(
			response.data.resultMsg || '알 수 없는 오류가 발생하였습니다.',
		);
	}
}
