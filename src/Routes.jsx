import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/Components/Layout';
import Login from '@/pages/User/Login';
import Profile from '@/pages/User/Profile';
import Dashboard from '@/pages/Home/Dashboard';
import NotFound from '@/pages/Errors/NotFound';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}
