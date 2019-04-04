import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sender_email = "eutopia.aaps@gmail.com"
receiver_email = "eutopia.aaps@gmail.com"
password = "eutopia@2019"

class EmailService:
    def send_email(self, receiver_email, subject, content):
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = sender_email
        message["To"] = receiver_email
        html_content = MIMEText(content, "html")
        message.attach(html_content)

        # Create secure connection with server and send email
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=None) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )
