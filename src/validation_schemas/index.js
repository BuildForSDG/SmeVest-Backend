import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .min(6)
    .max(10)
    .required(),
  role: Yup.string().required()
});

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .max(10)
    .required()
});

export const ConfirmEmailSchema = Yup.object().shape({
  token: Yup.string().required()
});

export default {
  RegisterSchema,
  SigninSchema,
  ConfirmEmailSchema
};
