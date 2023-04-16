import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { Home } from "../pages/Home"
import { PrivateRoute } from "./privateRoutes";
import { Register } from "../pages/Register";

export const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                

                <Route path="/home" element={<Home />} />

                {/* <Route path='/home' element={
                    <PrivateRoute>
                        < Home />
                    </PrivateRoute>
                } /> */}
            </Routes>
        </Router>
    );
};
