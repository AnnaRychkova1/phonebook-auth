import { useDispatch } from 'react-redux';
import { apiRegisterUser } from '../../redux/auth/operations';
import RegisterForm from '../../components/RegistrationForm/RegistrationForm';

const Registration = () => {
  const dispatch = useDispatch();

  const onRegister = formData => {
    dispatch(apiRegisterUser(formData));
  };
  return (
    <div>
      <RegisterForm onRegister={onRegister} />
    </div>
  );
};

export default Registration;
