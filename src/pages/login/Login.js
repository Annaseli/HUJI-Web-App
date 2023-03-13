import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"

// styles

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin('')

    const handleSubmit = (event) => {
        event.preventDefault()
        login(email, password)
    }

    // TODO for front: implement a submit form
    return ()
}