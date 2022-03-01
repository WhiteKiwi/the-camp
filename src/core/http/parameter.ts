export class Parameter {
	constructor(
		private readonly data: Record<string, string | number | boolean>,
	) {}

	toString() {
		const rows: string[] = [];
		for (const key in this.data) {
			rows.push(
				`${encodeURIComponent(key)}=${encodeURIComponent(this.data[key])}`,
			);
		}

		return rows.join('&');
	}
}
