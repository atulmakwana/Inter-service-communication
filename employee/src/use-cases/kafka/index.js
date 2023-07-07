const { Kafka } = require('kafkajs');
const config = require('../../config');

const makeproducer = require('./producer');
const runProducer = makeproducer({
    Kafka,
    config,
});

module.exports = Object.freeze({
    runProducer,
});