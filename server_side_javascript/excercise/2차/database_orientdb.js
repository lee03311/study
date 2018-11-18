var OrientDB = require('orientjs');
var server = OrientDB({
    host:'localhost',
    port:2424,
    username:'root',
    password:'150523'
});

var db = server.use('o2');

/*
db.record.get('#33:0').then(function (record){
    console.log('Loaded record : ',record)
});
*/

//select
/*var sql = 'SELECT FROM topic';
//var sql = 'SELECT FROM topic WHERE @rid=:rid';
var _params = { //변수는 변경되도 됨.
    params:{ //params 는 변경안됨
        rid : '#33:0'
    }
};
db.query(sql, _params).then(function(results){
    console.log(results);
});*/

//insert
/*var sql = 'INSERT INTO topic (title, description) values (:title, :des)';
var _params = {
    params:{
        title : 'Express',
        des : 'Express is framework for web'
    }
}
db.query(sql, _params).then(function(results){
    console.log(results);
});*/

//update
/*var sql = 'UPDATE topic SET title=:title, description=:des WHERE @rid=:rid'
var _params = {
    params:{
        title : 'Expressjs',
        des : 'Expressjs is framework',
        rid : '#35:0'
    }
}
db.query(sql, _params).then(function(results){
    console.log(results);
})*/

//delete
/*var sql = 'DELETE FROM topic WHERE @rid=:rid';
db.query(sql, {params:{rid:'#35:0'}}).then(function(results){
    console.log(results);
});*/

//console.log('db close');
//db.close();