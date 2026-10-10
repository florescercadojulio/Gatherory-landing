import { vitePreprocess } from "@astrojs/svelte";

export default {
  preprocess: vitePreprocess(),
  kit: {
    // ... other config
    alias: {
      "@/*": "./src/lib/*",
    },
  },
};
