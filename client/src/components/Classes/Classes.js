import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as classService from '../../services/classService';

import { FaSearchPlus } from 'react-icons/fa';

import styles from './classes.module.css';

function Classes() {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        classService.getClasses()
            .then(result => {
                setClasses(result.classes);
            });
    }, []);


    return (
        <div className={styles['wrapper']}>
            <table>

                <tbody>
                    {classes.map(x =>
                        <tr key={x._id}>
                            <td className={styles['class-name']}>{x.name}</td>
                            <td>{x.students.length} students</td>
                            <td ><Link to={`${x._id}`} className={styles['link']}><FaSearchPlus /></Link></td>
                        </tr>
                    )}

                </tbody>

            </table>
        </div>
    );
}

export default Classes;