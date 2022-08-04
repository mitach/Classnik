import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContext } from './contexts/AuthContext';

import Auth from './components/Auth/Auth';
// import Layout from "./components/Layout/Layout";

import AdminLayout from './pages/Admin/Layout';
import ParentLayout from './pages/Parent/Layout';

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
                    <Route path='/' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />
                    <Route path='/login' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />
                    <Route path='/register' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />

                    {role === 'admin' && 
                        <Route path='/dashboard/*' element={<AdminLayout />} />
                    }
                    {role === 'parent' && 
                        <Route path='/dashboard/*' element={<ParentLayout />} />
                    }

                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
