const mysql = require ('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'delivery2020'

    
})
mysqlConnection.connect(function (err){
if (err){
    console.log (err);
    return ;

} else{ 
    
    console.log('db esta conectada');

}

});

module.exports=mysqlConnection;