import type { FirebaseApp } from "firebase/app"
import { getDatabase, onValue, ref, remove, set, runTransaction } from "firebase/database"
import type { z } from "zod"
import type { Todo } from "./types/Todo.js"
import { NewTodoSchema, TodoSchema } from "./types/Todo.js"
import type { SafeParseError } from "zod"
import { string } from "zod"

const TodoApiSerialize = TodoSchema.extend({
    createdAt: TodoSchema.shape.createdAt.or(string().datetime()),
    updatedAt: TodoSchema.shape.updatedAt.or(string().datetime()),
}).transform(todo => ({
    ...todo,
    createdAt: typeof todo.createdAt !== "string" ? todo.createdAt.toISOString() : todo.createdAt,
    updatedAt: typeof todo.updatedAt !== "string" ? todo.updatedAt.toISOString() : todo.updatedAt,
}))

const serializeTodo = (input: z.input<typeof TodoApiSerialize>) => TodoApiSerialize.parse(input)

export const createTodoApi = (app: FirebaseApp, onChange: (todos: Todo[]) => void) => {
    const db = getDatabase(app)

    const saveTodo = (todo: string | Todo) => {
        const todoObject = typeof todo === "string" ? NewTodoSchema.parse({ value: todo } satisfies z.input<typeof NewTodoSchema>) : todo

        const parsedTodo = serializeTodo({
            ...todoObject,
            updatedAt: new Date(),
        })

        return set(ref(db, "todos/" + parsedTodo.id), parsedTodo)
    }

    const deleteTodo = (todoId: string) => {
        return remove(ref(db, "todos/" + todoId))
    }

    const toggleDone = (todoId: string, done: boolean) => {
        return runTransaction(ref(db, "todos/" + todoId), todo => {
            todo.done = done
            todo.updatedAt = new Date()

            return serializeTodo(todo)
        })
    }

    onValue(ref(db, "todos"), snapshot => {
        const snapshotValue = snapshot.val()

        if (snapshotValue === null) {
            return onChange([])
        }

        const newTodos = (Object.values(snapshotValue) as z.infer<typeof TodoApiSerialize>[]).reduce(
            (acc: Todo[], curr: z.infer<typeof TodoApiSerialize>) => {
                const parsedData = TodoSchema.safeParse({
                    ...curr,
                    createdAt: new Date(curr.createdAt),
                    updatedAt: new Date(curr.updatedAt),
                } satisfies z.input<typeof TodoSchema>)

                if (!parsedData.success) {
                    console.error(`Could not parse loaded todo with id ${curr?.id}: ${(parsedData as SafeParseError<unknown>).error}`)
                } else {
                    acc.push(parsedData.data)
                }

                return acc
            },
            []
        )

        if (newTodos) {
            onChange(newTodos)
        }
    })

    return {
        saveTodo,
        deleteTodo,
        toggleDone,
    }
}
