import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as teacherService from '../../services/teacherService';
import { generateEmail } from '../../utils/generateEmail';
import { generatePassword } from '../../utils/generatePassword';

import TeacherList from './TeacherList/TeacherList';

import styles from './manage-teachers.module.css'

function ManageTeachers() {
    const [isEmpty, setIsEmpty] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [teacherCount, setTeacherCount] = useState(0);

    useEffect(() => {
        teacherService.getCount()
            .then(count => {
                setTeacherCount(count);
            });

        teacherService.getAll()
            .then(teachersArr => {
                setTeachers(teachersArr);
            });
    }, []);

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

        teacherService.create(values)
            .then(result => {
                setTeacherCount(teacherCount + 1);
                setTeachers(state => [
                    ...state,
                    result
                ]);
            });

        e.target.children[0].children[1].value = '';
        e.target.children[2].children[0].value = '';
        e.target.children[2].children[1].value = '';
    }

    const delTeacherHandler = (e) => {
        teacherService.remove(e.target.id)
            .then(removedTeacherId => {
                setTeacherCount(teacherCount - 1);
                setTeachers(state => state.filter(x => x._id !== removedTeacherId));
            });
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

            <div className={styles['info']}>
                Current Teachers: <span className={styles['info-num']}>{teacherCount}</span>
            </div>

            <TeacherList teachers={teachers} delTeacherHandler={delTeacherHandler} />
            
        </div >
    );
}

export default ManageTeachers;