var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'autoinmall'
});
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("no err");
    }
})
module.exports = connection;
