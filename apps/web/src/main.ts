import "./app.css"
import App from "./App.svelte"
import { auth } from "$lib/todoApi"

const app = async () => {
    await auth.authStateReady()
    return new App({
        target: document.getElementById("app")!,
    })
}

export default app()
