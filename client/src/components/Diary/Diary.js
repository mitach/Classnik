import { useContext, useEffect, useState } from 'react';
import { FaBook } from 'react-icons/fa'

import * as studentService from '../../services/studentService';
import * as parentService from '../../services/parentService';
import { AuthContext } from '../../contexts/AuthContext';

import { styleDecider } from '../../utils/styleDeciders';
import styles from './student-diary.module.css';

function Diary() {
    const [grades, setGrades] = useState({});
    const [subjects, setSubjects] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user.role === 'student') {
            studentService.getMe(user._id)
                .then(result => {
                    let subjectsArr = [];
                    for (let key in result.grades) {
                        let avg = 0;
                        for (let grade of result.grades[key]) {
                            avg += Number(grade.grade);
                        }
                        avg = (avg / Number(result.grades[key].length)).toFixed(2);
                        subjectsArr.push({ subject: key, avg });
                    }
                    setGrades(result.grades);
                    setSubjects(subjectsArr);
                });
        } else if (user.role === 'parent') {
            parentService.getStudentOfParent(user._id)
                .then(result => {
                    let subjectsArr = [];
                    for (let key in result.grades) {
                        let avg = 0;
                        for (let grade of result.grades[key]) {
                            avg += Number(grade.grade);
                        }
                        avg = (avg / Number(result.grades[key].length)).toFixed(2);
                        subjectsArr.push({ subject: key, avg });
                    }
                    setGrades(result.grades);
                    setSubjects(subjectsArr);
                });
        }
    }, [user]);

    return (
        <div>
            {subjects.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th className={styles['th-subject']}>Subject</th>
                            <th className={styles['th-curr-grades']}>Current Grades</th>
                            <th className={styles['th-avg']}>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(x => (
                            <tr key={x.subject}>
                                <td className={styles['td-subject']}><FaBook /> {x.subject}</td>
                                <td className={styles['td-grades']}>{grades[x.subject].map(gradeInfo => <span className={styles[`${styleDecider(gradeInfo.grade)}`]} key={gradeInfo._id}>{gradeInfo.grade}</span>)}</td>
                                <td className={styles['td-average']}>{x.avg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {subjects.length === 0 && <p className={styles['no-grades']}>No Grades yet</p>}
        </div>
    );
}

export default Diary;