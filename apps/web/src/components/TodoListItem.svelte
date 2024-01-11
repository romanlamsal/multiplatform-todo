<script lang="ts">
    import { todoApi } from "$lib/todoApi"
    import type { Todo } from "@lamsaltodo/todo-adapter/Todo"

    export let todo: Todo
</script>

<li class="grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
    <input type="checkbox" checked={todo.done} on:change={() => todoApi.toggleDone(todo.id, !todo.done)} />
    <span>{todo.value}</span>
    <button class="px-2 py-1" on:click={todoApi.deleteTodo(todo.id)}>x</button>
</li>
