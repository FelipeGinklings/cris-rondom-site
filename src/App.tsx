import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Calendar from './pages/Calendar';
import Clients from './pages/Clients';
import DayDetails from './pages/DayDetails';
import Login from './pages/Login';
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import useNavigation from './hooks/useNavigation';
import Home from './pages/Home';

const LoginPage = () => {
    const { user } = useAuth();
    const { navigate } = useNavigation();

    useEffect(() => {
        if (user) navigate('/calendar');
    }, [navigate, user]);

    return <Login />;
};

const ProtectedRoutes = () => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/home" replace />;

    return <AppRoutes />;
};

function AppRoutes() {
    const { user, loading } = useAuth();
    if (!user) return <Login />;

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: 'rgb(193, 124, 85)' }}
            >
                <div className="text-white text-xl">Carregando...</div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendar/:date" element={<DayDetails />} />
            <Route path="/clients" element={<Clients />} />
            {/* <Route path="/templates" element={<Template />} /> */}
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/*" element={<ProtectedRoutes />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
