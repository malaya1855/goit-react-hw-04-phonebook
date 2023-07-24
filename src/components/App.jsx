import { ContactList, Filter, ContactForm } from 'components';
// import ContactForm from './ContactForm/ContactForm';
import { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {});

  const componentDidMount = () => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };
  const componentDidUpdate = (_, prevState) => {
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  };

  const onHandleSubmit = newContact => {
    const existedContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existedContact) {
      alert(`${newContact.name} is already in your contacts`);
    } else {
      setContacts(newContact);
    }
  };

  const onChangeFilter = ev => {
    setFilter(ev.currentTarget.value);
  };

  const onFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const onDeleteBtn = id => {
    return setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={onHandleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} changeFilter={onChangeFilter} />
      <ContactList
        contacts={onFilteredContacts()}
        deleteContacts={onDeleteBtn}
      />
    </div>
  );
};

export default App;
