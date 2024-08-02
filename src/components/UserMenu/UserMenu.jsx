import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

import css from './UserMenu.module.css';

import { useAuth } from '../../hooks';
import { apiLogoutUser } from '../../redux/auth/operations';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const handleLogout = () => {
    dispatch(apiLogoutUser());
    toast.success('Successfully logged out');
  };

  return (
    <div className={css.userMenu}>
      <p className={css.welcome}>Welcome, {user.name}!</p>
      <button
        className={css.logoutBtn}
        type="button"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  );
};
