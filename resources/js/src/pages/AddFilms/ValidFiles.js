import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required("Введите имя видео"),
    category_id: yup
        .string()
        .required("Укажите жанр")
        // .oneOf(["Фильмы", "Мультфильмы"])
        .label("Укажите жанр"),
    Year: yup.string().required("Укажите дату"),
    description: yup.string().required("Укажите описание"),
    // check: yup.string().required("Укажите жанр"),
});
