var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');//file system
var OrientDB = require('orientjs');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty=true;
app.set('views','./view_orient');//express 설정, view file 위치
app.set('view engine', 'pug');

/*db연결*/
var server = OrientDB({
    host:'192.168.0.3',
    port:'2424',
    username:'root',
    password:'150523'
});

var db = server.use('o2');
app.get('/topic/add', function(req, res){
    var sql = 'SELECT FROM topic ' ;
    db.query(sql).then(function(topics){
        if(topics.length == 0){
            console.log('There is no record');
            res.status(500).send('Internal Server Error');
        }
       res.render('add', {topics:topics});
    });
    /*fs.readdir('data',function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    res.render('add',{topics:files});
    });
    */
});

app.get('/topic/:id/edit', function(req, res){
    var sql = 'SELECT FROM topic ' ;
    db.query(sql).then(function(topics){
        var id = req.params.id;
        if(id){
            sql += 'WHERE @rid=:rid';
            db.query(sql, {params:{rid:id}}).then(function(topic){
                res.render('edit', {topics:topics, topic:topic[0]});
            });
        }
    });
    /*fs.readdir('data',function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    res.render('add',{topics:files});
    });
    */
});

app.post('/topic/:id/edit', function(req, res){
    var sql = 'UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid' ;
    var _params ={
        params:{
            t:req.body.title,
            d:req.body.description,
            a:req.body.author,
            rid:req.params.id
        }
    };

    db.query(sql, _params).then(function(topics){
        res.redirect('/topic/'+encodeURIComponent(topics[0]['@rid']));
    });
});

app.get('/topic/:id/delete', function(req, res){
    var sql = 'SELECT FROM topic ' ;
    db.query(sql).then(function(topics){
        var id = req.params.id;
        if(id){
            sql += 'WHERE @rid=:rid';
            db.query(sql, {params:{rid:id}}).then(function(topic){
                res.render('delete', {topics:topics, topic:topic[0]});
            });
        }
    });
});


app.post('/topic/:id/delete', function(req, res){
    var sql = 'DELETE FROM topic WHERE @rid=:rid' ;
    var _params ={
        params:{
            rid:req.params.id
        }
    };

    db.query(sql, _params).then(function(topics){
        res.redirect('/topic');
    });
});

/*app.get('/topic/:id', function(req, res){
    var id = req.params.id;
    fs.readdir('data',function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        fs.readFile('data/'+id, 'utf8', (err, data) => {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics:files, title:id, description:data});
        });
    });
});*/

app.get(['/topic','/topic/:id'], function(req, res){
    var sql = 'SELECT FROM topic ' ;
    db.query(sql).then(function(topics){
        var id = req.params.id;
        if(id){
            sql += 'WHERE @rid=:rid';
            db.query(sql, {params:{rid:id}}).then(function(topic){
                res.render('view', {topics:topics, topic:topic[0]});
            });
        }else{
            var welcome = {title:'Welcome', description:'Hello, Javascript server..'}
            //res.render('view', {topics:topics, topic:welcome});
            res.render('view', {topics:topics});
        }
    });

    /*fs.readdir('data',function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.name;
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

    var sql = 'INSERT INTO topic (title, description, author) '
              +'values (:title, :description, :author)';
    var _params = {
        params : req.body
    };

    db.query(sql, _params).then(function(topics){
        res.redirect('/topic/'+encodeURIComponent(topics[0]['@rid']));
    });
    /*fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });*/
})

app.listen('3000', function(req,res){
    console.log('connection 3000port...')
});