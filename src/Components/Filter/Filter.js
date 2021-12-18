import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ value, onChange, total }) => {
  return (
    <label className={s.Label}>
      Find contact by name in {total} contacts
      <input
        className={s.Input}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  contacts: PropTypes.string,
  onChange: PropTypes.func,
  total: PropTypes.number,
};
