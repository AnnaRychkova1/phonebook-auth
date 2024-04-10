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

// import { useDispatch, useSelector } from "react-redux";
// import RegisterForm from "../components/RegisterForm/RegisterForm";
// import { apiRegisterUser } from "../redux/authReducer";

// const RegisterPage = () => {
//     const dispatch = useDispatch();

//     const onRegister = (formData) => {
//         dispatch(apiRegisterUser(formData));

//     }

//     return (
//         <div>
//             <RegisterForm onRegister={onRegister} />
//         </div>
//     );
// }

// export default RegisterPage;
