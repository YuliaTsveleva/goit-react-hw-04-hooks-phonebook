import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ContactItem from '../ContactItem';

function ContactList({ contacts, onClick }) {
  return (
    <ul className={s.contactsList}>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          email={contact.email}
          onClick={() => onClick(contact.id)}
        />
      ))}
    </ul>
  );
}

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
