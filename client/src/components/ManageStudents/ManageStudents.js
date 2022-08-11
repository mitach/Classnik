import { useEffect, useState } from "react";

import * as studentService from '../../services/studentService';

import styles from './manage-students.module.css';

function ManageStudents() {
    const [pageSize, setPageSize] = useState(5);
    const [currPage, setCurrPage] = useState(1);
    const [students, setStudents] = useState([]);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        studentService.getCount()
            .then(result => {
                setPages(Math.ceil(result / pageSize));
            });

        studentService.getStudents(pageSize, currPage)
            .then(result => {
                setStudents(result);
            });

    }, [currPage, pageSize]);

    const nextPageHandler = () => {
        setCurrPage(currPage + 1);
    }

    const previousPageHandler = () => {
        if (!(currPage - 1 < 1)) {
            setCurrPage(currPage - 1);
        }
    }

    const pageSizeHandler = (e) => {
        setPageSize(e.target.textContent);
    }

    const delStudentHandler = (e) => {
        studentService.remove(e.target.id)
            .then(removedStudentId => {
                setStudents(state => state.filter(x => x._id !== removedStudentId));
            });
    }

    return (
        <div className={styles['wrapper']}>
            <h1>Students</h1>

            <div className={styles['students-container']}>

                <table>
                    <tbody>
                        {students.map(x => <tr key={x._id}>
                            <td className={styles['td-name']}>{x.firstName} {x.lastName}</td>
                            <td className={styles['td']}>{x.studentClass}</td>
                            <td className={styles['td']}>
                                <button id={x._id} onClick={delStudentHandler} className={styles['del-btn']}>X</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>

                <div className={styles['size-options']}>
                    <span>Page Size</span>
                    <button onClick={pageSizeHandler} className={styles['size-btn']}>5</button>
                    <button onClick={pageSizeHandler} className={styles['size-btn']}>10</button>
                    <button onClick={pageSizeHandler} className={styles['size-btn']}>15</button>
                </div>

                {pages > 1 &&
                    <>
                        <button onClick={previousPageHandler} disabled={currPage < pages}>prev</button>
                        <button onClick={nextPageHandler} disabled={currPage >= pages}>next</button>
                    </>
                }
                <p>pages: {pages}</p>
            </div>
        </div>

    );
}

export default ManageStudents;