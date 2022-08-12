import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';

import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import AddStudent from '../../components/AddStudent/AddStudent';
import AddStudentClass from '../../components/AddStudentClass/AddStudentClass';
import ManageTeachers from '../../components/ManageTeachers/ManageTeachers';
import AdminContacts from '../../components/AdminContacts/AdminContacts';
import ContactsForm from '../../components/ContactsForm/ContactsForm';
import AdminSchedule from '../../components/AdminSchedule/AdminSchedule';
import ManageStudents from '../../components/ManageStudents/ManageStudents';
import Profile from '../../components/Profile/Profile';

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
                        <Route path='/' element={<AdminDashboard />} />
                        <Route path='/profile/:userId' element={<Profile />} />
                        <Route path='/manage-teachers' element={<ManageTeachers />} />
                        <Route path='/add-class' element={<AddStudentClass />} />
                        <Route path='/add-student' element={<AddStudent />} />
                        <Route path='/students' element={<ManageStudents />} />
                        <Route path='/schedule' element={<AdminSchedule />} />
                        <Route path='/contacts' element={<AdminContacts />} />
                        <Route path='/contacts/edit' element={<ContactsForm />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;