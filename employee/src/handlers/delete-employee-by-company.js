const Kafka = require('kafka');

async function deleteEmployeesbyCopmany()
{
    const kafka=new Kafka({
        clientId:'user-update-acces-token-producer',
        brokers:['localhost:9092']
    });
    const consumer = await kafka.consumer({ groupId:'myTokenConsumer' });
    
    await consumer.connect();
    await consumer.subscribe({ topic:'companyDeleted'});
    
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
                     
        }
    })
}

// deleteEmployeesbyCopmany()