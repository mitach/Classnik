import styles from './review-item.module.css';

function ReviewItem({review}) {
    
    const styler = (type) => {
        if (type == 'Compliment') {
            return 'compliment';
        } else if (type == 'Complaint') {
            return 'complaint';
        }
    }

    return (
        <div className={styles[styler(review.type)]}>
            <h3 className={styles['subject']}>{review.subject}</h3>
            <p>{review.expression}</p>
            <p className={styles['type']}>{review.type}</p>
        </div>
    );
}

export default ReviewItem;