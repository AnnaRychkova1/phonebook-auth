import LoginForm from '../../components/LoginForm/LoginForm';
import { apiLoginUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();

  const onLogin = formData => {
    dispatch(apiLoginUser(formData));
  };
  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default Login;
