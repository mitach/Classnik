import { useContext, useEffect, useState } from "react";

import * as reviewService from '../../services/reviewService';
import * as parentService from '../../services/parentService';
import { AuthContext } from "../../contexts/AuthContext";

import styles from './reviews.module.css';
import ReviewItem from "./ReviewItem/ReviewItem";

function Reviews() {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            if (user.role === 'student') {

                reviewService.getStudentReviews(user._id)
                    .then(result => {
                        setReviews(result);
                    });
            } else if (user.role === 'parent') {
                const student = await parentService.getStudentOfParent(user._id);

                reviewService.getStudentReviews(student._id)
                    .then(result => {
                        setReviews(result);
                    });
            }
        }

        fetchReviews();
    }, [user]);

    return (
        <div className={styles['wrapper']}>
            {reviews.map(x => <ReviewItem key={x._id} review={x} />)}
            {reviews.length === 0 && <p className={styles['no-grades']}>No Reviews yet</p>}
        </div>
    );
}

export default Reviews;