import { useState } from 'react';

import * as adminService from '../../services/adminService';
import { generateEmail } from '../../utils/generateEmail';
import { generatePassword } from '../../utils/generatePassword';

import styles from './add-teacher.module.css'

function AddTeacher() {
    const [isEmpty, setIsEmpty] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.target));

        values['email'] = generateEmail(values.firstName, values.lastName);
        values['password'] = generatePassword(values.firstName, values.lastName);
        values['role'] = 'teacher';

        setEmail(values.email);
        setPassword(values.password);

        if (!values.subject || !values.firstName || !values.lastName) {
            setIsEmpty(true);
            return;
        } else {
            setIsEmpty(false);
        }

        adminService.createTeacher(values)
            .then(result => console.log(result));

        e.target.children[0].children[1].value = '';
        e.target.children[2].children[0].value = '';
        e.target.children[2].children[1].value = '';
    }

    return (
        <div className={styles['container']}>
            {email && password && !isEmpty &&
                <div className={styles['credentials-container']}>
                    <p className={styles['bolded']}>Generated Credentials:</p>
                    <p>Email: <span>{email}</span></p>
                    <p>Password: <span>{password}</span></p>
                </div>

            }
            <div className={styles['form-wrapper']}>
                <form onSubmit={onSubmit}>
                    <div>
                        <p className={styles['label']}>Subject</p>
                        <input type="text" name="subject" className={styles['input-long']} placeholder='Subject' />
                    </div>
                    <p className={styles['label']}>Names of the Teacher</p>
                    <div className={styles['input-div']}>
                        <input type="text" name="firstName" className={styles['input']} placeholder='First Name' />
                        <input type="text" name="lastName" className={styles['input']} placeholder='Last Name' />
                    </div>
                    {isEmpty && <p className={styles['error']}>Plese enter all fields</p>}
                    <button type="submit" className={styles['btn']}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddTeacher;