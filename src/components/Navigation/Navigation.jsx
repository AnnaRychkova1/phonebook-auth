import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks';
import clsx from 'clsx';
import css from './Navigation.module.css';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const getNavLinkClassNames = ({ isActive }) =>
    clsx(css.headerLink, {
      [css.active]: isActive,
    });

  return (
    <nav className={css.navigation}>
      <NavLink className={getNavLinkClassNames} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={getNavLinkClassNames} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
