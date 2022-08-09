import { useContext, useEffect, useState } from 'react';

import * as studentService from '../../services/studentService';
import { AuthContext } from '../../contexts/AuthContext';

import { styleDecider } from '../../utils/styleDeciders';
import styles from './student-diary.module.css';

function StudentDiary() {
    const [grades, setGrades] = useState({});
    const [subjects, setSubjects] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        studentService.getMe(user._id)
            .then(result => {
                let subjectsArr = [];
                for (let key in result.grades) {
                    let avg = 0;
                    for (let grade of result.grades[key]) {
                        avg += Number(grade.grade);
                    }
                    avg = avg / Number(result.grades[key].length);
                    subjectsArr.push({ subject: key, avg });
                }
                setGrades(result.grades);
                setSubjects(subjectsArr);
            })
    }, []);

    return (
        <>
            {subjects.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Current Grades</th>
                            <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(x => (
                            <tr key={x.subject}>
                                <td className={styles['td-subject']}>{x.subject}</td>
                                <td className={styles['td-grades']}>{grades[x.subject].map(gradeInfo => <span className={styles[`${styleDecider(gradeInfo.grade)}`]} key={gradeInfo._id}>{gradeInfo.grade}</span>)}</td>
                                <td className={styles['td-average']}>{x.avg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {subjects.length == 0 && <p className={styles['no-grades']}>No Grades yet</p>}
        </>
    );
}

export default StudentDiary;