import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be atleast 3 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be atleast 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Retype your password.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const SubAccountSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be atleast 3 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be atleast 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Retype your password.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  user_role: Yup.string().required("Required"),
});

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be atleast 6 characters")
    .required("Required"),
});

export const ProductSchema = Yup.object({
  productName: Yup.string()
    .min(3, "Must be atleast 3 characters")
    .required("Required"),
  productDesc: Yup.string().optional(),
  productCategory: Yup.string().required("Required"),
  productFile: Yup.mixed().optional(),
});

export const EditProductSchema = Yup.object({
  productName: Yup.string()
    .min(3, "Must be atleast 3 characters")
    .required("Required"),
  productDesc: Yup.string().optional(),
  productCategory: Yup.string().required("Required"),
  // productFile: Yup.mixed().optional(),
});
