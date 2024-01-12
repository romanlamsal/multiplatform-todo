import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import * as path from "path"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), VitePWA({ registerType: "autoUpdate" })],
    resolve: {
        alias: {
            $types: path.resolve(__dirname, "./src/types"),
            $lib: path.resolve(__dirname, "./src/lib"),
        },
    },
})
