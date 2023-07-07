module.exports = function makeproducer({
    Kafka,
    config,
}){
    return async function runProducer({topic,data})
    {
        const kafka = new Kafka({
            clientId: config.kafka.clientId,
            brokers: config.kafka.brokers,
        });
        const producer = kafka.producer();
        await producer.connect();
        await producer.send({
            topic: topic,
            messages:[
                {
                    value : JSON.stringify(data)
                }
            ]
        });
    }
}