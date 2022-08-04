import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContext } from './contexts/AuthContext';

import * as authService from './services/authService';

import Auth from './components/Auth/Auth';
import Layout from "./components/Layout/Layout";

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

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div className="classnik-app">
                <Routes>
                    <Route path='/' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />
                    <Route path='/login' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />
                    <Route path='/register' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />
                    <Route path='/dashboard/*' element={loggedIn ? <Layout /> : <Auth />} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
