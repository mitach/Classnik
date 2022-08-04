import styles from './add-student-class.module.css';

function AddStudentClass() {

    const onSubmit = (e) => {
        e.preventDefault();
    
        const studentClass = Object.fromEntries(new FormData(e.target));

        console.log(studentClass);
    }

    return (
        <div className={styles['container']}>
            <div className={styles['form-wrapper']}>
                <p className={styles['label']}>Name of Student Class</p>
                <form onSubmit={onSubmit}>
                    <input type="text" name="studentClass" className={styles['input']} />
                    <button type="submit" className={styles['btn']}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddStudentClass;