import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("Файл не выбран");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        setFileName(selected ? selected.name : "Файл не выбран");
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                '/api/drugs/upload-async',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log('Upload success:', response.data);
            alert("Файл успешно загружен");
        } catch (error) {
            console.error('Upload error:', error);
            alert("Ошибка при загрузке файла");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <label style={styles.customFileInput}>
                <span style={styles.labelText}>Выбрать Excel</span>
                <input type="file" accept=".xlsx, .xls" onChange={handleChange} style={styles.input} />
            </label>
            <span style={styles.fileName}>{fileName}</span>
            <button onClick={handleUpload} style={styles.button} disabled={loading}>
                {loading ? "Загрузка..." : "Загрузить"}
            </button>
        </div>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "sans-serif"
    },
    customFileInput: {
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
        backgroundColor: "#ffd9cc",
        color: "#135d31",
        border: "1px solid #ffa07a",
        borderRadius: 6,
        padding: "6px 12px",
        cursor: "pointer"
    },
    input: {
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0,
        width: "100%",
        height: "100%",
        cursor: "pointer"
    },
    labelText: {
        pointerEvents: "none"
    },
    fileName: {
        fontSize: 14,
        color: "#444",
        maxWidth: 180,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    button: {
        padding: "6px 12px",
        backgroundColor: "#135d31",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: "bold"
    }
};

export default ExcelUpload;
