import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContext } from './contexts/AuthContext';

import Auth from './components/Auth/Auth';

import HomePage from './components/HomePage/HomePage';
import AdminLayout from './pages/Admin/Layout';
import ParentLayout from './pages/Parent/Layout';
import StudentLayout from './pages/Student/Layout';
import TeacherLayout from './pages/Teacher/Layout';

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
                        <Route path='/dashboard/*' element={<AdminLayout />} />
                    }

                    {role === 'parent' && 
                        <Route path='/dashboard/*' element={<ParentLayout />} />
                    }

                    {role === 'student' && 
                        <Route path='/dashboard/*' element={<StudentLayout />} />
                    }
                    
                    {role === 'teacher' && 
                        <Route path='/dashboard/*' element={<TeacherLayout />} />
                    }

                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
