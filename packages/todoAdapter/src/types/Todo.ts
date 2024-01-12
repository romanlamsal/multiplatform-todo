import { object, string, date, boolean } from "zod"
import type { z } from "zod"
import { nanoid } from "nanoid"

export const TodoSchema = object({
    id: string(),
    value: string(),
    createdAt: date(),
    updatedAt: date(),
    done: boolean(),
    dueDate: date().optional(),
})

export type Todo = z.infer<typeof TodoSchema>

export const NewTodoSchema = TodoSchema.pick({ value: true, dueDate: true }).extend({
    id: TodoSchema.shape.id.default(() => nanoid()),
    createdAt: TodoSchema.shape.createdAt.default(() => new Date()),
    updatedAt: TodoSchema.shape.updatedAt.default(() => new Date()),
    done: TodoSchema.shape.done.default(false),
})

export type NewTodo = z.infer<typeof NewTodoSchema>
