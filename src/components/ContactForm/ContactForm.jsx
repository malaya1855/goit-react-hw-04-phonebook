import { Form, Input, ButtonForm } from 'components';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const ContactForm = ({ handleSubmit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const newContact = { id, name, number };

  const onSubmitForm = ev => {
    ev.preventDefault();
    setId(nanoid(5));
    ev.target.reset();
    return handleSubmit(newContact);
  };

  const handleChange = ev => {
    const inputName = ev.currentTarget.name;
    const inputValue = ev.currentTarget.value;
    console.log(inputValue);
    switch (inputName) {
      case 'name':
        setName(inputValue);
        break;
      case 'number':
        setNumber(inputValue);
        break;
      default:
        console.log(``);
    }
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        name="name"
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number</label>
      <Input
        type="tel"
        name="number"
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <ButtonForm type="submit">Add contact</ButtonForm>
    </Form>
  );
};
