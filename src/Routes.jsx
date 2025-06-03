import React, { lazy } from "react";
const Lists = lazy(() => import("@/pages/Lists/Index"));
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/Components/Layout';
import Login from '@/pages/User/Login';
import Profile from '@/pages/User/Profile';
import Dashboard from '@/pages/Home/Dashboard';
import NotFound from '@/pages/Errors/NotFound';
const Boards = lazy(() => import("@/pages/Boards/Index"));
const BoardShow = lazy(() => import("@/pages/Boards/Show"));
const AccessDenied = lazy(() => import("@/pages/Errors/AccessDenied"));
import { usePermissionsStore } from '@/store/permissionsStore';
const BoardsReport = lazy(() => import("@/pages/Boards/Reports/BoardsReport"));
import { useAuth } from "./context/AuthContext";
export default function AppRoutes() {
    const hasPermission = usePermissionsStore((state) => state.hasPermission);
    const { loading } = useAuth();
    console.log(hasPermission)
    if (loading) {
        return <div>Loading...</div>;
    }
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
                    <Route path="/boards/report" element={<BoardsReport />} />
                    <Route path="/lists" 
                        element={hasPermission("board.index") ? <Lists /> : <AccessDenied />} 
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}
