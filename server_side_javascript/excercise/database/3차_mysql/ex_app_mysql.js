var mysql = require('mysql');

var con = mysql.createConnection({
    host : '13.125.237.98',
    user : 'jksang',
    password : 'lee03311',
    database : 'jksang'
});

//con.connect();

con.query('SELECT * FROM topic', function(err, rows, fields){
    if(err){
        throw err;
    }else{
        for(var i=0;i<rows.length;i++){
            console.log(rows[i].id + ' -> This is topic :', rows[i].title +", " + rows[i].description, +", " +rows[i].author);
        }
    }
});

/*var sql = 'INSERT INTO topic (title, description, author) VALUES (?, ?, ?)' ;

var params = ['Supervisor','Supervisor is watcher','graphittile'];
con.query(sql, params, function (err, rows, fields){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});
*/

/*var sql = 'UPDATE topic SET title=?, description=? WHERE id=?' ;

var params = ['Supervisor','Supervisor is watcher...','2'];
con.query(sql, params, function (err, rows, fields){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});*/

/*var sql = 'DELETE FROM topic WHERE id=?' ;
var params = ['2'];
con.query(sql, params, function (err, rows, fields){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});
*/