import { useEffect, useState } from 'react';

import * as classService from '../../services/classService';

import styles from './admin-schedule.module.css'

function AddSchedule() {
    const [classes, setClasses] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        classService.getClasses()
            .then(data => {
                setClasses(data.classes);
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.target));
        if (!values.monday || !values.tuesday || !values.wednesday || !values.thursday || !values.friday) {
            setIsEmpty(true);

            setTimeout(() => {
                setIsEmpty(false);
            }, 3000);
            
            return;
        }

        classService.updateSchedule(values)
            .then(result => {
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            });
    }

    return (
        <div className={styles['container']}>
            <div className={styles['form-wrapper']}>
                <form onSubmit={onSubmit}>
                    <div>
                        <p className={styles['label']}>Choose Student Class</p>
                        <select name="studentClassName" className={styles['select']}>
                            {classes.map(x => <option value={x.name} key={x._id}>{x.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={styles['label']}>Monday</label>
                        <input type="text" name="monday" className={styles['input']} placeholder='History, Physics, Literature...' />
                    </div>
                    <div>
                        <label className={styles['label']}>Tuesday</label>
                        <input type="text" name="tuesday" className={styles['input']} placeholder='Mathematics, Literature...' />
                    </div>
                    <div>
                        <label className={styles['label']}>Wednesday</label>
                        <input type="text" name="wednesday" className={styles['input']} placeholder='Chemistry, PE, Biology...' />
                    </div>
                    <div>
                        <label className={styles['label']}>Thursday</label>
                        <input type="text" name="thursday" className={styles['input']} placeholder='Informatics, PE, PE...' />
                    </div>
                    <div>
                        <label className={styles['label']}>Friday</label>
                        <input type="text" name="friday" className={styles['input']} placeholder='English, English, History...' />
                    </div>
                    {isEmpty && <p className={styles['error']}>Please fill all fields</p>}
                    {success && <p className={styles['success']}>Updated schedule successfully</p>}
                    <button type="submit" className={styles['btn']}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddSchedule;