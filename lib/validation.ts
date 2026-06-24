import * as Yup from "yup";

// Strong password: min 8 chars, at least one uppercase, one lowercase, one number.
const strongPassword = Yup.string()
  .required("Password is required")
  .min(8, "At least 8 characters")
  .matches(/[a-z]/, "Add a lowercase letter")
  .matches(/[A-Z]/, "Add an uppercase letter")
  .matches(/[0-9]/, "Add a number");

export const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object({
  name: Yup.string().trim().min(2, "Name is too short").required("Name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: strongPassword,
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
