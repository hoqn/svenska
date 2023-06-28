import { cp, lstat } from "node:fs/promises";
import path, { resolve } from "node:path";
import { cwd } from "node:process";

console.log(path.join("/C:/Users/hoqn/Workspace/2023TT/svenska/src/", "pages"));

const srcDir = "./src";

// export function resolveRoot(cwd) {
// 	if (cwd instanceof URL) {
// 		cwd = fileURLToPath(cwd);
// 	}
// 	return cwd ? path.resolve(cwd) : process.cwd();
// }

// async function resolveConfigPath(
// 	configOptions
// ) {
// 	const root = resolveRoot(configOptions.cwd);

// 	let userConfigPath;
// 	if (flags?.config) {
// 		userConfigPath = /^\.*\//.test(flags.config) ? flags.config : `./${flags.config}`;
// 		userConfigPath = fileURLToPath(new URL(userConfigPath, `file://${root}/`));
// 	} else {
// 		userConfigPath = await search(configOptions.fs, root);
// 	}

// 	return userConfigPath;
// }

// console.log(srcDir, '->', resolveConfigPath({ cwd: __dirname,  }));

console.log("src:", resolve(cwd(), srcDir));
console.log(await lstat("" + resolve(cwd(), srcDir)));

// cp(`\\C:\\Users\\hoqn\\Workspace\\2023TT\\svenska\\src\\pages`, `C:\\Users\\hoqn\\Workspace\\2023TT\\svenska\\src\\astro_tmp_pages_en`);
