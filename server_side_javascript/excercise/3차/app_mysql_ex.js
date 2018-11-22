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

app.get('/topic/new', function(req, res){
    fs.readdir('data',function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    res.render('form',{topics:files});
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
                var topic = {
                    title:'Welcome', 
                    description:'Hello, Javascript server..'
                }
                res.render('view', {topics:topics, topic:topic});
            }
        }
        
    });




    /*fs.readdir('data',function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
            fs.readFile('data/'+id, 'utf8', (err, data) => {
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            });
        }else{
            res.render('view', {topics:files, title:'Welcome', description:'Hello, Javascript server..'});
        }
    });*/
});

app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
})

app.listen('3000', function(req,res){
    console.log('connection 3000port...')
});