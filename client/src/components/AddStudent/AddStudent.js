import { useEffect, useState } from 'react';

import * as adminService from '../../services/adminService';
import { generateStudentEmail } from '../../utils/generateStudentEmail';
import { generateStudentPassword } from '../../utils/generateStudentPassword';

import styles from './add-student.module.css'

function AddStudent() {
    const [classes, setClasses] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        adminService.getClasses()
            .then(data => {
                setClasses(data.classes);
            });
    }, []);



    const onSubmit = (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.target));

        values['email'] = generateStudentEmail(values.firstName, values.lastName);
        values['password'] = generateStudentPassword(values.firstName, values.lastName);
        values['role'] = 'student';

        if (!values.firstName || !values.lastName) {
            setIsEmpty(true);
            return;
        } else {
            setIsEmpty(false);
        }

        adminService.createStudent(values)
            .then(result => console.log(result));

        e.target.children[1].value = '';
        e.target.children[2].value = '';
    }





    return (
        <div className={styles['container']}>
            <div className={styles['form-wrapper']}>
                <form onSubmit={onSubmit}>
                    <div>
                        <p className={styles['label']}>Choose Student Class</p>
                        <select name="studentClass" className={styles['select']}>
                            {classes.map(x => <option value={x.name} key={x._id}>{x.name}</option>)}
                        </select>
                    </div>
                    <p className={styles['label']}>Name of Student Class</p>
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