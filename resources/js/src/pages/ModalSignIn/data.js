import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Username is required"),
  Email: yup.string().required().email("invalid id email"),
  Password: yup.string().required("Username is password").min(6),
  Confirm_password: yup
    .string()
    .oneOf([yup.ref("Password")], "Passwords must match"),
});
