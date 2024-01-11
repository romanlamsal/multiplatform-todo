#!/usr/bin/env zx

import inquirer from "inquirer"
import { initTodoAdapter } from "./initTodoAdapter.js"

const { saveTodo } = await initTodoAdapter()

let lastMessage = ""

do {
    const message = await inquirer.prompt([
        {
            name: "todo",
            message: "What's there todo?",
            type: "input",
        },
    ])

    const { todo } = message

    if (todo) {
        await saveTodo(todo)
    }

    lastMessage = todo
} while (lastMessage)

process.exit(0)
