import { useContext, useEffect, useState } from 'react';

import * as parentService from '../../services/parentService';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './parent-dashboard.module.css';

function ParentDashboard() {
    const [studentEmail, setStudentEmail] = useState('');

    const {user} = useContext(AuthContext);

    useEffect(() => {
        parentService.getMe(user._id)
            .then(result => {
                setStudentEmail(result.studentEmail);
            });
    }, [user]);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['welcome']}>
                <span className={styles['span']}>Welcome</span>
                <span className={styles['span-variable']}>{user.name},</span>
                <span className={styles['span']}>parent of</span>
                <span className={styles['span-variable']}>{studentEmail}</span>
            </div>
        </div>
    );
}

export default ParentDashboard;