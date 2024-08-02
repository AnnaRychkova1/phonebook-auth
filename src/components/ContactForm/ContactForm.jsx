import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

import css from './ContactForm.module.css';
import { apiAddUserContact } from '../../redux/contacts/operations';

const ContactsBoxSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long')
    .required('Name is a required field'),
  number: Yup.string()
    .matches(/^[0-9\s\-()]{6,}$/, {
      message:
        'Phone number must be at least 6 characters long and can contain digits, spaces, hyphens, and parentheses',
      excludeEmptyString: true,
    })
    .required('Phone number is a required field'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const onAddContacts = contactData => {
    const contactFinalData = {
      ...contactData,
    };
    dispatch(apiAddUserContact(contactFinalData));
  };

  const handleSubmit = (values, actions) => {
    onAddContacts(values);
    toast.success('Contact was added successfully');
    actions.resetForm();
  };

  return (
    <Formik
      validationSchema={ContactsBoxSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm}>
        <label className={css.labelForm}>
          <span className={css.labelText}>Name</span>
          <Field
            className={css.formField}
            placeholder="Anna Rychkova"
            type="text"
            name="name"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
        </label>

        <label className={css.labelForm}>
          <span className={css.labelText}>Number</span>
          <Field
            className={css.formField}
            placeholder="097-123-45-67"
            type="text"
            name="number"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="number"
            component="span"
          />
        </label>

        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
