import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaAt, FaHouseUser, FaUserAlt } from 'react-icons/fa';

import * as authService from '../../../services/authService';
import { AuthContext } from '../../../contexts/AuthContext';

import InputBlock from '../InputBlock/InputBlock';

import styles from './register.module.css';

function Register() {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        studentEmail: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        alreadyTakenEmail: '',
        studentEmail: '',
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        if (errors.firstName || errors.lastName || errors.email || errors.password || errors.studentEmail) {
            return;
        }

        values['role'] = 'parent';

        try {
            const authData = await authService.register(values);

            if (!authData.role && !authData.role && authData.message) {
                throw new Error(authData.message);
            }

            userLogin(authData);
            navigate('/dashboard');
        } catch (error) {
            setErrors(state => ({
                ...state,
                alreadyTakenEmail: error.message
            }));
        }
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
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

    const nameValidator = (e) => {
        const name = e.target.value;
        let errorMessage = '';

        if (name.length < 2) {
            errorMessage = 'Name must be at least 2 characters.'
        } else if (name.length > 16) {
            errorMessage = 'Name can be max 16 characters.'
        }

        setErrors(state => ({
            ...state,
            [e.target.name]: errorMessage,
        }));
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


    return (
        <div className={styles['register-form']}>
            <form onSubmit={submitHandler}>
                <InputBlock
                    value={values.firstName}
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    icon={FaUserAlt}
                    changeHandler={changeHandler}
                    validator={nameValidator}
                />

                {errors.firstName &&
                    <div className={styles['error']}>{errors.firstName}</div>
                }

                <InputBlock
                    value={values.lastName}
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    icon={FaHouseUser}
                    changeHandler={changeHandler}
                    validator={nameValidator}
                />

                {errors.lastName &&
                    <div className={styles['error']}>{errors.lastName}</div>
                }

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
                    value={values.password}
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

                <InputBlock
                    value={values.studentEmail}
                    name="studentEmail"
                    placeholder="Student email"
                    type="email"
                    icon={FaAt}
                    changeHandler={changeHandler}
                    validator={emailValidator}
                />

                {errors.alreadyTakenEmail &&
                    <div className={styles['email-error']}>{errors.alreadyTakenEmail}</div>
                }

                <img className={styles['image']} src="https://svgsilh.com/svg/2802840.svg" alt="person img" />
                <button
                    type="submit"
                    className={styles['submit-btn']}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;