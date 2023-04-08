import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";

// styles

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const { signUp, error, isPending } = useSignUp('')

    const handleSubmit = (event) => {
        event.preventDefault()
        signUp(email, password, displayName)
    }

    return (
        //<form onSubmit={handleSubmit} className={styles['signup-form']}>
        <form onSubmit={handleSubmit}>
            <h2>SignUp</h2>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>name:</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            {/* <button className="btn">Signup</button> */}
            {!isPending && <button className="btn">SignUp</button>}
            {isPending && <button className="btn" disabled>loading...</button>}           
            {error && <p>{error}</p>}
        </form>
    )
}