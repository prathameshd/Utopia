import pika

class EmailQueue:

    def get_channel(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='149.165.170.7'))
        channel = connection.channel()
        channel.queue_declare(queue='email')
        return channel

    def sender(self, receiver_email, subject, content):
        channel = self.get_channel()
        channel.basic_publish(exchange='', routing_key='email_key', \
        body={'receiver_email':receiver_email, 'subject': subject, 'content':content})
        print(" [x] Sent 'Email!'")
        connection.close()
        return 0

    def receiver(self):
        channel = self.get_channel()
        def callback(ch, method, properties, body):
            print(" [x] Received %r" % body)
            EmailService.send_email(body['receiver_email'], body['subject'], body['content'])
            channel.basic_consume(callback, queue='email', no_ack=True)

        print(' [*] Waiting for messages. To exit press CTRL+C')
        channel.start_consuming()
