var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');//file system

var app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty=true;
app.set('views','./view_form');//express 설정, view file 위치
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

/*app.get('/topic/:name', function(req, res){
    var id = req.params.name;
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

app.get(['/topic','/topic/:name'], function(req, res){
    fs.readdir('data',function(err, files){
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
    });
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