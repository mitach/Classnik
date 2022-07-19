import { Link } from 'react-router-dom';

import { FaBars, FaSchool, FaRegEnvelope, FaRegBell, FaRegWindowClose } from "react-icons/fa";

import styles from './topbar.module.css';

function Topbar({
    setToggle,
    isToggled
}) {
    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__logo-sec']}>
                <div>
                    {isToggled ?
                        <FaRegWindowClose className={styles['menu-btn']} onClick={setToggle} /> :
                        <FaBars className={styles['menu-btn']} onClick={setToggle} />
                    }
                </div>

                <div className={styles['logo']}>
                    <h3 className={styles['logo__name']}>Classnik</h3>
                    <span className={styles['logo__special']}>DIARY</span>
                </div>
            </div>

            <div className={styles['top-bar__school-name']}>
                <FaSchool className={styles['icon']} />
                <h1>NPGPTO "M. V. Lomonosov"</h1>
            </div>

            <div className={styles['top-bar__tools']}>
                <div className={styles['notifications']}>
                    <FaRegBell className={styles['icon']} />
                    <FaRegEnvelope className={styles['icon']} />
                </div>

                <div className={styles['links']}>
                    <Link to="/">Profile</Link>
                    <Link to="/">Logout</Link>
                </div>
            </div>
        </div>
    );
}

export default Topbar;