import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendReminderEmail = async ({ to, serviceName, price, nextPaymentDate }) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
            <h2 style="color: #333;">🔔 Нагадування про підписку</h2>
            <p>Привіт! 👋</p>
            <p>Нагадуємо, що <strong>${serviceName}</strong> спише кошти <strong>${nextPaymentDate}</strong> в розмірі <strong>${price} грн</strong>.</p>
            <p>Не забудьте перевірити баланс чи скасувати підписку, якщо вона вам не потрібна.</p>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #888;">Цей лист надіслано автоматично з системи керування підписками.</p>
        </div>
    `;

    await transporter.sendMail({
        from: 'Subscription Control System',
        to: to,
        subject: `⏰ Нагадування: скоро оплата за ${serviceName}`,
        html: htmlContent,
    });
};
const sendNotificationEmail = async ({ to, serviceName, price, totalSpent, nextPaymentDate }) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
            <h2 style="color: #333;">🔔 Нагадування про списання за підписку</h2>
            <p>Привіт! 👋</p>
            <p>Нагадуємо, що <strong>${serviceName}</strong> списав кошти в розмірі <strong>${price} грн</strong>.</p>
            <p>Загальні витрати становлять <strong>${totalSpent + price}</strong></p>
            <p>Дата наступного списання: <strong>${nextPaymentDate}</strong></p>
            <p>Не забудьте перевірити баланс чи скасувати підписку, якщо вона вам не потрібна.</p>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #888;">Цей лист надіслано автоматично з системи керування підписками.</p>
        </div>
    `;

    await transporter.sendMail({
        from: 'Subscription Control System',
        to: to,
        subject: `⏰ Нагадування про списання коштів за ${serviceName}`,
        html: htmlContent,
    });
};

export { sendReminderEmail, sendNotificationEmail };
