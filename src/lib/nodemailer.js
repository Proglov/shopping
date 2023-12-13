import nodemailer from 'nodemailer'

const email = process.env.EMAIL;
const pass = process.env.EMAILsPASSWORD;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const setMailOptions = (to) => ({
    from: email,
    to
})