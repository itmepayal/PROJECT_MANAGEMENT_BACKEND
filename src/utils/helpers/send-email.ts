import * as brevo from "@getbrevo/brevo";
import { apiInstance } from "../../config/brevo.config";
import { serverConfig } from "../../config";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailOptions) => {
  const email = new brevo.SendSmtpEmail();
  email.sender = {
    name: "Gravity Team",
    email: serverConfig.BREVO_SENDER_EMAIL,
  };
  email.to = [{ email: to }];
  email.subject = subject;
  email.htmlContent = html;
  try {
    await apiInstance.sendTransacEmail(email);
  } catch (error) {
    console.error("Brevo Error:", error);
  }
};
