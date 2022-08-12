import { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContext } from './contexts/AuthContext';

import Auth from './components/Auth/Auth';

import HomePage from './components/HomePage/HomePage';

// import ParentLayout from './pages/Parent/Layout';
const ParentLayout = lazy(() => import('./pages/Parent/Layout'));
const TeacherLayout = lazy(() => import('./pages/Teacher/Layout'));
const StudentLayout = lazy(() => import('./pages/Student/Layout'));
const AdminLayout = lazy(() => import('./pages/Admin/Layout'));

function App() {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const [role, setRole] = useState(auth.role);

    const [loggedIn, setLoggedIn] = useState(() => {
        if (auth.name) {
            return true;
        } else {
            return false;
        }
    });

    const userLogin = (authData) => {
        setAuth(authData);
        setLoggedIn(true);
    }

    const userLogout = () => {
        setAuth({});
        setLoggedIn(false);
    }

    useEffect(() => {
        setRole(auth.role);
    }, [auth, loggedIn])

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div className="classnik-app">
                <Routes>
                    <Route path='/' element={loggedIn ? <Navigate to='/dashboard' /> : <HomePage />} />
                    <Route path='/login' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />
                    <Route path='/register' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />

                    {role === 'admin' &&
                        <Route path='/dashboard/*' element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <AdminLayout />
                            </Suspense>
                        } />
                    }

                    {role === 'parent' &&
                        <Route path='/dashboard/*' element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <ParentLayout />
                            </Suspense>
                        } />
                    }

                    {role === 'student' &&
                        <Route path='/dashboard/*' element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <StudentLayout />
                            </Suspense>
                        } />
                    }

                    {role === 'teacher' &&
                        <Route path='/dashboard/*' element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <TeacherLayout />
                            </Suspense>
                        } />
                    }

                    <Route path='/*' element={<h1>Page not found</h1>} />

                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
