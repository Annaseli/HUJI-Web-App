import { useState } from "react"
import { useLogIn } from "../../hooks/useLogIn"

// styles

export default function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { logIn, error, isPending } = useLogIn('')

    const handleSubmit = (event) => {
        event.preventDefault()
        logIn(email, password)
    }

    return (
        //<form onSubmit={handleSubmit} className={styles['login-form']}>
        <form onSubmit={handleSubmit}>
            <h2>LogIn</h2>
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
            {/* <button className="btn">LogIn</button>        */}
            {!isPending && <button className="btn">LogIn</button>}
            {isPending && <button className="btn" disabled>loading...</button>}
            {error && <p>{error}</p>}
        </form>
    )
}