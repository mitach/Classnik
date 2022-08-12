import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import * as studentService from '../../services/studentService';

import styles from './profile.module.css';

function Profile() {
    const { userId } = useParams();
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        if (user.role === 'student') {
            studentService.getMe(userId)
                .then(result => {
                    setUserInfo(result)
                });
        } else if (user.role === 'parent') {
            console.log('you are aa parent. Bluck')
        }
    }, [user, userId]);

    return (
        <div className={styles['wrapper']}>
            <h1 className={styles['heading']}>Profile Section</h1>
            <div className={styles['info']}>
                <h2>About me</h2>

                <div className={styles['info-row']}>
                    <span>Role:</span> <span className={styles['span-info']}>{user?.role}</span>
                </div>

                <div className={styles['info-row']}>
                    <span>Name:</span> <span className={styles['span-info']}>{userInfo?.firstName} {userInfo?.lastName}</span>
                </div>

                <div className={styles['info-row']}>
                    <span>Email:</span> <span className={styles['span-info']}>{userInfo?.email}</span>
                </div>

                {userInfo?.studentClass ?
                    <div className={styles['info-row']}>
                        <span>Student Class:</span> <span className={styles['span-info']}>{userInfo?.studentClass}</span>
                    </div>
                    : ''
                }
            </div>
        </div>
    );
}

export default Profile;