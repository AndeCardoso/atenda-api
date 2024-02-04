interface IMailConfig {
  from: string;
  destination: string;
  subject: string;
  text?: string;
  template?: string;
}

export const mailConfig = ({
  from,
  destination,
  subject,
  text,
  template,
}: IMailConfig) => {
  return {
    from,
    to: destination,
    subject,
    text,
    html: template,
  };
};
