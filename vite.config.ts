import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
	plugins: [
		react(),
	],
	resolve: {
		alias: {
			"@lib": path.resolve(__dirname, "./src/lib"),
		},
	},
	build: {
		lib: {
			entry: "src/lib/index.ts",
			name: "HrnetDatePicker",
			fileName: (format) => `hrnet-datepicker.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
		},
	},
});
