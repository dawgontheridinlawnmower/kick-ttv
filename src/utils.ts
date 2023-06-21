//credit: https://github.com/Nerixyz/ttv-tools/blob/926b00c72b091df231ac6c737628021b9266acbb/src/utilities.ts
//credit: https://github.com/Nerixyz/ttv-tools/blob/926b00c72b091df231ac6c737628021b9266acbb/src/context/react-connector.ts

import { MaybeReactElement, PlayerReactNode, RouterReactNode } from "./types";

export interface ReactNode {
	child: ReactNode | null;
	sibling: ReactNode | null;
	current?: ReactNode;
	stateNode?: ReactNode & { props?: { root?: ReactNode } };
}

export type ReactNodeMaybe<T extends ReactNode> = ReactNode & Partial<T>;

export function findReactNode<T extends ReactNode>(
	root: ReactNode | null,
	constraint: (node: ReactNodeMaybe<T>) => any
): T | null {
	if (!root) return null;
	if (root.stateNode && constraint(root.stateNode as ReactNodeMaybe<T>))
		return root.stateNode as T;

	let node = root.child;
	while (node) {
		const result = findReactNode(node, constraint);
		if (result) return result;

		node = node.sibling;
	}

	return null;
}

export function getReactRootNode() {
	const rootNode = document.querySelector("#root") as MaybeReactElement;
	return rootNode?._reactRootContainer?._internalRoot?.current;
}

export function getPlayerInstance() {
	const reactRootNode = getReactRootNode();
	if (!reactRootNode) return;

	const playerNode = findReactNode<PlayerReactNode>(
		reactRootNode,
		(node) =>
			node.setPlayerActive && node.props && node.props.mediaPlayerInstance
	);

	return playerNode?.props?.mediaPlayerInstance;
}

export function getRouter() {
	const routerNode = findReactNode<RouterReactNode>(
		getReactRootNode(),
		(node) => node?.props?.history
	);
	return routerNode?.props?.history;
}

export function getChannelLogin() {
	const match = window.location.href.match(
		/https?:\/\/(?:www\.)?twitch\.tv\/([^\/?]+)/i
	);
	return match ? match[1].toLocaleLowerCase() : null;
}
