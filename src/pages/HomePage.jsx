import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // путь поправь под себя

const HomePage = () => {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate("/dashboard");
    };

    const handleExportClick = () => {
        navigate("/export");
    };

    return (
        <div style={styles.container}>
            <img src={logo} alt="Logo" style={styles.logo} />

            <div style={styles.buttonContainer}>
                <button onClick={handleDashboardClick} style={styles.buttonGreen}>
                    Go to Dashboard
                </button>
                <button onClick={handleExportClick} style={styles.buttonCoral}>
                    Export Data
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        fontFamily: "sans-serif",
    },
    logo: {
        maxWidth: 500,
        width: "500px",
        marginBottom: 60,
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: 40,
    },
    buttonGreen: {
        padding: "20px 40px",
        backgroundColor: "#135d31", // зелёный
        color: "white",
        border: "none",
        borderRadius: 10,
        fontSize: 20,
        fontWeight: "bold",
        cursor: "pointer",
        minWidth: 200,
    },
    buttonCoral: {
        padding: "20px 40px",
        backgroundColor: "#135d31", // коралловый
        color: "white",
        border: "none",
        borderRadius: 10,
        fontSize: 20,
        fontWeight: "bold",
        cursor: "pointer",
        minWidth: 200,
    },
};
export default HomePage;
