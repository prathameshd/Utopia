import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import boto.ses
from jinja2 import Environment, PackageLoader

sender_email = "eutopia.aaps@gmail.com"
receiver_email = "eutopia.aaps@gmail.com"
password = "eutopia@2019"

# Loads templates from the yourapp.templates folder
env = Environment(loader=PackageLoader('Controllers', 'templates'))
class Email(object):
    def __init__(self, to, subject):
        self.to = to
        self.subject = subject
        self._html = None
        self._text = None

    def _render(self, filename, context):
        template = env.get_template(filename)
        return template.render(context)

    def html(self, filename, context):
        self._html = self._render(filename, context)

    def text(self, filename, context):
        self._text = self._render(filename, context)


    def send(self, from_addr=None):
        body = self._html

        if not from_addr:
            from_addr = sender_email
        if not self._html and not self._text:
            raise Exception('You must provide a text or html body.')
        if not self._html:
            body = self._text

        connection = boto.ses.connect_to_region(
            'us-east-1',
            aws_access_key_id='AKIAJAR4RJMB6DDV6HEA',
            aws_secret_access_key='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'
        )

        return connection.send_email(
            from_addr,
            self.subject,
            None,
            self.to,
            text_body=self._text,
            html_body=self._html
        )


class EmailService:
    def send_email(self, receiver_email, subject, content):
        # message = MIMEMultipart("alternative")
        # message["Subject"] = subject
        # message["From"] = sender_email
        # message["To"] = receiver_email
        # html_content = MIMEText(content, "html")
        # message.attach(html_content)
        #
        # # Create secure connection with server and send email
        # with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=None) as server:
        #     server.login(sender_email, password)
        #     server.sendmail(
        #         sender_email, receiver_email, message.as_string()
        #     )
        email = Email(to=receiver_email, subject=subject)
        ctx = {'username': content}
        email.html('confirmRegistration.html', ctx)
        email.send()
