import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import * as gradeService from '../../services/gradeService';

import styles from './student-dashboard.module.css';

function StudentDashboard() {
    const { user } = useContext(AuthContext);

    const [gradesCount, setGradesCount] = useState(0);
    const [averageGrade, setAverageGrade] = useState(0);

    useEffect(() => {
        gradeService.getCountForStudent(user._id)
            .then(result => {
                setGradesCount(result.count);
                setAverageGrade(result.average);
            });
    }, []);


    return (
        <div className={styles['wrapper']}>
            <div className={styles['info']}>
                <div className={styles['grades-info']}>
                    <div>
                        <p className={styles['info-title']}>Total grades:</p>
                        <p className={styles['info-number']}>{gradesCount}</p>
                    </div>
                    <div className={styles['links']}>
                        <Link to='diary' className={styles['link-blue']}>See all</Link>
                    </div>
                </div>
                <div className={styles['average-info']}>
                    <div>
                        <p className={styles['info-title']}>Average grade:</p>
                        <p className={styles['info-number']}>{averageGrade}</p>
                    </div>
                    <div className={styles['links']}>
                        <Link to='diary' className={styles['link-green']}>See grades</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;