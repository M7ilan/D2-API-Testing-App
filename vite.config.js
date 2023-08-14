import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
	plugins: [react(), mkcert()],
	base: "/D2-API-Testing-App-Local/",
});
