import React from 'react';

import styles from './input-block.module.css';

function InputBlock({
    value,
    name,
    placeholder,
    type,
    icon,
    changeHandler,
    validator
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
                onBlur={validator}
                required
            />
        </div>
    );
}

export default InputBlock;