import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaAt } from 'react-icons/fa';

import * as authService from '../../../services/authService';
import { AuthContext } from '../../../contexts/AuthContext';

import InputBlock from '../InputBlock/InputBlock';

import styles from './login.module.css';

function Login() {
    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        message: '',
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (errors.email || errors.password) {
            return;
        }

        // authService.login(values)
        //     .then(authData => {
        //         userLogin(authData);
        //         navigate('/dashboard');
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        try {
            const authData = await authService.login(values);

            if (!authData.role && !authData.role && authData.message) {
                throw new Error(authData.message);
            }

            userLogin(authData);
            navigate('/dashboard');
        } catch (error) {
            setErrors(state => ({
                ...state,
                message: error.message,
            }));
        }
    }

    const emailValidator = (e) => {
        const email = e.target.value;
        const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let errorMessage = '';

        if (!email.match(validEmailRegex)) {
            errorMessage = 'Email is not valid.';
        }

        setErrors(state => ({
            ...state,
            [e.target.name]: errorMessage,
        }));
    }

    const passwordValidator = (e) => {
        const password = e.target.value;
        let errorMessage = '';

        if (password.length < 6) {
            errorMessage = 'Password length must be at least 6 characters.';
        } else if (password.length > 18) {
            errorMessage = 'Password length can be max 18 characters.';
        }

        setErrors(state => ({
            ...state,
            [e.target.name]: errorMessage,
        }));
    }

    return (
        <div className={styles['login-form']}>
            <form onSubmit={submitHandler}>
                <img className={styles['image']} src="https://i.pinimg.com/originals/36/47/41/364741529064fa6f0ecdd12bfa10b0b4.png" alt="person img" />
                <InputBlock
                    value={values.email}
                    name="email"
                    placeholder="Email"
                    type="email"
                    icon={FaAt}
                    changeHandler={changeHandler}
                    validator={emailValidator}
                />

                {errors.email &&
                    <div className={styles['error']}>{errors.email}</div>
                }

                <InputBlock
                    valueUsername={values.password}
                    name="password"
                    placeholder="Password"
                    type="password"
                    icon={FaLock}
                    changeHandler={changeHandler}
                    validator={passwordValidator}
                />

                {errors.password &&
                    <div className={styles['error']}>{errors.password}</div>
                }

                {
                    errors.message && 
                    <div className={styles['error-message']}>{errors.message}</div>
                }

                <button
                    type="submit"
                    className={styles['submit-btn']}
                >
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;