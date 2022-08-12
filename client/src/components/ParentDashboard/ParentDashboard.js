import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as parentService from '../../services/parentService';
import * as studentService from '../../services/studentService';
import * as gradeService from '../../services/gradeService';
import * as reviewService from '../../services/reviewService';

import { AuthContext } from '../../contexts/AuthContext';

import styles from './parent-dashboard.module.css';

function ParentDashboard() {
    const [parent, setParent] = useState({});

    const [gradesCount, setGradesCount] = useState(0);
    const [averageGrade, setAverageGrade] = useState(0);
    const [reviewsCount, setreviewsCount] = useState(0);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadData() {
            const parentInfo = await parentService.getMe(user._id)
            setParent(parentInfo);

            const studentInfo = await studentService.getMeByEmail(parentInfo.studentEmail);

            const grades = await gradeService.getCountForStudent(studentInfo.userId);
            setGradesCount(grades.count);
            setAverageGrade(grades.average);

            const reviews = await reviewService.getStudentReviews(studentInfo.userId);
            setreviewsCount(reviews.length);
        }

        loadData();
    }, [user]);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['welcome']}>
                <span>Welcome</span>
                <span>{user.name},</span>
                <span>parent of</span>
                <span>{parent.email}</span>
            </div>

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

                <div className={styles['reviews-info']}>
                    <div>
                        <p className={styles['info-title']}>Total reviews:</p>
                        <p className={styles['info-number']}>{reviewsCount}</p>
                    </div>
                    <div className={styles['links']}>
                        <Link to='reviews' className={styles['link-orange']}>See reviews</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ParentDashboard;