import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as adminService from '../../services/adminService';

import styles from './add-student-class.module.css';

function AddStudentClass() {
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

        const studentClass = Object.fromEntries(new FormData(e.target));


        if (studentClass.name == '') {
            setIsEmpty(true);
            return;
        } else {
            setIsEmpty(false);
        }

        adminService.createClass(studentClass)
            .then(result => {
                setClasses(state => [
                    ...state,
                    {
                        _id: result._id,
                        name: result.name
                    }
                ])
            });

        e.target.children[0].value = '';
    }

    return (
        <div className={styles['container']}>
            <div className={styles['form-wrapper']}>
                <p className={styles['label']}>Name of Student Class</p>
                <form onSubmit={onSubmit}>
                    <input type="text" name="name" className={styles['input']} />
                    {isEmpty && <p className={styles['error']}>Plese enter a class name</p>}
                    <button type="submit" className={styles['btn']}>Submit</button>
                </form>
            </div>
            <h2>Existing Student Classes</h2>
            <ul>
                {classes.map(x => <Link to={`/dashboard/add-class/${x._id}`} key={x._id} className={styles['link']}>{x.name}</Link>)}
            </ul>
        </div>
    );
}

export default AddStudentClass;