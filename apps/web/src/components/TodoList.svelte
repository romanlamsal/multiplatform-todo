<script lang="ts">
    import { todoApi, todos } from "$lib/todoApi"
    import TodoListItem from "./TodoListItem.svelte"

    const onSubmit = (ev: SubmitEvent) => {
        const formElement = ev.target as HTMLFormElement
        const data = new FormData(formElement)

        const value = data.get("value") as string

        if (!value) {
            return
        }

        todoApi.saveTodo(value)

        formElement.reset()
    }

    $: sortedTodos = $todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
</script>

<main>
    <form on:submit|preventDefault={onSubmit}>
        <label>
            <span>Todo:</span>
            <input name="value" />
        </label>
        <button type="submit">Save</button>
    </form>
    <ul>
        {#each sortedTodos as todo}
            <TodoListItem {todo} />
        {/each}
    </ul>
</main>

<style></style>
