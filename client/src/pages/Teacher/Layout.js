import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';

import * as teacherService from '../../services/teacherService';
import { TeacherContext } from '../../contexts/TeacherContext';
import { AuthContext } from '../../contexts/AuthContext';

import Classes from '../../components/Classes/Classes';
import ClassStudents from '../../components/ClassStudents/ClassStudents';

import styles from './layout.module.css';

function TeacherLayout(props) {
    const { user } = useContext(AuthContext);

    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [teacher, setTeacher] = useState();

    useEffect(() => {
        teacherService.getMe(user._id)
            .then(result => {
                setTeacher(result);
            });
    }, []);

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
            <TeacherContext.Provider value={{ teacher }}>
                <Topbar setToggle={setToggleSidebarOpposite} isToggled={toggleSidebar} />
                <div>
                    <Sidebar sidebarStyle={sidebarStyle} />

                    <div className={styles['router-body']} style={routerFilterStyle}>
                        <Routes>
                            <Route path='/classes' element={<Classes />} />
                            <Route path='/classes/:id' element={<ClassStudents />} />
                        </Routes>
                    </div>
                </div>
            </TeacherContext.Provider>
        </>
    );
}

export default TeacherLayout;