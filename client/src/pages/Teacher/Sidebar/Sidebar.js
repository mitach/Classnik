import LinkBlock from "./LinkBlock/LinkBlock";

import { FaListAlt, FaPhoneAlt, FaStarHalfAlt, FaIdCard } from 'react-icons/fa';

import styles from './sidebar.module.css';

function Sidebar({sidebarStyle}) {
    return (
        <div className={styles['sidebar-container']} style={sidebarStyle}>
            <LinkBlock icon={FaIdCard} text="Dashboard" to="/dashboard" />
            <LinkBlock icon={FaListAlt} text="Classes" to="/dashboard/classes" />
            <LinkBlock icon={FaStarHalfAlt} text="Reviews" to="/dashboard/reviews" />
            <LinkBlock icon={FaPhoneAlt} text="Contacts" to="/dashboard/contacts" /> 
        </div>
    );
}

export default Sidebar;