import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactItem.module.css';
import { AiFillDelete } from 'react-icons/ai';

function ContactItem({ name, number, email, onClick }) {
  return (
    <li className={s.Item}>
      <div className={s.Wrapper}>
        <p className={s.Name}>{name}:</p>
        <p className={s.Number}>
          <a className={s.TelLink} href={`tel:${number}`}>
            {number}
          </a>
        </p>
        <p className={s.Email}>
          <a className={s.MailLink} href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      </div>
      <button type="button" onClick={() => onClick()} className={s.Button}>
        <AiFillDelete size={18} />
      </button>
    </li>
  );
}

export default ContactItem;

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  email: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
