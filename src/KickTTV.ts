import { Container } from "./components/Container";
import { LoadKickBtn } from "./components/LoadKickBtn";
import { Channel } from "./types";
import { getChannelLogin, getPlayerInstance, getRouter } from "./utils";

export class KickTTV {
	protected updateChannelInterval: number | null = null;
	protected channel: Channel | null = null;

	constructor() {}

	async init() {
		if (!(await this.tryAttachElements())) return;
		this.registerEvents();
		this.updateChannel();
	}

	async tryAttachElements(attempt = 0): Promise<boolean> {
		if (document.getElementById("dawg-load-kick") || attempt > 10) return false;

		if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 1000));

		const navMenu = document.querySelector(".top-nav__menu")?.lastChild;

		if (!navMenu) {
			return this.tryAttachElements(attempt + 1);
		}

		const container = Container();
		const loadKick = LoadKickBtn();
		loadKick.addEventListener("click", this.loadKickStream.bind(this));

		container.appendChild(loadKick);

		navMenu.insertBefore(container, navMenu.firstChild);

		return true;
	}

	async fetchChannel(channel: string): Promise<Channel> {
		const res = await fetch("https://kick.com/api/v2/channels/" + channel);
		return res.json();
	}

	setLiveIndicator(live: boolean) {
		const container = document.getElementById("dawg-container");
		if (container) container.className = live ? "live" : "";
	}

	loadKickStream() {
		if (!this.channel) return;

		const player = getPlayerInstance();

		if (!player) return;

		console.log("Loading kick stream", this.channel.playback_url);

		player.load("https://corsproxy.io/?" + this.channel.playback_url);
		player.play();
	}

	async updateChannel() {
		const channelLogin = getChannelLogin();
		console.log("updating channel", channelLogin);

		if (!channelLogin || channelLogin.length < 3) {
			this.channel = null;
			this.setLiveIndicator(false);
			return;
		}

		try {
			this.channel = await this.fetchChannel(channelLogin);

			const isLive = !!this.channel.livestream?.is_live;

			this.setLiveIndicator(isLive);
		} catch (error) {
			console.error("An error occurred while fetching channel data:", error);
		}
	}

	startChannelUpdateTask() {
		if (this.updateChannelInterval) clearInterval(this.updateChannelInterval);

		this.updateChannelInterval = setInterval(
			this.updateChannel.bind(this),
			60000 * (this.channel?.livestream?.is_live ? 10 : 1)
		);
	}

	registerEvents() {
		const router = getRouter();

		if (router) {
			router.listen(() => {
				const currentChannel = getChannelLogin();

				if (
					!currentChannel ||
					(this.channel && currentChannel != this.channel.slug)
				) {
					this.setLiveIndicator(false);
					this.channel = null;
				}
				this.updateChannel();
				this.startChannelUpdateTask();
			});
		}
	}
}
