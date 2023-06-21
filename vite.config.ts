import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: {
		drop: ["console"],
	},
	plugins: [
		monkey({
			entry: "src/main.ts",
			userscript: {
				name: "KickTTV",
				icon: "https://www.google.com/s2/favicons?sz=64&domain=twitch.tv",
				namespace: "dawgonntheridinlawnmower",
				match: ["*://twitch.tv/*", "*://www.twitch.tv/*"],
				updateURL:
					"https://github.com/dawgonntheridinlawnmower/kick-ttv/releases/latest/download/kickttv.user.js",
				downloadURL:
					"https://github.com/dawgonntheridinlawnmower/kick-ttv/releases/latest/download/kickttv.user.js",
			},
		}),
	],
});
