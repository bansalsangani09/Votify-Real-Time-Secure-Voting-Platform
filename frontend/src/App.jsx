import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthContext, AuthProvider } from './context/AuthContext';
import { PageSkeleton, DashboardSkeleton } from './components/SkeletonLoader';

// Public Lazy Routes
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyLogin = lazy(() => import('./pages/VerifyLogin'));

// Admin Lazy Routes
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'));
const AdminElections = lazy(() => import('./admin/pages/Elections'));
const AdminElectionDetails = lazy(() => import('./admin/pages/ElectionDetails'));
const AdminCandidates = lazy(() => import('./admin/pages/Candidates'));
const AdminVoters = lazy(() => import('./admin/pages/Voters'));
const AdminMonitoring = lazy(() => import('./admin/pages/Monitoring'));
const AdminResults = lazy(() => import('./admin/pages/Results'));
const AdminBlockchain = lazy(() => import('./admin/pages/Blockchain'));
const AdminAudit = lazy(() => import('./admin/pages/Audit'));
const AdminOwners = lazy(() => import('./admin/pages/Owners'));
const AdminSettings = lazy(() => import('./admin/pages/Settings'));
const AdminProfile = lazy(() => import('./admin/pages/AdminProfile'));

// Voter Lazy Routes
const VoterLayout = lazy(() => import('./voter/layout/VoterLayout'));
const VoterDashboard = lazy(() => import('./voter/pages/Dashboard'));
const ElectionWorkspace = lazy(() => import('./voter/pages/ElectionWorkspace'));
const Calendar = lazy(() => import('./voter/pages/Calendar'));
const ResultsPage = lazy(() => import('./voter/pages/ResultsPage'));
const VoterSettings = lazy(() => import('./voter/pages/Settings'));

// Public Route (Redirect if already logged in)
const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <PageSkeleton />;
    if (user) {
        return <Navigate to={user.role === 'admin' ? "/admin" : "/dashboard"} replace />;
    }
    return children;
};

// Simple Protected Route
const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <PageSkeleton />;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    if (role && user.role !== role) {
        // Redirect based on role to avoid infinite loops
        if (user.role === 'admin' && role !== 'admin') {
            return <Navigate to="/admin" />;
        }
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <HelmetProvider>
            <Router>
                <AuthProvider>
                    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans">
                                <Toaster position="top-right" />
                                <SpeedInsights />
                                <Suspense fallback={<PageSkeleton />}>
                                    <Routes>
                                        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                                        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                                        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                                        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                                        <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
                                        <Route path="/auth/verify-login" element={<VerifyLogin />} />

                                        <Route path="/admin" element={
                                            <ProtectedRoute role="admin">
                                                <AdminLayout />
                                            </ProtectedRoute>
                                        }>
                                            <Route index element={<Navigate to="dashboard" replace />} />
                                            <Route path="dashboard" element={
                                                <Suspense fallback={<DashboardSkeleton />}>
                                                    <AdminDashboard />
                                                </Suspense>
                                            } />
                                            <Route path="elections" element={<AdminElections />} />
                                            <Route path="elections/:id" element={<AdminElectionDetails />} />
                                            <Route path="candidates" element={<AdminCandidates />} />
                                            <Route path="voters" element={<AdminVoters />} />
                                            <Route path="owners" element={<AdminOwners />} />
                                            <Route path="monitoring" element={<AdminMonitoring />} />
                                            <Route path="results" element={<AdminResults />} />
                                            <Route path="blockchain" element={<AdminBlockchain />} />
                                            <Route path="audit" element={<AdminAudit />} />
                                            <Route path="settings" element={<AdminSettings />} />
                                            <Route path="profile" element={<AdminProfile />} />
                                        </Route>

                                        {/* Voter Routes */}
                                        <Route element={
                                            <ProtectedRoute role="user">
                                                <VoterLayout />
                                            </ProtectedRoute>
                                        }>
                                            <Route path="dashboard" element={
                                                <Suspense fallback={<DashboardSkeleton />}>
                                                    <VoterDashboard />
                                                </Suspense>
                                            } />
                                            <Route path="election/:id" element={<ElectionWorkspace />} />
                                            <Route path="activity" element={<Calendar />} />
                                            <Route path="results" element={<ResultsPage />} />
                                            <Route path="settings" element={<VoterSettings />} />
                                            <Route path="profile" element={<VoterSettings />} />
                                        </Route>

                                        <Route path="*" element={<Navigate to="/" />} />
                                    </Routes>
                                </Suspense>
                            </div>
                        </AuthProvider>
                    </Router>
                </HelmetProvider>
    );
}

export default App;