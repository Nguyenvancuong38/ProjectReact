/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styles from './index.module.scss';

// Input Component
function InputSelect(props) {
    return (
        <div className="">
            <label htmlFor={props.id}>{props.name}
                {props.required && <span className={styles.iconStar}>*</span>}
            </label>
            <select
                className="form-control height_input"
                id={props.id}
                {...props.register(...props.rest)}
            >
                <option value="">--Please choose an option--</option>
                {props.dataSideBar.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
            <p className={styles.message_error}>
                {props.id === 'typeCar'
                    && props.errors.typeCar?.type === 'required'
                    && (<span>This field is required</span>
                    )}
                {props.id === 'producer'
                    && props.errors.producer?.type === 'required'
                    && (<span>This field is required</span>
                    )}
            </p>
        </div>
    );
}

export default InputSelect;
