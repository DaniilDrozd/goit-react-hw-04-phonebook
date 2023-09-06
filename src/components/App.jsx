import React, { useState, } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from 'app.module.css';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) ?? [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ]
  );

  const [filter, setFilter] = useState('');

  
  const addContact = (contact) => {
    const isSameContact = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isSameContact) {
      alert(`${contact.name} is already in contacts!`);
      return;
    }

    const newContact = { id: nanoid(), ...contact };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const getViewContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleFilterChange = (event) => {
    setFilter(event.currentTarget.value);
  };

  return (
    <div className={css.appContainer}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.h2Style}>Contacts</h2>
      <Filter value={filter} onChangeFilter={handleFilterChange} />
      <ContactList contacts={getViewContacts()} onDelete={deleteContact} />
    </div>
  );
}

export default App;
