import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegStar, FaVolleyballBall, FaArrowRight, FaChalkboardTeacher, FaChild } from 'react-icons/fa';

import * as gradeService from '../../services/gradeService';

import styles from './home-page.module.css';

function HomePage() {
    const [averageGrade, setAverageGrade] = useState(0);
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        if (!data.email) {
            setError('Plese type a student email!');

            setTimeout(() => {
                setError('');
            }, 2500);

            return;
        }

        try {
            const result = await gradeService.getAverageGrade(data.email);

            if (!result.average && result.message) {
                throw new Error(result.message);
            }

            setAverageGrade(result.average);
        } catch (error) {
            setError(error.message);

            setTimeout(() => {
                setError('');
            }, 2500);
        }

        e.target.children[0].value = '';
    }

    return (
        <>
            <header className={styles['header']}>
                <nav className={styles['nav']}>
                    <ul>
                        <Link to='/login' className={styles['link']}>Login</Link>
                        <Link to='/register' className={styles['link']}>Register</Link>
                    </ul>
                </nav>
                <div className={styles['header-filter']}></div>
                <h1 className={styles['title']}>NPGPTO "M. V. Lomonosov"</h1>
            </header>

            <section className={styles['why-us']}>
                <div className={styles['why-us-left']}>
                    <span className={styles['left-why']}>WHY</span>
                    <span className={styles['left-choose']}>CHOOSE</span>
                    <span className={styles['left-us']}>US ?</span>
                </div>

                <div className={styles['why-us-right']}>

                    <div className={styles['row']}>
                        <div className={styles['row-item']}>
                            <h2 className={styles['item-title']}>
                                <FaRegStar /> Inovative
                            </h2>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Interactive way of teaching</p>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Practical assignments</p>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Develop logical thinking</p>
                        </div>

                        <div className={styles['row-item']}>
                            <h2 className={styles['item-title']}>
                                <FaVolleyballBall /> Sports Base
                            </h2>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Swimming pool</p>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Football field</p>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Fitness</p>
                        </div>
                    </div>

                    <div className={styles['row']}>
                        <div className={styles['row-item']}>
                            <h2 className={styles['item-title']}>
                                <FaChalkboardTeacher /> Qualified Teachers
                            </h2>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> High-Skilled teachers</p>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Interactive way of teaching</p>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Seasonal teacher from abroad</p>
                        </div>

                        <div className={styles['row-item']}>
                            <h2 className={styles['item-title']}>
                                <FaChild /> Extra Activities
                            </h2>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Introduction to many sports</p>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> School olympics</p>
                            <p className={styles['item-benefit']}><FaArrowRight className={styles['benefit-icon']} /> Excursions</p>
                        </div>
                    </div>

                </div>
            </section>

            <section className={styles['auth']}>
                <Link to='/login' className={styles['link']}>Login</Link>
                <span className={styles['span']}> or </span>
                <Link to='/register' className={styles['link']}>Register</Link>
                <span className={styles['span']}> as a parent.</span>
            </section>

            <section className={styles['check']}>
                <div className={styles['check-title']}>
                    <span className={styles['upper']}>Check for students</span>
                    <span className={styles['center']}>average grade</span>
                    <span className={styles['lower']}>by student email</span>
                </div>

                <div className={styles['check-form']}>
                    <div>

                        <form onSubmit={submitHandler}>
                            <input type="text" name='email' id="email" className={styles['form-input']} placeholder="student@npgpto.bg" />
                            <button type="submit" className={styles['form-btn']}><FaArrowRight className={styles['btn-icon']} /></button>
                        </form>
                        {error && <p className={styles['error-email']}>{error}</p>}
                    </div>
                    <div className={styles['check-grade']}>{averageGrade}</div>
                </div>
            </section>

            <footer className={styles['footer']}>
                All rights reserved &copy;
                <a className={styles['anchor']} href='https://github.com/mitach' rel="noreferrer" target='_blank'>Dimitar Malinov</a> 2022 |
                Project Defense at <a className={styles['anchor']} rel="noreferrer" href='https://softuni.bg/' target='_blank'>SoftUni</a>
            </footer>
        </>
    );
}

export default HomePage;