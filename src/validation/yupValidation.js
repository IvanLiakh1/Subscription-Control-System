import * as Yup from 'yup';

const registrationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Ім'я користувача повинно містити принаймні 3 символи")
        .max(20, "Ім'я користувача не може перевищувати 20 символів")
        .required("Обов'язкове поле"),
    email: Yup.string().email('Невірний формат електронної пошти').required("Обов'язкове поле"),
    password: Yup.string()
        .min(8, 'Мінімальна довжина пароля 8 символів')
        .max(25, 'Пароль не може перевищувати 25 символів')
        .required("Обов'язкове поле"),
});
const loginSchema = Yup.object().shape({
    email: Yup.string().email('Невірний формат електронної пошти').required("Обов'язкове поле"),
    password: Yup.string()
        .min(8, 'Мінімальна довжина пароля 8 символів')
        .max(25, 'Пароль не може перевищувати 25 символів')
        .required("Обов'язкове поле"),
});
export default {
    registrationSchema,
    loginSchema,
};
