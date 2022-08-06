import { useEffect, useState } from 'react';

import * as studentService from '../../services/studentService';
import * as classService from '../../services/classService'
import { generateEmail } from '../../utils/generateEmail';
import { generatePassword } from '../../utils/generatePassword';

import styles from './add-student.module.css'

function AddStudent() {
    const [classes, setClasses] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        classService.getClasses()
            .then(data => {
                setClasses(data.classes);
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.target));

        values['email'] = generateEmail(values.firstName, values.lastName);
        values['password'] = generatePassword(values.firstName, values.lastName);
        values['role'] = 'student';

        setEmail(values.email);
        setPassword(values.password);

        if (!values.firstName || !values.lastName) {
            setIsEmpty(true);
            return;
        } else {
            setIsEmpty(false);
        }

        studentService.create(values)

        e.target.children[2].children[0].value ='';
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
                        <p className={styles['label']}>Choose Student Class</p>
                        <select name="studentClass" className={styles['select']}>
                            {classes.map(x => <option value={x.name} key={x._id}>{x.name}</option>)}
                        </select>
                    </div>
                    <p className={styles['label']}>Names of the Student</p>
                    <div className={styles['input-div']}>
                        <input type="text" name="firstName" className={styles['input']} placeholder='First Name' />
                        <input type="text" name="lastName" className={styles['input']} placeholder='Last Name' />
                    </div>
                    {isEmpty && <p className={styles['error']}>Plese enter first and last name</p>}
                    <button type="submit" className={styles['btn']}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;