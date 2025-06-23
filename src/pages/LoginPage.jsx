import logo from "../assets/logo.png";
import axios from "../auth/axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getTokenPayload} from "../auth/PrivateRoute";
import Loader from "../components/Loader";

const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post("/api/v1/auth/authenticate", {
                email:login,
                password:password,
            });

            // допустим сервер вернёт: { token: 'JWT...' }
            const token = response.data.access_token;

            localStorage.setItem("token", token);
            const payload = getTokenPayload();
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            payload.role==="USER"?
            navigate("/main") : navigate("/administration") ;
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login error");
            // navigate("/main");
        } finally{
            setLoading(false)
        }
    };

    return (
        <div style={styles.wrapper}>
            {/* Левая часть — логотип */}
            <div style={styles.left}>
                <div style={styles.leftBackground}></div>
                {/* Полупрозрачный фон */}
                <img src={logo} alt="Logo" style={styles.logo}/> {/* Яркий логотип */}
            </div>

            {/* Правая часть — форма */}
            <div style={styles.right}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={login}
                        required
                        onChange={(e) => setLogin(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    {loading ? <Loader/>: (
                        <button type="submit" style={styles.button}>
                            Log In
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        height: "100vh",
        fontFamily: "sans-serif",
    },
    left: {
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: "60%",
        maxHeight: "80%",
        objectFit: "contain",
        zIndex: 1,
    },
    leftBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#135d31",
        opacity: 0.75,
        zIndex: 0,
    },
    right: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 40,
        backgroundColor: "#f0fdf4",
    },
    title: {
        marginBottom: 20,
        color: "#135d31",
        fontSize: 24,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    input: {
        padding: 10,
        fontSize: 16,
        border: "1px solid #d1fae5",
        borderRadius: 5,
    },
    button: {
        padding: 10,
        backgroundColor: "#135d31",
        color: "white",
        border: "none",
        fontSize: 16,
        borderRadius: 5,
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default LoginPage;