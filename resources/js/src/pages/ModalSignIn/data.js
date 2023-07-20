import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required("Введите имя пользователя"),
    Email: yup
        .string()
        .required("Введите почту")
        .email("Почта введена не верно"),
    Password: yup.string().required("Введите пароль").min(6),
    Confirm_password: yup
        .string()
        .oneOf([yup.ref("Password")], "Пароли должны совпадать "),
});
