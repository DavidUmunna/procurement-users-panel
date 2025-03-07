import { useState } from "react";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:5000/api/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            alert("Login Successful!");
        } else {
            setError(data.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}

export default SignIn;
