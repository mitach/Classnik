import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './statistics.module.css';

import * as teacherService from '../../../services/teacherService';
import * as classService from '../../../services/classService';
import * as studentService from '../../../services/studentService';
import * as gradeService from '../../../services/gradeService';
import * as parentService from '../../../services/parentService';

function Statistics() {
    const [teachersCount, setTeachersCount] = useState(0);
    const [classesCount, setClassesCount] = useState(0);
    const [studentsCount, setStudentsCount] = useState(0);
    const [gradesCount, setGradesCount] = useState(0);
    const [parentCount, setParentCount] = useState(0);
    
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

        gradeService.getCount()
            .then(count => {
                setGradesCount(count);
            })
        
        parentService.getCount()
            .then(count => {
                setParentCount(count);
            })
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['info']}>
                <div className={styles['students-info']}>
                    <div>
                        <p className={styles['info-title']}>Total students:</p>
                        <p className={styles['info-number']}>{studentsCount}</p>
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
                        <Link to='/dashboard/manage-teachers' className={styles['link-green']}>See all</Link>
                    </div>
                </div>

                <div className={styles['classes-info']}>
                    <div>
                        <p className={styles['info-title']}>Total classes:</p>
                        <p className={styles['info-number']}>{classesCount}</p>
                    </div>
                    <div className={styles['links']}>
                        <Link to='/dashboard/add-class' className={styles['link-salmon']}>See all</Link>
                    </div>
                </div>

                <div className={styles['grades-info']}>
                    <div>
                        <p className={styles['info-title']}>Total grades:</p>
                        <p className={styles['info-number']}>{gradesCount}</p>
                    </div>
                </div>

                <div className={styles['parents-info']}>
                    <div>
                        <p className={styles['info-title']}>Total parents:</p>
                        <p className={styles['info-number']}>{parentCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;