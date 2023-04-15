import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { Home } from "../pages/Home"
import { PrivateRoute } from "./privateRoutes";

export const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
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
