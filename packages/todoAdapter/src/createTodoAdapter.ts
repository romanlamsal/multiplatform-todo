import { createApp } from "./createApp.js"
import { createTodoApi } from "./createTodoApi.js"
import type { Todo } from "./types/Todo.js"

export const createTodoAdapter = (apiKey: string, cb: (todos: Todo[]) => void) => {
    const { app, auth } = createApp(apiKey)

    return {
        app,
        auth,
        todoApi: createTodoApi(app, cb),
    }
}
