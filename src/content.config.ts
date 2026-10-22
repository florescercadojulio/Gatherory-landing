import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const seo = defineCollection({
	loader: glob({ base: "./src/content/seo", pattern: "**/*.md" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		accent: z.string(),
		seoTitle: z.string(),
		description: z.string(),
		intro: z.string(),
		updated: z.coerce.date(),
		kind: z.enum(["comparison", "guide", "product"]),
		category: z.enum(["occasions", "collaboration", "getting-started", "choosing-app"]),
		summaryHeading: z.string(),
		takeaways: z.array(z.string()).min(2).max(5),
		related: z.array(z.string()).max(3),
		order: z.number(),
	}),
});

export const collections = { seo };
