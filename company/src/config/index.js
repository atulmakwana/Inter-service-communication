const config = require('./backend-config');

config.serviceEndpoints = require('./service-endpoints');
const _ = require('lodash')
const serviceConfiguration = require('./service-config');
if (serviceConfiguration.cockroach) {
    config.cockroach = _.assign(config.cockroach, serviceConfiguration.cockroach);
    delete serviceConfiguration.cockroach;
}

module.exports = _.assign(config, serviceConfiguration);
