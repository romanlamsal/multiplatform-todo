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

    $: sortedTodos = $todos.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    $: openTodos = sortedTodos.filter(t => !t.done)
    $: doneTodos = sortedTodos.filter(t => t.done)
</script>

<main>
    <form on:submit|preventDefault={onSubmit}>
        <label>
            <span>Todo:</span>
            <input name="value" />
        </label>
        <button type="submit">Save</button>
    </form>
    <ul class="space-y-1">
        {#each openTodos as todo (todo.id)}
            <TodoListItem {todo} />
        {/each}
    </ul>
    <hr class="my-4" />
    <ul class="space-y-1">
        {#each doneTodos as todo (todo.id)}
            <TodoListItem {todo} />
        {/each}
    </ul>
</main>

<style></style>
