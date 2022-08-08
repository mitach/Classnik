import styles from './grade-item.module.css';

import { styleDecider } from '../../../../utils/styleDeciders';

function GradeItem({ gradeInfo }) {
    console.log('gradeItem ', gradeInfo)
    return (
        <span className={styles[`${styleDecider(gradeInfo.grade)}`]} key={gradeInfo._id}>{gradeInfo.grade}</span>
    );
}

export default GradeItem;