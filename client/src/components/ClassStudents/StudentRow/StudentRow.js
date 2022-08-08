import { useState } from 'react';
import styles from './student-row.module.css';
import * as gradeService from '../../../services/gradeService'
import GradeItem from './GradeItem/GradeItem';

function StudentRow({
    student,
    subject
}) {
    const [studentInfo, setStudentInfo] = useState(student);

    const addGradeHandler = (e) => {
        const id = e.target.parentElement.parentElement.id;
        const data = { grade: e.target.textContent, subject: subject, id };

        gradeService.add(data)
            .then(result => {
                if (student.grades[subject]) {
                    setStudentInfo(state => ({
                        ...state,
                        ...state.grades[subject].push({ grade: result.grade, _id: result.gradeId }),
                    }));
                } else {
                    setStudentInfo(state => ({
                        ...state,
                        ...state.grades[subject] = [{ grade: result.grade, _id: result.gradeId }],
                    }));
                }

            });
        
        console.log('StudentRow ', studentInfo);
    }

    return (
        <tr key={student._id} id={student._id}>
            <td className={styles['td-name']}>{student.firstName} {student.lastName}</td>
            {student.grades[subject]
                ?
                <td className={styles['td-grades']}>{student.grades[subject].map(x => <GradeItem key={x._id} gradeInfo={x} />)}</td>
                :
                <td className={styles['td-grades']}>No grades yet</td>
            }
            <td className={styles['td-evaluate']}>
                <button onClick={addGradeHandler} className={styles['six']}>6</button>
                <button onClick={addGradeHandler} className={styles['five']}>5</button>
                <button onClick={addGradeHandler} className={styles['four']}>4</button>
                <button onClick={addGradeHandler} className={styles['three']}>3</button>
                <button onClick={addGradeHandler} className={styles['two']}>2</button>
            </td>
        </tr>
    );
}

export default StudentRow;