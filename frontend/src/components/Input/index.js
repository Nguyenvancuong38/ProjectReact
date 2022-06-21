/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styles from './index.module.scss';

// Input Component
function Input(props) {
  return (
    <div className="">
      <label htmlFor={props.id}>{props.name}
        {props.required && <span className={styles.iconStar}>*</span>}
      </label>
      <input
        type={props.type}
        className="form-control height_input"
        id={props.id}
        placeholder={props.placeholder}
        {...props.register(...props.rest)}
        onBlurCapture={props.trimValue}
      />
      <p className={styles.message_error}>
        {props.id === 'nameProduct'
          && props.errors.nameProduct?.type === 'required'
          && (<span>This field is required</span>
          )}
        {props.id === 'costProduct'
          && props.errors.costProduct?.type === 'required'
          && (<span>This field is required</span>
          )}
        {props.id === 'costProduct'
          && props.errors.costProduct?.type === 'min'
          && (<span>This field is more than 0</span>
          )}
        {props.id === 'fileImg'
          && props.errors.fileImg?.type === 'required'
          && (<span>This field is required</span>
          )}
      </p>
    </div>
  );
}

export default Input;
