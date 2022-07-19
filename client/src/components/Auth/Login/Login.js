import { useState } from 'react';
import { FaLock, FaAt } from 'react-icons/fa';

import InputBlock from '../InputBlock/InputBlock';

import styles from './login.module.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(values);
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
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
                />

                <InputBlock
                    valueUsername={values.password}
                    name="password"
                    placeholder="Password"
                    type="password"
                    icon={FaLock}
                    changeHandler={changeHandler}
                />

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