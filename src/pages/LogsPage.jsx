import React, { useEffect, useState } from "react";
import axios from "../auth/axios";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
const button = {
    marginRight: 10,
    padding: "6px 12px",
    border: "none",
    borderRadius: 4,
    backgroundColor: "#135d31",
    color: "#fff",
    cursor: "pointer",
};
const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .get("/api/audit?page=0&size=10000", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => setLogs(res.data))
            .catch((err) => console.error("Error loading logs", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Panel – Logs</h2>
            <button onClick={() => navigate("/administration")} style={{...button, marginRight: 20}}>
                Users
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : logs.length === 0 ? (
                <p>No logs available</p>
            ) : (
                <div style={styles.table}>
                    <div style={styles.headerRow}>
                        <span>Time</span>
                        <span>User</span>
                        <span>Method</span>
                        <span>Endpoint</span>
                        <span>Status</span>
                        <span>Error</span>
                    </div>

                    {logs.content.map((log) => (
                        <div key={log.id} style={styles.row}>
                            <span>{dayjs(log.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>
                            <span>{log.username} ({log.role})</span>
                            <span>{log.method}</span>
                            <span>{log.endpoint}</span>
                            <span>{log.statusCode}</span>
                            <span style={{color: log.errorMessage ? "red" : "#555"}}>
                {log.errorMessage || "-"}
              </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: 20,
        fontFamily: "sans-serif"
    },
    title: {
        fontSize: 24,
        marginBottom: 16
    },
    table: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12
    },
    headerRow: {
        display: "grid",
        gridTemplateColumns: "1.5fr 1.5fr 1fr 2fr 1fr 2fr",
        fontWeight: "bold",
        borderBottom: "1px solid #ccc",
        paddingBottom: 6
    },
    row: {
        display: "grid",
        gridTemplateColumns: "1.5fr 1.5fr 1fr 2fr 1fr 2fr",
        fontSize: 14,
        borderBottom: "1px solid #eee",
        padding: "4px 0"
    }
};

export default LogsPage;
