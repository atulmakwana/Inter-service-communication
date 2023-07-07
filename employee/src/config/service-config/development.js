const config = {
    cockroach:{
        host: 'localhost',
        user: 'root',
        database: 'employee_db',
        port:26260,
    },
    kafka : {
        clientId:'employee-producer',
        brokers:['localhost:9092']
    }
}

module.exports = config;