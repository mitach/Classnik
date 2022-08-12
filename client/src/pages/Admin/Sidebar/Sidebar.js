import LinkBlock from "./LinkBlock/LinkBlock";

import { FaUserPlus, FaChalkboardTeacher, FaPhoneAlt, FaRegPlusSquare, FaCalendarAlt, FaIdCard, FaUserCog } from 'react-icons/fa';

import styles from './sidebar.module.css';

function Sidebar({sidebarStyle}) {
    return (
        <div className={styles['sidebar-container']} style={sidebarStyle}>
            <LinkBlock icon={FaIdCard} text="Dashboard" to="/dashboard" />
            <LinkBlock icon={FaChalkboardTeacher} text="Manage teachers" to="/dashboard/manage-teachers" />
            <LinkBlock icon={FaRegPlusSquare} text="Add class" to="/dashboard/add-class" />
            <LinkBlock icon={FaUserPlus} text="Add student" to="/dashboard/add-student" />
            <LinkBlock icon={FaUserCog} text="Manage Students" to="/dashboard/students" />
            <LinkBlock icon={FaCalendarAlt} text="Update schedule" to="/dashboard/schedule" />
            <LinkBlock icon={FaPhoneAlt} text="Contacts" to="/dashboard/contacts" /> 
        </div>
    );
}

export default Sidebar;