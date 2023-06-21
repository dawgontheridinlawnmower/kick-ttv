import { KickTTV } from "./KickTTV";
import "./style.css";

const kickTTV = new KickTTV();

(() => {
	if (["complete", "interactive", "loaded"].includes(document.readyState)) {
		kickTTV.init();
		return;
	}

	window.addEventListener("DOMContentLoaded", kickTTV.init);
})();
