export function extractInnerText(
	target: string,
	lefts: string[],
	right: string,
): string {
	let beforeStartIdx = -1;
	let startIdx = -1;
	for (const left of lefts) {
		startIdx = target.indexOf(left, beforeStartIdx);

		if (startIdx < 0) {
			break;
		}

		startIdx += left.length;
		beforeStartIdx = startIdx;
	}

	const endIdx = target.indexOf(right, startIdx);
	if (startIdx < 0 || endIdx < 0) {
		return '';
	}

	return target.substring(startIdx, endIdx);
}
