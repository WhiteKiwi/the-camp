import { exec as _exec } from 'child_process';
import { promisify } from 'util';

const exec = promisify(_exec);
export async function cmd(command: string): Promise<string> {
	console.log(`$ ${command}`);
	const { stdout, stderr } = await exec(command);
	if (stderr) throw new Error(stderr);
	console.log(stdout);
	return stderr;
}
