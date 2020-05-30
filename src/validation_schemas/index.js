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

export const ResendConfirmEmailSchema = Yup.object().shape({
  email: Yup.string().email().required()
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required()
});

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .max(10)
    .required(),
  token: Yup.string().required()
});

export const CreateProfileSchema = Yup.object().shape({
  name: Yup.string().required(),
  about: Yup.string().required(),
  category: Yup.string().required(),
  city: Yup.string().required(),
  address: Yup.string().required(),
  teamSize: Yup.string().required()
});

export const UpdateProfileSchema = Yup.object().shape({
  name: Yup.string().required(),
  about: Yup.string().required(),
  category: Yup.string().required(),
  city: Yup.string().required(),
  address: Yup.string().required(),
  teamSize: Yup.string().required()
});

export default {
  RegisterSchema,
  SigninSchema,
  ConfirmEmailSchema,
  ResendConfirmEmailSchema,
  ResetPasswordSchema,
  ForgotPasswordSchema,
  UpdateProfileSchema
};
