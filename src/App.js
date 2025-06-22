import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import HomePage from "../src/pages/HomePage";
import PrivateRoute from "../src/auth/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import ExportDataPage from "./pages/ExportDataPage";
import AdminPage from "./pages/AdminPage";
import axios from "../src/auth/axios";
import ExcelUpload from "./pages/ExportExcel";
import LogsPage from "./pages/LogsPage";
import './App.css'

function App() {
    const token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    console.log("token",token)
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/main"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute >
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/export"
                    element={
                        <PrivateRoute >
                            <ExportDataPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/administration"
                    element={
                        <PrivateRoute requiredRole="ADMIN" >
                            <AdminPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/exportExcel"
                    element={
                        <PrivateRoute requiredRole="ADMIN" >
                            <ExcelUpload />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={"/logs"}
                    element={<PrivateRoute requiredRole="ADMIN">
                        <LogsPage />
                    </PrivateRoute> }
                    />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
