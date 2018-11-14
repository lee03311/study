var express = require('express'); //모듈 로드
var app = express(); //함수

//public 폴더에 접근할수 있음
app.use(express.static('public'));

app.get('/', function(req, res){
    res.send('Hello World!');
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