import { publish } from './publish';

const scripts: Record<string, (...args: string[]) => Promise<void>> = {
	publish,
};

async function run(scriptName: string) {
	const script = scripts[scriptName];
	if (!script) {
		console.error('스크립트 이름을 확인해주세요');
		return;
	}

	const args = process.argv.slice(3);
	await script(...args);
	process.exit();
}

run(process.argv[2]);
