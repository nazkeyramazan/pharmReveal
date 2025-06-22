import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
const Header = ({ userName = "User",  }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const onLogout = () => {
        navigate('/login');
        localStorage.removeItem("token");
    }
    const changePage = () => {
        location.pathname === "/export" ?
            navigate("/dashboard"):
            navigate("/export")
    }

    return (
        <header style={styles.header}>
            <div style={styles.headerLeft}>
                <span style={styles.brandMain}>PharmReveal</span>
                <span style={styles.brandSub}> | Pharmaceutical Analytics</span>
            </div>

            <div style={styles.headerRight}>
                <span style={styles.welcome}>Welcome!</span>

                        <button onClick={changePage} style={styles.headerButton}>
                            {
                                location.pathname === "/export" ?
                                    "Dashboard" : "ExportData"
                            }
                        </button>

                <button onClick={onLogout} style={styles.headerButton}>
                    Logout
                </button>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: "#135d31",
        color: "white",
        padding: "26px 30px",
        fontSize: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    brandMain: {
        fontWeight: "bold",
        fontSize: 26,
    },
    brandSub: {
        fontSize: 20,
        opacity: 0.8,
    },
    headerRight: {
        display: "flex",
        alignItems: "center",
        gap: 15,
    },
    welcome: {
        marginRight: 10,
        fontSize: 18,
    },
    headerButton: {
        padding: "8px 14px",
        backgroundColor: "#fb6f5e",
        border: "none",
        borderRadius: 6,
        fontSize:'16px',
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default Header;
