var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');//file system
var mysql = require('mysql');

var con = mysql.createConnection({
    host : '13.125.237.98',
    user : 'jksang',
    password : 'lee03311',
    database : 'jksang'
});

con.connect();
var app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty=true;
app.set('views','./view_mysql');//express 설정, view file 위치
app.set('view engine', 'pug');

app.get('/topic/add', function(req, res){
    con.query('SELECT * FROM topic', function(err, topics, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('add',{topics:topics});
    });
});


app.get(['/topic','/topic/:id'], function(req, res){
    con.query('SELECT * FROM topic', function(err, topics, fields){
        if(err){
            console.log('get list error');
            res.status(500).send('Internal Server Error');
        }else{
            var id = req.params.id;
            if(id){
                con.query('SELECT * FROM topic WHERE id=?', [id], function(err, topic, fields){
                    if(err){
                        console.log('find id error');
                        res.status(500).send('Internal Server Error');
                    }else{
                        res.render('view', {topics:topics, topic:topic[0]});
                    }
                });
            }else{
                /*var topic = {
                    title:'Welcome', 
                    description:'Hello, Javascript server..'
                }*/
                res.render('view', {topics:topics});
            }
        }
        
    });
});

app.get('/topic/:id/edit', function(req, res){
    var id = req.params.id;

    con.query('SELECT * FROM topic', function(err, topics, field){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        if(id){
            con.query('SELECT * FROM topic WHERE id=?',[id], function(err, topic, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }

                res.render('edit', {topics: topics, topic: topic});
            });
        }else{
            console.log('There is no id.');
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/topic/:id/delete', function(req, res){
    var id = req.params.id;

    con.query('SELECT * FROM topic', function(err, topics, field){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        if(id){
            con.query('SELECT * FROM topic WHERE id=?',[id], function(err, topic, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }

                res.render('delete', {topics: topics, topic: topic});
            });
        }else{
            console.log('There is no id.');
            res.status(500).send('Internal Server Error');
        }
    });
});

app.post('/topic/:id/edit', function(req, res){
    var id = req.params.id;
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id =?';

    console.log(id);
    if(id){
        con.query(sql,[title,description,author,id], function(err, topic, fields){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.redirect('/topic/'+id)
        });
    }else{
        console.log('There is no id.');
        res.status(500).send('Internal Server Error');
    }
});

app.post('/topic/:id/delete', function(req, res){
    var id = req.params.id;
    if(id){
        var sql = "DELETE FROM topic WHERE id = ?";
        con.query(sql, [id], function(err, topic, fields){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.redirect('/topic');
        });
    }else{
        console.log('There is no id.');
        res.status(500).send('Internal Server Error');
    }
});


app.post('/topic/add', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'INSERT INTO topic(title,description,author) VALUES (?,?,?)';
    var _params = [title,description,author];
    con.query(sql,_params,function(err,topic,fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        console.log(topic);
        res.redirect('/topic/'+topic.insertId);
    });
})

app.listen('3000', function(req,res){
    console.log('connection 3000port...')
});