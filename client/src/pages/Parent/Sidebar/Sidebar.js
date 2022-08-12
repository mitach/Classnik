import LinkBlock from "./LinkBlock/LinkBlock";

import { FaBookOpen, FaPhoneAlt, FaCalendarAlt, FaStarHalfAlt, FaIdCard } from 'react-icons/fa';

import styles from './sidebar.module.css';

function Sidebar({sidebarStyle}) {
    return (
        <div className={styles['sidebar-container']} style={sidebarStyle}>
            <LinkBlock icon={FaIdCard} text="Dashboard" to="/dashboard" />
            <LinkBlock icon={FaBookOpen} text="Diary" to="/dashboard/diary" />
            <LinkBlock icon={FaStarHalfAlt} text="Reviews" to="/dashboard/reviews" />
            <LinkBlock icon={FaCalendarAlt} text="Schedule" to="/dashboard/schedule" />
            <LinkBlock icon={FaPhoneAlt} text="Contacts" to="/dashboard/contacts" /> 
        </div>
    );
}

export default Sidebar;