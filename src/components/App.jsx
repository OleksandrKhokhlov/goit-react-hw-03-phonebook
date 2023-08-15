import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm ';
import { Contacts } from './Contacts/ContactList ';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  onDel = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contactId !== contact.id
        ),
      };
    });
  };

  changeNameFilter = newName => {
    this.setState({ filter: `${newName}` });
  };

  getVisibleContactsItems = () => {
    const { contacts, filter } = this.state;
    const lowerCaseName = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseName)
    );
  };

  render() {
    const visibleQuizItems = this.getVisibleContactsItems();
    return (
      <div>
        <ContactForm contacts={this.state.contacts} onAdd={this.addContact} />
        <Contacts
          contacts={visibleQuizItems}
          nameFilter={this.changeNameFilter}
          onDel={this.onDel}
        />
      </div>
    );
  }
}
