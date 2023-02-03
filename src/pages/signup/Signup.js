import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// styles

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const { signup, error, isPending } = useSignup('')

    const handleSubmit = (event) => {
        event.preventDefault()
        signup(email, password, displayName)
    }

    // TODO for front: implement a submit form
    return ()
}