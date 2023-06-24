import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: {
		drop: process.env.development == "production" ? ["console"] : [],
	},
	plugins: [
		monkey({
			entry: "src/main.ts",
			userscript: {
				name: "KickTTV",
				icon: "https://www.google.com/s2/favicons?sz=64&domain=twitch.tv",
				namespace: "dawgontheridinlawnmower",
				match: ["*://twitch.tv/*", "*://www.twitch.tv/*"],
				updateURL:
					"https://github.com/dawgontheridinlawnmower/kick-ttv/releases/latest/download/kickttv.user.js",
				downloadURL:
					"https://github.com/dawgontheridinlawnmower/kick-ttv/releases/latest/download/kickttv.user.js",
			},
		}),
	],
});
