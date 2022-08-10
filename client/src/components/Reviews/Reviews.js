import { useContext, useEffect, useState } from "react";

import * as reviewService from '../../services/reviewService';
import { AuthContext } from "../../contexts/AuthContext";

import styles from './reviews.module.css';
import ReviewItem from "./ReviewItem/ReviewItem";

function Reviews() {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        reviewService.getStudentReviews(user._id)
            .then(result => {
                setReviews(result);
            })
    }, []);

    return (
        <div className={styles['wrapper']}>
            {reviews.map(x => <ReviewItem key={x._id} review={x} />)}
        </div>
    );
}

export default Reviews;