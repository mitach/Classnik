import styles from './teacher-list.module.css';

function TeacherList({
    teachers,
    delTeacherHandler
}) {
    return (
        <div>
            <table className={styles['table']}>
                <thead>
                    <tr>
                        <th>Teacher</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(x => {
                        return (
                            <tr key={x._id}>
                                <td>{x.firstName} {x.lastName}</td>
                                <td>{x.subject}</td>
                                <td className={styles['actions']}><button id={x._id} onClick={delTeacherHandler} className={styles['del-btn']}>X</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TeacherList;