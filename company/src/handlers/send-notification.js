const { Kafka } = require('kafkajs');
const sendEmail = require('../use-cases/company').sendEmail

async function sendNotification()
{
    const kafka=new Kafka({
        clientId:'employee-producer',
        brokers:['localhost:9092']
    });
    const consumer = await kafka.consumer({ groupId:'myTokenConsumer2' });
    
    await consumer.connect();
    await consumer.subscribe({ topic:'employeeCreated'});
    
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {

            await sendEmail();
                     
        }
    })
}

sendNotification()