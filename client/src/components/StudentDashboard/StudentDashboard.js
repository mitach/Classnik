import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import * as gradeService from '../../services/gradeService';
import * as reviewService from '../../services/reviewService';
import * as studentService from '../../services/studentService';

import styles from './student-dashboard.module.css';

function StudentDashboard() {
    const { user } = useContext(AuthContext);

    const [gradesCount, setGradesCount] = useState(0);
    const [averageGrade, setAverageGrade] = useState(0);
    const [reviewsCount, setreviewsCount] = useState(0);
    const [student, setStudent] = useState({});

    useEffect(() => {
        studentService.getMe(user._id)
            .then(result => {
                setStudent(result);
            });

        gradeService.getCountForStudent(user._id)
            .then(result => {
                console.log(result)
                setGradesCount(result.count);
                setAverageGrade(result.average);
            });

        reviewService.getStudentReviews(user._id)
            .then(result => {
                setreviewsCount(result.length);
            });
        
    }, [user]);


    return (
        <div className={styles['wrapper']}>
            <div className={styles['welcome']}>
                <span>Welcome, </span> 
                <span>{student.firstName} {student.lastName}!</span>
                <span> Student in </span>
                <span>{student.studentClass}.</span>
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

export default StudentDashboard;