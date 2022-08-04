import { useEffect, useState } from 'react';

import * as adminService from '../../services/adminService';

import styles from './add-student.module.css'

function AddStudent() {
    const [classes, setClasses] = useState([]);
    let isEmpty = false;

    useEffect(() => {
        adminService.getClasses()
            .then(data => {
                setClasses(data.classes);
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.target));
        values['role'] = 'student';
        
        console.log(values);
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
                    {isEmpty && <p className={styles['error']}>Plese enter a class name</p>}
                    <button type="submit" className={styles['btn']}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;