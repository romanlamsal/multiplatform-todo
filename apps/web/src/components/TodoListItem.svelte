<script lang="ts">
    import { todoApi } from "$lib/todoApi"
    import type { Todo } from "@lamsaltodo/todo-adapter/Todo"

    export let todo: Todo
</script>

<li class="">
    <label class="grid grid-cols-[1fr_auto] items-center gap-x-4 cursor-pointer">
        <span class:line-through={todo.done}>{todo.value}</span>
        <input type="checkbox" checked={todo.done} on:change={() => todoApi.toggleDone(todo.id, !todo.done)} />
    </label>
    <!--<button class="px-2 py-1" on:click={todoApi.deleteTodo(todo.id)}>x</button>-->
</li>
