const { Kafka } = require('kafkajs');
const config = require('../../config');

const makeProducer = require('./producer');
const runProducer = makeProducer({
    config,
    Kafka,
});

module.exports = Object.freeze({
    runProducer,
});