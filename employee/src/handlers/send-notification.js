const { Kafka } = require('kafkajs');
const sendEmail = require('../use-cases/employee').sendEmail;
const config = require('../config')

async function sendNotification()
{
    const kafka = new Kafka({
        clientId:config.kafka.clientId,
        brokers:config.kafka.brokers,
    });
    const consumer = await kafka.consumer({ groupId:'myTokenConsumer' });
    
    await consumer.connect();
    await consumer.subscribe({ topic:'employeeCreated'});
    
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            
            const data = JSON.parse(message.value);
            await sendEmail({employeeEmail:data.employeeEmail, Verification_URL:data.Verification_URL});
            
        }
    })
}

sendNotification()