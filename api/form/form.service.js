import nodemailer from 'nodemailer';

import { getStorage } from '../storage/storage.service.js';

export const sendCallback = async (data) => {
  try {
    const { smtpUser, formMail, formMailCC } = await getStorage();

    const mailOptions = {
      from: smtpUser,
      to: formMail,
      subject: 'На сайте заполнена форма заказать звонок.',
      text: `Имя: ${data.name}\nТелефон: ${data.phone}`,
    };

    const transporter = await getTransporter();
    const res = await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
};

export const sendReview = async (data) => {
  try {
    const { smtpUser, formMail, formMailCC } = await getStorage();

    const {
      restaurant, clear, service, quality, comment, recommended, fio, phone, email,
    } = data;

    const mailOptions = {
      from: smtpUser,
      to: formMail,
      cc: formMailCC,
      subject: 'На сайте добавлен отзыв.',
      text: `
      Ресторан: ${restaurant}
      Чистота заведения: ${clear}
      Уровень обслуживания:${service}
      Качество блюд и напитков: ${quality}
      Комментарий: ${comment}
      Порекомендуете нас своим друзьям?: ${recommended ? 'Да' : 'Нет'}
      ФИО:${fio}
      Телефон: ${phone}
      Email: ${email}
      `,
    };

    const transporter = await getTransporter();
    const res = await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
};

export const sendVacancy = async (data) => {
  try {
    const { smtpUser, formMail, formMailCC } = await getStorage();

    const mailOptions = {
      from: smtpUser,
      to: formMail,
      cc: formMailCC,
      subject: 'На сайте заполнена форма вакансии.',
      text: `
      Вакансия: ${data.vacancies},
      ФИО: ${data.fio},
      Дата рождения: ${data.birthday},
      Место рождения: ${data.birthplace},
      Адрес прописки: ${data.address1},
      Адрес фактический: ${data.address2},
      Телефон: ${data.phone},
      Учебное заведение: ${data.educationalInstitution},
      Период обучения: ${data.studyPeriod},
      Форма обучения: ${data.educationForm}',
      Специальность: ${data.speciality},
      Владение языками: ${data.language},
      Владение ПК: ${data.pc},
      Семейное положение: ${data.familyStatus},
      Дети: ${data.children},
      Воинская обязанность: ${data.military},
      Уголовная/административная ответственность: ${data.criminal}
      `,
    };

    const transporter = await getTransporter();
    const res = await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
};

async function getTransporter() {
  const { smtpHost, smtpUser, smtpPassword } = await getStorage();

  return nodemailer.createTransport({
    pool: true,
    host: smtpHost,
    port: 25,
    secure: false, // use TLS
    auth: {
      user: smtpUser, pass: smtpPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}
