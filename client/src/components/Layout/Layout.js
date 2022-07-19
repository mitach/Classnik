import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';
// import Diary from '../Diary/Diary';
// import Tests from '../Tests/Tests';

import styles from './layout.module.css';

function Layout(props) {
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
                    {/* <Routes>
                        <Route path='/diary' element={<Diary />} />
                        <Route path='/tests' element={<Tests />} />
                    </Routes> */}
                </div>
            </div>
        </>
    );
}

export default Layout;