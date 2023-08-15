import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { EntryField } from './ContactForm.styled ';

const nameRegExp =
  /^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .matches(
      nameRegExp,
      ` Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`
    ),
  number: Yup.number()
    .positive('Must be > 0')
    .required('Required')
  
});

export const ContactForm = ({ onAdd, contacts }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const overlap = contacts
          .map(contact => contact.name)
          .includes(values.name);
        overlap
          ? alert(`${values.name} is already in contacts`)
          : onAdd({ ...values, id: nanoid() });
        actions.resetForm();
      }}
    >
      <Form>
        <h1>Phonebook</h1>
        <EntryField htmlFor="name">
          Name
          <Field id="name" type="text" name="name" />
        </EntryField>
        <ErrorMessage name="name" />
        <EntryField htmlFor="number">
          Number
          <Field
            id="number"
            type="tel"
            name="number"
          />
        </EntryField>
        <ErrorMessage name="number" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
