import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import * as studentService from '../../services/studentService';
import * as parentService from '../../services/parentService';
import * as teacherService from '../../services/teacherService';
import * as authService from '../../services/authService';

import styles from './profile.module.css';

function Profile() {
    const { userId } = useParams();
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user.role === 'student') {
            studentService.getMe(userId)
                .then(result => {
                    setUserInfo(result)
                });
        } else if (user.role === 'parent') {
            parentService.getMe(userId)
                .then(result => {
                    setUserInfo(result)
                });
        } else if (user.role === 'teacher') {
            teacherService.getMe(userId)
                .then(result => {
                    setUserInfo(result);
                });
        } else if (user.role === 'admin') {
            setUserInfo({ firstName: 'Admin', lastName: 'Admin', email: 'admin@npgpto.bg' });
        }

    }, [user, userId]);

    const submitHandler = async (e) => {
        e.preventDefault();

        let values = Object.fromEntries(new FormData(e.target));

        if (values.newPassword.length < 6) {
            setError('New passwords should be 6 or more charachters!');

            setTimeout(() => {
                setError('');
            }, 2500);

            return;
        }

        if (values.newPassword !== values.rePassword) {
            setError('New passwords mismatch!');

            setTimeout(() => {
                setError('');
            }, 2500);

            return;
        }

        try {
            const result = await authService.changePassword(userId, values);

            if (result.message && !result.success) {
                throw new Error(result.message);
            } else if (result.success && !result.message) {
                setSuccess('Successfully updated password!');

                setTimeout(() => {
                    setSuccess('');
                }, 2500);
            }

            document.getElementById("reset-pass-form").reset();

        } catch (error) {
            setError(error.message);

            setTimeout(() => {
                setError('');
            }, 2500);
        }
    }

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

                {userInfo?.studentEmail ?
                    <div className={styles['info-row']}>
                        <span>Student Email:</span> <span className={styles['span-info']}>{userInfo?.studentEmail}</span>
                    </div>
                    : ''
                }

                {userInfo?.subject ?
                    <div className={styles['info-row']}>
                        <span>Subject:</span> <span className={styles['span-info']}>{userInfo?.subject}</span>
                    </div>
                    : ''
                }
            </div>

            <div className={styles['çhange-pass']}>
                <h2>Change password</h2>

                <form id="reset-pass-form" onSubmit={submitHandler}>

                    <div className={styles['pass-input']}>
                        <label>Current Password</label>
                        <input name="currentPassword" type="password" />
                    </div>

                    <div className={styles['pass-input']}>
                        <label>New Password</label>
                        <input name="newPassword" type="password" />
                    </div>

                    <div className={styles['pass-input']}>
                        <label>Repeat new password</label>
                        <input name="rePassword" type="password" />
                    </div>

                        <button type="submit" className={styles['submit-btn']}>Save</button>
                </form>
                {error && <span className={styles['error']}>{error}</span>}
                {success && <span className={styles['success']}>{success}</span>}
            </div>
        </div>
    );
}

export default Profile;