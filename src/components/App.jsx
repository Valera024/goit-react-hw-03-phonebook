import { Component } from "react";
import Section from "./Section/Section";
import Form from "./Form/Form";
import Contacts from "./Contacts/Contacts";
import { nanoid } from "nanoid";
import Filter from "./Filter/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      this.setState({contacts: JSON.parse(storedContacts)})
    }
  }

  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  }

  onDeleteClick = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id)
    }))
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();
    const inputName = document.querySelector("input[name='name']");
    const inputNumber = document.querySelector("input[name='number']");
    const newName = inputName.value;
    const newNumber = inputNumber.value;
    const { contacts } = this.state;

    if (contacts.some((contact) => contact.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${inputName.value} is already in contacts.`);
    } else {
      this.updateContacts(newName, newNumber);
    }
    evnt.target.reset();
  }


  updateContacts = (newName, newNumber) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, { id: nanoid(), name: newName, number: newNumber }]
    }));
  }

  handleSearchInputChange = () => {
    const inputSearch = document.querySelector("input[name='search']").value
    this.setState({
      filter: inputSearch
    })
  }

  render() {
    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={ this.handleSubmit}/>
        </Section>
        <Section title="Contacts">
          <Filter onInput={this.handleSearchInputChange}/>
          <Contacts contacts={ this.state} onClick={this.onDeleteClick} />
        </Section>
      </>
    )
  }
}

export default App