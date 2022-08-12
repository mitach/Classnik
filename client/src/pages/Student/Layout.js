import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';

import Contacts from '../../components/Contacts/Contacts';
import StudentDashboard from '../../components/StudentDashboard/StudentDashboard';
import Diary from '../../components/Diary/Diary';
import Reviews from '../../components/Reviews/Reviews';
import Schedule from '../../components/Schedule/Schedule'; 
import Profile from '../../components/Profile/Profile';

import styles from './layout.module.css';

function StudentLayout(props) {
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
                        <Route path='/' element={<StudentDashboard />} />
                        <Route path='/profile/:userId' element={<Profile />} />
                        <Route path='/diary' element={<Diary />} />
                        <Route path='/reviews' element={<Reviews />} />
                        <Route path='/schedule' element={<Schedule />} />
                        <Route path='/contacts' element={<Contacts />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default StudentLayout;