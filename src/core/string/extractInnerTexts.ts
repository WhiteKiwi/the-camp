export function extractInnerTexts(
	target: string,
	left: string,
	right: string,
): string[] {
	const extractedTexts = [];
	let offset = 0;

	while (target.includes(left) && target.includes(right)) {
		const startIdx = target.indexOf(left, offset);
		const endIdx = target.indexOf(right, startIdx);

		if (startIdx === -1 || endIdx === -1) {
			break;
		}

		const extractedText = target.substring(startIdx + left.length, endIdx);

		extractedTexts.push(extractedText);
		offset = endIdx + right.length;
	}

	return extractedTexts;
}
