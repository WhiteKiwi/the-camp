import { cmd } from './utils';

export async function publish() {
	await cmd('yarn run build');
	await cmd('yarn npm publish --access=public');
}
