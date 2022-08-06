import { useEffect, useState } from 'react';

import styles from './admin-dashboard.module.css';

import * as teacherService from '../../services/teacherService';
import * as classService from '../../services/classService';
import * as studentService from '../../services/studentService';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [teachersCount, setTeachersCount] = useState(0);
    const [classesCount, setClassesCount] = useState(0);
    const [studentsCout, setStudentsCount] = useState(0);

    useEffect(() => {
        teacherService.getCount()
            .then(count => {
                setTeachersCount(count);
            });

        classService.getCount()
            .then(count => {
                setClassesCount(count);
            });

        studentService.getCount()
            .then(count => {
                setStudentsCount(count);
            });
    }, []);
    return (
        <div className={styles['wrapper']}>
            <div className={styles['info']}>
                <div className={styles['students-info']}>
                    <div>
                        <p className={styles['info-title']}>Total students:</p>
                        <p className={styles['info-number']}>{studentsCout}</p>
                    </div>
                    <div className={styles['links']}>
                        <Link to='/dashboard/add-student' className={styles['link-blue']}>Add</Link>
                    </div>
                </div>

                <div className={styles['teachers-info']}>
                    <div>
                        <p className={styles['info-title']}>Total teachers:</p>
                        <p className={styles['info-number']}>{teachersCount}</p>
                    </div>
                    <div className={styles['links']}>
                        <Link to='/dashboard/manage-teachers' className={styles['link-green']}>Add</Link>
                        <Link to='/dashboard/manage-teachers' className={styles['link-green']}>See all</Link>
                    </div>
                </div>

                <div className={styles['classes-info']}>
                    <div>
                        <p className={styles['info-title']}>Total classes:</p>
                        <p className={styles['info-number']}>{classesCount}</p>
                    </div>
                    <div className={styles['links']}>
                        <Link to='/dashboard/add-class' className={styles['link-salmon']}>Add</Link>
                        <Link to='/dashboard/add-class' className={styles['link-salmon']}>See all</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;