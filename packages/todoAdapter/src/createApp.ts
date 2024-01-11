import { initializeApp } from "firebase/app"
import { browserLocalPersistence, initializeAuth } from "firebase/auth"

export const createApp = (apiKey: string) => {
    const firebaseConfig = {
        apiKey,
        authDomain: "lamsaltodo.firebaseapp.com",
        databaseURL: "https://lamsaltodo-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "lamsaltodo",
        storageBucket: "lamsaltodo.appspot.com",
        messagingSenderId: "810937048963",
        appId: "1:810937048963:web:91b80c5e1906d84d1ee0b6",
    }

    const app = initializeApp(firebaseConfig)
    const auth = initializeAuth(app, { persistence: browserLocalPersistence })

    return {
        app,
        auth,
    }
}
