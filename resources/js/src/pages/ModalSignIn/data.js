import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required("Введите имя пользователя"),
    email: yup
        .string()
        .required("Введите почту")
        .email("Почта введена не верно"),
    password: yup.string().required("Введите пароль").min(6),
    confirm_password: yup
        .string()
        .oneOf([yup.ref("Password")], "Пароли должны совпадать "),
});
