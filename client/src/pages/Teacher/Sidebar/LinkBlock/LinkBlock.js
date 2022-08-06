import React from 'react';
import { Link } from 'react-router-dom';

import styles from './link-block.module.css';

function LinkBlock({
    to,
    icon,
    text
}) {
    return (
        <Link to={to} className={styles['sidebar-link']}>
            {React.createElement(icon, {className: styles['sidebar-icon']})}
            <span className={styles['text']}>{text}</span>
        </Link>
    );
}

export default LinkBlock;