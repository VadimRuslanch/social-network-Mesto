import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteElement({ onloggedIn, element }) {
    if (onloggedIn) {
        return element
    } else {
        return <Navigate to="/signin" replace />
    }
}