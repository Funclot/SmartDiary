import { useState } from "react";
import api from "./services/api";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");

    const login = async () => {
        try {
            const response = await api.post("/auth/login", {
                username,
                password
            });

            localStorage.setItem(
                "token",
                response.data.accessToken
            );

            setResult("Login success");
        } catch {
            setResult("Login failed");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>SmartDiary JWT Login</h1>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={login}>
                Login
            </button>

            <p>{result}</p>
        </div>
    );
}

export default App;