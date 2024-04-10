import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './App.module.css';
import { selectFilteredContacts } from '../redux/contactsSlice';
import { fetchContacts } from '../redux/contactsOps';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.functionalCont}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm />
        <SearchBox />
      </div>
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
