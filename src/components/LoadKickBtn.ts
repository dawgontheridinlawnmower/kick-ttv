import { KickLogo } from "./KickLogo";

export const LoadKickBtn = () => {
	const btn = document.createElement("button");
	btn.id = "dawg-load-kick";
	btn.appendChild(KickLogo());
	btn.title = "Load Kick stream";
	return btn;
};
