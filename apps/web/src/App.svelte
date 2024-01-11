<script lang="ts">
    import TodoList from "./components/TodoList.svelte"
    import { signInWithEmailAndPassword } from "firebase/auth"
    import { writable } from "svelte/store"
    import { auth } from "$lib/todoApi"

    $: isAuthorized = auth.currentUser !== null

    const error = writable("")

    const onSubmit = (ev: SubmitEvent) => {
        $error = ""
        signInWithEmailAndPassword(auth, "roman@lamsal.de", new FormData(ev.target as HTMLFormElement).get("password") as string)
            .then(() => window.location.reload())
            .catch(err => ($error = err))
    }
</script>

<main>
    {#if isAuthorized}
        <TodoList />
    {:else}
        <form on:submit|preventDefault={onSubmit}>
            <label>
                <span>Password</span>
                <input type="password" name="password" />
            </label>
        </form>
        <div class="text-red-500">{$error}</div>
    {/if}
</main>
