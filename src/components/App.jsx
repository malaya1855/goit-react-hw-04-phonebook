import { ContactList, Filter } from 'components';
import ContactForm from './ContactForm/ContactForm';
import { Component } from 'react';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onHandleSubmit = newContact => {
    const existedContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existedContact) {
      alert(`${newContact.name} is already in your contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };
  onChangeFilter = ev => {
    this.setState({ filter: ev.currentTarget.value });
  };
  onFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  onDeleteBtn = id => {
    return this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.onHandleSubmit} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} changeFilter={this.onChangeFilter} />
        <ContactList
          contacts={this.onFilteredContacts()}
          deleteContacts={this.onDeleteBtn}
        />
      </div>
    );
  }
}

export default App;
