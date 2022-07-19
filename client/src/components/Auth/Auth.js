import { Link, useLocation } from 'react-router-dom';

import { FaPhone } from 'react-icons/fa';

import Login from './Login/Login';
import Register from './Register/Register';

import styles from './auth.module.css';

function Auth() {
    let location = useLocation();

    let loginStyleObj = {
        backgroundColor: location.pathname === '/' || location.pathname === '/login' ? '#3b4483' : '#214270'
    }

    let registerStyleObj = {
        backgroundColor: location.pathname === '/register' ? '#3b4483' : '#214270'
    }

    return (
        <div className={styles['background']}>
            <div className={styles['filter']}></div>

            <div className={styles['problem']}>
                <p>If a problem occurs</p>
                <div className={styles['number']}>
                    <FaPhone />
                    <p> (555) 555-1234</p>
                </div>
            </div>

            <div className={styles['auth-container']}>
                <div className={styles['auth-controller']}>
                    <Link to='/login' className={styles['controller-btn']} style={loginStyleObj}>Login</Link>
                    <Link to='/register' className={styles['controller-btn']} style={registerStyleObj}>Register</Link>
                </div>

                <div className={styles['auth-form']}>
                    {location.pathname === '/register' ? <Register /> : <Login />}
                </div>
            </div>
        </div>
    );
}

export default Auth;