function createmysqlConnection({
    config,
    Client
}) {
    const cockroach = new Client({
        host: config.cockroach.host,
        user: config.cockroach.user,
        database: config.cockroach.database,
        port:config.cockroach.port,
        SSL: {
                rejectUnauthorized:false
        }
    });
    cockroach.connect(function(err){
        if(err){
            console.log("Cockroach connection error occured: ",err);
        }
        else{
            console.log("Cockroach connection succesfulll...");
        }
    });
    return cockroach
}
module.exports = createmysqlConnection;







// function createmysqlConnection({
//     Client
// }) {
//     const cockroach = new Client({
//         host: 'cockroachdb-0',
//         user: 'root',
//         database: 'company_db',
//         port:26257,
//         ssl:false,
//         extra:{
//             ssl: {
//                     rejectUnauthorized:false
//             }
//         }
//     });
//     cockroach.connect(function(err){
//         if(err){
//             console.log("Cockroach connection error occured: ",err);
//         }
//         else{
//             console.log("Cockroach connection succesfulll...");
//         }
//     });
//     return cockroach
// }
// module.exports = createmysqlConnection;