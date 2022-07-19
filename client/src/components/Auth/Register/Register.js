import { useState } from 'react';
import { FaLock, FaAt, FaHouseUser, FaUserAlt } from 'react-icons/fa';

import InputBlock from '../InputBlock/InputBlock';

import styles from './register.module.css';

function Register() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
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
        <div className={styles['register-form']}>
            <form onSubmit={submitHandler}>
                <InputBlock
                    value={values.firstName}
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    icon={FaUserAlt}
                    changeHandler={changeHandler}
                />

                <InputBlock
                    value={values.lastName}
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    icon={FaHouseUser}
                    changeHandler={changeHandler}
                />

                <InputBlock
                    value={values.email}
                    name="email"
                    placeholder="Email"
                    type="email"
                    icon={FaAt}
                    changeHandler={changeHandler}
                />

                <img className={styles['image']} src="https://svgsilh.com/svg/2802840.svg" alt="person img" />
                
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
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;