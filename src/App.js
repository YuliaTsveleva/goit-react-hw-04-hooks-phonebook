import { useState, useEffect } from 'react';
import './App.css';
import Section from './Components/Section';
import AddContactForm from './Components/AddContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';
import EmptyText from './Components/EmptyText';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number, email }) => {
    const alreadyExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (!alreadyExist && name !== '' && number !== '') {
      setContacts(contacts => [
        { id: nanoid(), name, number, email },
        ...contacts,
      ]);
    } else if (alreadyExist) {
      alert(`${name} is already exists in contacts`);
    } else if (name === '' || number === '') {
      alert('Fill in all the fields please!');
    }
    setFilter('');
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const removeContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="App">
      <Section title="Phonebook">
        <AddContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 1 && (
          <Filter
            value={filter}
            onChange={changeFilter}
            total={contacts.length}
          />
        )}
        <ContactList
          contacts={filteredContacts}
          onClick={removeContact}
        ></ContactList>
        {contacts.length === 0 && <EmptyText />}
      </Section>
    </div>
  );
}
