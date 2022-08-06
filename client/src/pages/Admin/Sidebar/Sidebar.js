import LinkBlock from "./LinkBlock/LinkBlock";

import { FaUserPlus, FaChalkboardTeacher, FaPhoneAlt, FaPoll, FaMailBulk, FaRegPlusSquare, FaCalendarAlt, FaStarHalfAlt, FaIdCard } from 'react-icons/fa';

import styles from './sidebar.module.css';

function Sidebar({sidebarStyle}) {
    return (
        <div className={styles['sidebar-container']} style={sidebarStyle}>
            <LinkBlock icon={FaIdCard} text="Dashboard" to="/dashboard" />
            <LinkBlock icon={FaRegPlusSquare} text="Add class" to="/dashboard/add-class" />
            <LinkBlock icon={FaChalkboardTeacher} text="Add teacher" to="/dashboard/add-teacher" />
            <LinkBlock icon={FaUserPlus} text="Add student" to="/dashboard/add-student" />
            <LinkBlock icon={FaCalendarAlt} text="Schedule" to="/dashboard/schedule" />
            <LinkBlock icon={FaMailBulk} text="Publications" to="/dashboard/publications" />
            <LinkBlock icon={FaPoll} text="Surveys" to="/dashboard/surveys" />
            <LinkBlock icon={FaPhoneAlt} text="Contacts" to="/dashboard/contacts" /> 
        </div>
    );
}

export default Sidebar;