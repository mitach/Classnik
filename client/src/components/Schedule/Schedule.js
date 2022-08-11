import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import * as studentService from '../../services/studentService';
import * as parentService from '../../services/parentService';
import * as classService from '../../services/classService';

import styles from './schedule.module.css'

function Schedule() {
    const { user } = useContext(AuthContext);
    const [scheduleRaw, setScheduleRaw] = useState({});

    useEffect(() => {
        if (user.role === 'student') {
            studentService.getMe(user._id)
                .then(result => {
                    classService.getClass(result.studentClass)
                        .then(classInfo => {
                            setScheduleRaw(classInfo.schedule);
                        });
                });
        } else if (user.role === 'parent') {
            parentService.getStudentOfParent(user._id)
                .then(student => {
                    classService.getClass(student.studentClass)
                        .then(classInfo => {
                            setScheduleRaw(classInfo.schedule);
                        });
                });
        }
    }, [user]);

    return (
        <>
            <h1 className={styles['title']}>Schedule</h1>
            {scheduleRaw.Monday
                ? <div className={styles['schedule-container']}>
                    <div className={styles['schedule-day']}>
                        <h2 className={styles['schedule-title']}>Monday</h2>
                        <p>{scheduleRaw.Monday}</p>
                    </div>

                    <div className={styles['schedule-day']}>
                        <h2 className={styles['schedule-title']}>Tuesday</h2>
                        <p>{scheduleRaw.Tuesday}</p>
                    </div>

                    <div className={styles['schedule-day']}>
                        <h2 className={styles['schedule-title']}>Wednesday</h2>
                        <p>{scheduleRaw.Wednesday}</p>
                    </div>

                    <div className={styles['schedule-day']}>
                        <h2 className={styles['schedule-title']}>Thursday</h2>
                        <p>{scheduleRaw.Thursday}</p>
                    </div>

                    <div className={styles['schedule-day']}>
                        <h2 className={styles['schedule-title']}>Friday</h2>
                        <p>{scheduleRaw.Friday}</p>
                    </div>
                </div>
                : <h2 className={styles['title']}>Schedule not uploaded yet!</h2>}
        </>
    );
}

export default Schedule;