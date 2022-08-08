import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaZhihu } from 'react-icons/fa';

import * as teacherService from '../../services/teacherService';
import * as studentService from '../../services/studentService';
import * as classService from '../../services/classService';
import { TeacherContext } from '../../contexts/TeacherContext';
import { AuthContext } from '../../contexts/AuthContext';
import { styleDecider } from '../../utils/styleDeciders';

import uniqid from 'uniqid';

import styles from './class-students.module.css';

function ClassStudents() {
    const [subject, setSubject] = useState('');
    const { teacher } = useContext(TeacherContext);
    const { user } = useContext(AuthContext)
    const { id } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        teacherService.getMe(user._id)
            .then(result => {
                setSubject(result.subject)
            });

        classService.getClassStudents(id)
            .then(result => {
                setStudents(result);
            });
    }, []);

    const evaluateHandler = (e) => {
        const id = e.target.parentElement.parentElement.id;
        const data = { grade: e.target.textContent, subject: subject };

        studentService.addGrade(id, data)
            .then(result => {
                setStudents(state => state.map(x => x._id == result._id ? x.grades[subject] = result.grades : x.grades[subject]));
                window.location.reload();
            });
    }

    const GradesElement = ({ grades }) => {
        return (
            <>
                {grades?.map((grade, i) => <span className={styles[`${styleDecider(grade)}`]} key={i}>{grade}</span>)}
            </>
        );
    }

    return (
        <div>
            <header className={styles['header']}>
                <Link to='/dashboard/classes' className={styles['link']}><FaArrowAltCircleLeft /></Link>
                <h2>{subject}</h2>
            </header>

            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Current Grades</th>
                            <th>Add Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(x => (
                            <tr key={x._id} id={x._id}>
                                <td className={styles['td-name']}>{x.firstName} {x.lastName}</td>
                                <td className={styles['td-grades']}>{<GradesElement grades={x.grades[subject]} />}</td>
                                <td className={styles['td-evaluate']}>
                                    <button onClick={evaluateHandler} className={styles['six']}>6</button>
                                    <button onClick={evaluateHandler} className={styles['five']}>5</button>
                                    <button onClick={evaluateHandler} className={styles['four']}>4</button>
                                    <button onClick={evaluateHandler} className={styles['three']}>3</button>
                                    <button onClick={evaluateHandler} className={styles['two']}>2</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div >
    );
}

export default ClassStudents;