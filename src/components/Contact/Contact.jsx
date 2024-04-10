import { useDispatch } from 'react-redux';
import { FaPhone } from 'react-icons/fa6';
import { IoPersonSharp } from 'react-icons/io5';

import { deleteContact } from '../../redux/contactsOps';
import css from './Contact.module.css';

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <div className={css.contactInfo}>
      <div className={css.contactData}>
        <p className={css.contactInfoItem}>
          <IoPersonSharp size={16} color="#ef5c0d" />
          <span>{name}</span>
        </p>

        <p className={css.contactInfoItem}>
          <FaPhone size={16} color="#ef5c0d" />
          <span>{number}</span>
        </p>
      </div>
      <button className={css.deleteButton} type="submit" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
