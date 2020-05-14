import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .min(6)
    .max(10)
    .required(),
  role: Yup.string().required()
});

export default RegisterSchema;
