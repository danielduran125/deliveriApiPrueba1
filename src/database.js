const mysql = require ('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'bdn9ssc69rwr561n58nw-mysql.services.clever-cloud.com',
    user: 'ulu2ny24isu0pbyb',
    password:'PzAm2UjGDqWP1nAl69ZY',
    database: 'bdn9ssc69rwr561n58nw'

    
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
