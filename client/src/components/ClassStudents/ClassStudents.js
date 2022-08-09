import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import * as teacherService from '../../services/teacherService';
import * as classService from '../../services/classService';
import { AuthContext } from '../../contexts/AuthContext';

import StudentRow from './StudentRow/StudentRow';



import styles from './class-students.module.css';

function ClassStudents() {
    const [subject, setSubject] = useState('');
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

    return (
        <div>
            <header className={styles['header']}>
                <Link to='/dashboard/classes' className={styles['link']}><FaArrowAltCircleLeft /></Link>
                <h2>{subject}</h2>
                <span className={styles['delete-guide']}>*delete grades by double clicking on them</span>
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
                        {students.map(student => <StudentRow key={student._id} student={student} subject={subject} />)}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ClassStudents;