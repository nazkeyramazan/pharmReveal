import { Navigate } from "react-router-dom";

export function getTokenPayload() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

function isTokenValid(requiredRole = null) {
    const payload = getTokenPayload();
    if (!payload) return false;

    const isNotExpired = payload.exp * 1000 > Date.now();
    if (!isNotExpired) return false;

    if (requiredRole && payload.role !== requiredRole) return false;

    return true;
}
export default function PrivateRoute({ children, requiredRole = 'USER' }) {
    return isTokenValid(requiredRole) ? children : <Navigate to="/login" />;
}
