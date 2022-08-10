import { useEffect, useState } from 'react';

import * as contactsService from '../../services/contactsService';

import styles from './contacts.module.css';

function Contacts() {
    const [contacts, setContacts] = useState({});

    useEffect(() => {
        contactsService.get()
            .then(result => {
                setContacts(result[0]);
            });
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['address-wrapper']}>
                <span className={styles['adress-title']}>Address</span>
                <div className={styles['row']}>
                    <p className={styles['left']}>City:</p> <p className={styles['right']}>{contacts.city}</p>
                </div>
                <div className={styles['row']}>
                    <p className={styles['left']}>Street:</p> <p className={styles['right']}>{contacts.street}</p>
                </div>
                <div className={styles['row']}>
                    <p className={styles['left']}>Email:</p> <p className={styles['right']}>{contacts.email}</p>
                </div>
                <div className={styles['row']}>
                    <p className={styles['left']}>Phone:</p> <p className={styles['right']}>{contacts.phone}</p>
                </div>
            </div>
        </div>
    );
}

export default Contacts;