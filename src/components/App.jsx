import { ContactList, Filter, ContactForm } from 'components';
import { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const onHandleSubmit = newContact => {
    const existedContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existedContact) {
      alert(`${newContact.name} is already in your contacts`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };
  const onChangeFilter = ev => {
    setFilter(ev.currentTarget.value);
  };

  const onFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  const onDeleteBtn = id => {
    return setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
