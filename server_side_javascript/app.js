var express = require('express'); //모듈 로드
var bodyParser = require('body-parser');
var app = express(); //함수

app.locals.pretty = true;
app.set('views', './views'); //폴더명
app.set('view engine', 'pug'); //views 폴더에서 pug 확장자 파일을 찾아 결과를 뿌림

//public 폴더에 접근할수 있음
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));

app.get('/form', function(req,res){
    res.render('form');
});

app.post('/form_reciever', function(req,res){
    var title = req.body.title;
    var desc = req.body.description;
    res.send(title+','+desc);
});


app.get('/topic', function(req, res){
    // res.send(req.query.id+', '+req.query.name);
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is ...'
    ];
    var output = `
        <a href="/topic?id=0">Javascript</a><br/>
        <a href="/topic?id=1">Nodejs</a><br/>
        <a href="/topic?id=2">Express</a><br/><br/>

        ${topics[req.params.id]}
    `;
    

    // ${topics[req.query.id]}
    res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id + req.params.mode);
})


app.get('/', function(req, res){
    res.send('Hello World!');
});

app.get('/template', function(req,res){
    res.render('index.pug',{time:Date()});
});

app.get('/dynamic', function(req,res){
    var text = `<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        dynamic
    </body>
    </html>`;

    res.send(text);
});

app.get('/router', function(req, res){
    res.send('<img src="/common.jpeg"/>');
});

app.get('/login', function(req, res){
    res.send('Login please');
});

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});

//expressjs.com에 예시 소스
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//express의 get()은 라우터의 역할을 한다.
//라우터는 사용자의 요청과 그에 따른 컨트롤러의 응답을 연결해주는, 중개해주는 중개자의 역할을 한다. 
//웹을 만드는데 있어서 굉장히 중요한 역할을 한다