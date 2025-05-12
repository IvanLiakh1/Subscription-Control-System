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
const subscriptionSchema = Yup.object().shape({
    price: Yup.number()
        .required('Вартість є обов’язковою')
        .min(0, 'Вартість не може бути меншою за 0')
        .typeError('Введіть число')
        .max(10000, 'Вартість не може перевищувати 10000'),
    billingCycle: Yup.string().required('Періодичність оплати є обов’язковою'),
    notes: Yup.string().max(100, 'Замітки не можуть перевищувати 100 символів').nullable(),
    startDate: Yup.date()
        .required('Дата активації підписки є обов’язковою')
        .typeError('Введіть дату у форматі ДД.ММ.РРРР'),
    title: Yup.string().required('Назва підписки є обов’язковою'),
});
const editSubscriptionSchema = Yup.object().shape({
    price: Yup.number()
        .required('Вартість є обов’язковою')
        .min(0, 'Вартість не може бути меншою за 0')
        .typeError('Введіть число')
        .max(10000, 'Вартість не може перевищувати 10000'),
    billingCycle: Yup.string().required('Періодичність оплати є обов’язковою'),
    notes: Yup.string().max(100, 'Замітки не можуть перевищувати 100 символів').nullable(),
    notification: Yup.boolean(),
});
export default {
    registrationSchema,
    loginSchema,
    subscriptionSchema,
    editSubscriptionSchema,
};
