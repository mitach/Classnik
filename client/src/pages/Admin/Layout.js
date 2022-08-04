import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';

import AddStudent from '../../components/AddStudent/AddStudent';
import AddStudentClass from '../../components/AddStudentClass/AddStudentClass';

import styles from './layout.module.css';

function AdminLayout(props) {
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
                        <Route path='/add-student' element={<AddStudent />} />
                        <Route path='/add-class' element={<AddStudentClass />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;