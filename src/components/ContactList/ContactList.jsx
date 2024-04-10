import { useSelector } from 'react-redux';

import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from '../../redux/contacts/selectors';
// import {
//   selectError,
//   selectFilteredContacts,
//   selectIsLoading,
// } from '../../redux/contacts/slice';
import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <ul className={css.contactList}>
        {contacts.map(contact => {
          return (
            <li className={css.contactItem} key={contact.id}>
              <Contact {...contact} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ContactList;
