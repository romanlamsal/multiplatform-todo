import dotenv from "dotenv"
import * as fs from "node:fs"
import inquirer from "inquirer"
import { createTodoAdapter } from "@lamsaltodo/todo-adapter"
import { signInWithEmailAndPassword } from "firebase/auth"

export const initTodoAdapter = async () => {
    const dotenvPath = new URL(".env.local", import.meta.url)

    if (!fs.existsSync(dotenvPath)) {
        const answers = await inquirer.prompt([
            {
                name: "apiKey",
                type: "input",
                message: "Firebase API key",
            },
            {
                name: "password",
                type: "input",
                message: "User password",
            },
        ])

        fs.writeFileSync(dotenvPath, `API_KEY=${answers.apiKey}\nUSER_PASSWORD=${answers.password}`)
    }

    const envLocal = dotenv.parse(fs.readFileSync(dotenvPath))

    const apiKey = envLocal.API_KEY
    const password = envLocal.USER_PASSWORD

    const todoAdapter = createTodoAdapter(apiKey, () => {})

    await signInWithEmailAndPassword(todoAdapter.auth, "roman@lamsal.de", password)

    return { saveTodo: todoAdapter.todoApi.saveTodo }
}
