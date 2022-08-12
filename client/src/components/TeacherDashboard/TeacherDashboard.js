import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import * as teacherService from '../../services/teacherService';

import styles from './teacher-dashboard.module.css';

function TeacherDashboard() {
    const { user } = useContext(AuthContext);
    const [teacher, setTeacher] = useState({});

    useEffect(() => {
        teacherService.getMe(user._id)
            .then(result => {
                setTeacher(result)
            })
    }, [user]);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['welcome']}>
                <span>Welcome</span>
                <span>{user.name},</span>
                <span>teacher of</span>
                <span>{teacher.subject}</span>
            </div>
        </div>
    );
}

export default TeacherDashboard;