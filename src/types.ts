import { MediaPlayer } from "amazon-ivs-player";
import { ReactNode } from "./utils";

type ReactElement = Element & {
	_reactRootContainer?: {
		_internalRoot?: {
			current?: any;
		};
	};
};

export type MaybeReactElement = ReactElement | null;
export type RouterReactNode = ReactNode & {
	props?: {
		history?: {
			listen: (listener: () => void) => void;
		};
	};
};

export type PlayerReactNode = ReactNode & {
	setPlayerActive?: any;
	props?: {
		mediaPlayerInstance?: MediaPlayer;
	};
};
export type ChannelInfoReactNode = ReactNode & {
	setPlayerActive?: any;
	props?: {
		channelLogin?: string;
		channelID?: string;
	};
};

// kick
export interface Channel {
	slug: string;
	playback_url: string;
	livestream: Livestream | null;
}

export interface BannerImage {
	url: string;
}

export interface Livestream {
	is_live: boolean;
}
