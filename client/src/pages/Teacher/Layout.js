import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';

import Classes from '../../components/Classes/Classes';
import ClassStudents from '../../components/ClassStudents/ClassStudents';
import Contacts from '../../components/Contacts/Contacts';
import Profile from '../../components/Profile/Profile';

import styles from './layout.module.css';
import ReviewStudents from '../../components/ReviewStudents/ReviewStudents';

function TeacherLayout(props) {
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const setToggleSidebarOpposite = () => {
        setToggleSidebar(state => !state);
    }

    const sidebarStyle = {
        width: toggleSidebar ? "200px" : "60px",
    };

    const routerFilterStyle = {
        filter: toggleSidebar ? "blur(3px) grayscale(0.7)" : "",
    }

    return (
        <>
            <Topbar setToggle={setToggleSidebarOpposite} isToggled={toggleSidebar} />
            <div>
                <Sidebar sidebarStyle={sidebarStyle} />

                <div className={styles['router-body']} style={routerFilterStyle}>
                    <Routes>
                        <Route path='/' element={<h1>Dashboard</h1>} />
                        <Route path='/classes' element={<Classes />} />
                        <Route path='/classes/:id' element={<ClassStudents />} />
                        <Route path='/reviews' element={<Classes />} />
                        <Route path='/reviews/:id' element={<ReviewStudents />} />
                        <Route path='/contacts' element={<Contacts />} />
                        <Route path='/profile/:userId' element={<Profile />} />
                        <Route path='/*' element={<h1 className={styles['not-fount']}>Page not found</h1>} />
                    </Routes>
                </div>
            </div>

        </>
    );
}

export default TeacherLayout;