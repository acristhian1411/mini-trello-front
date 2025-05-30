import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/Components/Layout';
import Login from '@/pages/User/Login';
import Profile from '@/pages/User/Profile';
import Dashboard from '@/pages/Home/Dashboard';
import NotFound from '@/pages/Errors/NotFound';
import Boards from '@/pages/Boards/Index';
import BoardShow from '@/pages/Boards/Show';
import AccessDenied from '@/pages/Errors/AccessDenied';
import { usePermissionsStore } from '@/store/permissionsStore';
export default function AppRoutes() {
    const hasPermission = usePermissionsStore((state) => state.hasPermission);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/boards" 
                        element={hasPermission("board.index") ? <Boards /> : <AccessDenied />} 
                    />
                    <Route path="/boards/:id" 
                        element={hasPermission("board.show") ? <BoardShow /> : <AccessDenied />} 
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}
