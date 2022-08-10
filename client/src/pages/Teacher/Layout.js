import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';

import Classes from '../../components/Classes/Classes';
import ClassStudents from '../../components/ClassStudents/ClassStudents';
import Contacts from '../../components/Contacts/Contacts';

import styles from './layout.module.css';

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
                            <Route path='/classes' element={<Classes />} />
                            <Route path='/classes/:id' element={<ClassStudents />} />
                            <Route path='/contacts' element={<Contacts />} />
                        </Routes>
                    </div>
                </div>

        </>
    );
}

export default TeacherLayout;