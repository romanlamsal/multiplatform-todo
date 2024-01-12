#!/usr/bin/env zx

import { createPromptModule } from "inquirer"
import { initTodoAdapter } from "./initTodoAdapter.js"

const todoAdapterPromise = initTodoAdapter().catch(() => process.exit(1))

let lastMessage = ""

do {
    const message = await createPromptModule()([
        {
            name: "todo",
            message: "What's there todo?",
            type: "input",
        },
    ])

    const { todo } = message

    if (todo) {
        await (await todoAdapterPromise).saveTodo(todo)
    }

    lastMessage = todo
} while (lastMessage)

process.exit(0)
