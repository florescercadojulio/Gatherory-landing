import photos from "./guide-photos.json";

export interface GuideAsset {
	id: string;
	kind: "photo" | "screenshot";
	src: string;
	width: number;
	height: number;
	alt: string;
	caption: string;
	sourceUrl?: string;
	credit?: string;
	device?: "iphone" | "duo";
}

const fixtureCaption = "Native app capture with fictional Maya’s Birthday Dinner example data.";
const screenshots = [
	{ id: "ios-home", src: "/images/ios/home.webp", width: 1206, height: 2622, alt: "Gatherory Home showing the Maya’s Birthday Dinner event card and example attendees.", device: "iphone" },
	{ id: "ios-events", src: "/images/ios/events.webp", width: 1206, height: 2622, alt: "Gatherory invitation for Drinks & catch-ups, a related birthday event, with RSVP choices.", device: "iphone" },
	{ id: "ios-ideas", src: "/images/ios/ideas.webp", width: 1206, height: 2622, alt: "Photo-filled birthday dinner ideas in Gatherory on iPhone.", device: "iphone" },
	{ id: "ios-decide", src: "/images/ios/decide.webp", width: 1206, height: 2622, alt: "Gatherory Decide with a candlelit dinner idea and the group’s preference bar.", device: "iphone" },
	{ id: "ios-manage", src: "/images/ios/manage.webp", width: 1206, height: 2622, alt: "Gatherory Manage showing the birthday dinner budget, guest responses, approvals, and next task.", device: "iphone" },
	{ id: "duo-ideas", src: "/images/ios/duo/ideas.webp", width: 2853, height: 2007, alt: "Gatherory Ideas in the open iPhone Duo layout, with distinct birthday dinner photos.", device: "duo" },
	{ id: "duo-decide", src: "/images/ios/duo/decide.webp", width: 2853, height: 2007, alt: "Gatherory Decide in the iPhone Duo layout, displaying a dinner idea and example team input.", device: "duo" },
	{ id: "duo-manage", src: "/images/ios/duo/manage.webp", width: 2007, height: 2853, alt: "Gatherory Manage on iPhone Duo with a budget, guest chart, collaborators, approvals, and a to-do.", device: "duo" },
] satisfies Omit<GuideAsset, "kind" | "caption">[];

export const guideAssets: GuideAsset[] = [
	...screenshots.map((asset) => ({ ...asset, kind: "screenshot" as const, caption: fixtureCaption })),
	...photos.assets.map((asset) => ({ ...asset, kind: "photo" as const })),
];

export function getGuideAsset(id: string): GuideAsset {
	const asset = guideAssets.find((candidate) => candidate.id === id);
	if (!asset) throw new Error(`Unknown guide asset: ${id}`);
	return asset;
}

export function photoSrcSet(asset: GuideAsset): string | undefined {
	if (asset.kind !== "photo") return undefined;
	return [480, 800, 1200, 1600].map((width) => {
		const url = new URL(asset.src);
		url.searchParams.set("w", String(width));
		url.searchParams.set("h", String(Math.round(width * asset.height / asset.width)));
		return `${url} ${width}w`;
	}).join(", ");
}
