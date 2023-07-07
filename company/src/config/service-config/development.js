const config = {
    cockroach:{
        host: 'localhost',
        user: 'root',
        database: 'company_db',
        port:26260,
    },
    kafka : {
        clientId:'company-producer',
        brokers:['localhost:9092']
    }
}

module.exports = config;