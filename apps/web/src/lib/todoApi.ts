import { writable } from "svelte/store"
import { createTodoAdapter } from "@lamsaltodo/todo-adapter"
import type { Todo } from "@lamsaltodo/todo-adapter/Todo"

declare global {
    interface ImportMetaEnv {
        VITE_FIREBASE_API_KEY: string
    }
}

export const todos = writable<Todo[]>([])

export const { app, auth, todoApi } = createTodoAdapter(import.meta.env.VITE_FIREBASE_API_KEY, todos.set)
