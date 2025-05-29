import nodemailer from "nodemailer";

export async function receiveContactEmail(email: string, name: string, mobile: string, branch: string, message: string) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    });

    await transporter.sendMail({
        to: process.env.EMAIL_USER,
        subject: "You Received a Message from Arab Clinic",
        html: `
    <h2>New Message from Arab Clinic</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <p><strong>Branch:</strong> ${branch}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
    });
}
