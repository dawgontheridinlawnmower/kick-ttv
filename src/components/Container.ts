import { Live } from "./Live";

export function Container() {
	const elem = document.createElement("div");
	elem.id = "dawg-container";
	const live = Live();
	elem.appendChild(live);
	return elem;
}
