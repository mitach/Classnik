import styles from './grade-item.module.css';

import * as gradeService from '../../../../services/gradeService';

import { styleDecider } from '../../../../utils/styleDeciders';

function GradeItem({
    gradeInfo,
    setStudentInfo,
    subject
}) {

    const removeGradeHandler = (e) => {
        gradeService.remove(gradeInfo._id)
            .then(result => {
                setStudentInfo(state => ({
                    ...state,
                    ...state.grades[subject] = result.grades[subject],
                }));
    })
}

return (
    <span className={styles[`${styleDecider(gradeInfo.grade)}`]} onDoubleClick={removeGradeHandler} key={gradeInfo._id}>{gradeInfo.grade}</span>
);
}

export default GradeItem;