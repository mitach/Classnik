import LinkBlock from "./LinkBlock/LinkBlock";

import { FaListAlt, FaPhoneAlt, FaPoll, FaMailBulk, FaFileAlt, FaCalendarAlt, FaStarHalfAlt, FaIdCard } from 'react-icons/fa';

import styles from './sidebar.module.css';

function Sidebar({sidebarStyle}) {
    return (
        <div className={styles['sidebar-container']} style={sidebarStyle}>
            <LinkBlock icon={FaIdCard} text="Dashboard" to="/dashboard" />
            <LinkBlock icon={FaListAlt} text="Classes" to="/dashboard/classes" />
            <LinkBlock icon={FaFileAlt} text="Tests" to="/dashboard/tests" />
            <LinkBlock icon={FaStarHalfAlt} text="Reviews" to="/dashboard/reviews" />
            <LinkBlock icon={FaCalendarAlt} text="Schedule" to="/dashboard/schedule" />
            <LinkBlock icon={FaMailBulk} text="Publications" to="/dashboard/publications" />
            <LinkBlock icon={FaPoll} text="Surveys" to="/dashboard/surveys" />
            <LinkBlock icon={FaPhoneAlt} text="Contacts" to="/dashboard/contacts" /> 
        </div>
    );
}

export default Sidebar;