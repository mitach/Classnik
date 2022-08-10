import { useState } from 'react';

import * as reviewService from '../../../services/reviewService';

import styles from './student-row.module.css';

function StudentRow({
    student,
    subject
}) {

    const [review, setReview] = useState('');
    const [successFlag, setSuccessFlag] = useState(false);

    const changeHandler = (e) => {
        setReview(e.target.value);
    }

    const reviewHandler = (e) => {
        const data = {
            expression: review,
            subject,
            studentId: student._id,
            type: e.target.textContent
        }

        reviewService.create(data)
            .then(result => {
                setReview('');
                setSuccessFlag(true);
            });


        setTimeout(() => {
            setSuccessFlag(false);
        },  3000);
    }

    return (
        <>
            <tr key={student._id} id={student._id}>
                <td className={styles['td-name']}>{student.firstName} {student.lastName}</td>
                <td className={styles['td-input']}>
                    <input
                        className={styles['input']}
                        placeholder='Enter your expression...'
                        type="text"
                        name="review"
                        onChange={changeHandler}
                        value={review}
                    />
                </td>
                <td className={styles['td-actions']}>
                    <button className={styles['btn-compliment']} onClick={reviewHandler}>Compliment</button>
                    <button className={styles['btn-complaint']} onClick={reviewHandler}>Complaint</button>
                </td>
            </tr>

            {successFlag &&
                <tr className={styles['success-para']}>
                    <td className={styles['empty-data-left']}></td>
                    <td>Successfully sent a review to {student.firstName}!</td>
                    <td className={styles['empty-data-right']}></td>
                </tr>}
        </>
    );
}

export default StudentRow;