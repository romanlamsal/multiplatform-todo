import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: {
            $types: path.resolve(__dirname, "./src/types"),
            $lib: path.resolve(__dirname, "./src/lib"),
        },
    },
})
