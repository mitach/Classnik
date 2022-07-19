import React from 'react';

import styles from './input-block.module.css';

function InputBlock({
    value,
    name,
    placeholder,
    type,
    icon,
    changeHandler
}) {
    return (
        <div className={styles['input-block']}>
            <label htmlFor={name} className={styles['input-icon']}>
                {React.createElement(icon)}
            </label>

            <input
                className={styles['form-input']}
                id={name}
                value={value}
                name={name}
                placeholder={placeholder}
                type={type}
                onChange={changeHandler}
            />
        </div>
    );
}

export default InputBlock;