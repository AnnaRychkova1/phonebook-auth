// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectFilteredContacts } from './redux/contacts/selectors';
// import { fetchContacts } from './redux/contacts/operations';
// import css from './App.module.css';
// import ContactList from './components/ContactList/ContactList';
// import SearchBox from './components/SearchBox/SearchBox';
// import ContactForm from './components/ContactForm/ContactForm';

// function App() {
//   const dispatch = useDispatch();
//   const contacts = useSelector(selectFilteredContacts);

//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   return (
//     <div className={css.container}>
//       <div className={css.functionalCont}>
//         <h1 className={css.title}>Phonebook</h1>
//         <ContactForm />
//         <SearchBox />
//       </div>
//       <ContactList contacts={contacts} />
//     </div>
//   );
// }

// export default App;

import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { useAuth } from './hooks';
import { apiRefreshUser } from './redux/auth/operations';

const Home = lazy(() => import('./pages/Home/Home'));
const Registration = lazy(() => import('./pages/Registration/Registration'));
const Login = lazy(() => import('./pages/Login/Login'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts'));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<Registration />}
            />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<Login />} />
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<Contacts />} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
