import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as contactsService from '../../services/contactsService';

import styles from './contacts-form.module.css';

function ContactsForm() {
    const navigate = useNavigate();

    const [addressValues, setAddressValues] = useState({
        city: '',
        street: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        contactsService.get()
            .then(result => {
                if (result.length > 0) {
                    setAddressValues({
                        city: result[0].city,
                        street: result[0].street,
                        email: result[0].email,
                        phone: result[0].phone,
                    })
                }
            });
    }, []);

    const changeHandler = (e) => {
        setAddressValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        contactsService.get()
            .then(result => {
                if (result.length > 0) {
                    contactsService.edit(addressValues);
                } else {
                    contactsService.create(addressValues);
                }
            });

            navigate('/dashboard');
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <Link className={styles['link']} to='/dashboard/contacts'>Preview</Link>
                <Link className={styles['link']} style={{'backgroundColor': 'gray'}} to=''>Edit</Link>
            </div>
            <div className={styles['address-form-wrapper']}>
                <span className={styles['adress-form-title']}>Address</span>
                <form onSubmit={onSubmit}>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="city" className={styles['input-label']}>City</label>
                        <input
                            id="city"
                            name="city"
                            value={addressValues.city}
                            onChange={changeHandler}
                            type="text"
                            placeholder='Sofia'
                            className={styles['input']}
                            required
                        />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="street" className={styles['input-label']}>Street</label>
                        <input
                            id="street"
                            name="street"
                            value={addressValues.street}
                            onChange={changeHandler}
                            type="text"
                            placeholder='Ivan Kolev 12'
                            className={styles['input']}
                            required
                        />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="email" className={styles['input-label']}>Email</label>
                        <input
                            id="email"
                            name="email"
                            value={addressValues.email}
                            onChange={changeHandler}
                            type="email"
                            placeholder='contact@school.npgpto'
                            className={styles['input']}
                            required
                        />
                    </div>
                    <div className={styles['input-wrapper']}>
                        <label htmlFor="phone" className={styles['input-label']}>Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            value={addressValues.phone}
                            onChange={changeHandler}
                            type="text"
                            placeholder='02 72 120'
                            className={styles['input']} />
                    </div>
                    <button className={styles['btn']} type='submit'>Save</button>
                </form>
            </div>
        </div>
    );
}

export default ContactsForm;