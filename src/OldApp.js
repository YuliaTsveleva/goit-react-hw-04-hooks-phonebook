import React, { Component } from 'react';
import './App.css';
import Section from './Components/Section';
import AddContactForm from './Components/AddContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';
import EmptyText from './Components/EmptyText';
import { nanoid } from 'nanoid';
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number, email }) => {
    const alreadyExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (!alreadyExist && name !== '' && number !== '') {
      this.setState(({ contacts }) => ({
        contacts: [{ id: nanoid(), name, number, email }, ...contacts],
      }));
    } else if (alreadyExist) {
      alert(`${name} is already exists in contacts`);
    } else if (name === '' || number === '') {
      alert('Fill in all the fields please!');
    }
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className="App">
        <Section title="Phonebook">
          <AddContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length > 1 && (
            <Filter
              value={filter}
              onChange={this.changeFilter}
              total={this.state.contacts.length}
            />
          )}
          <ContactList
            contacts={filteredContacts}
            onClick={this.removeContact}
          ></ContactList>
          {contacts.length === 0 && <EmptyText />}
        </Section>
      </div>
    );
  }
}

export default App;
