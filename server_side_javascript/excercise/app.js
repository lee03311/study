var express = require('express'); //모듈 로드
var app = express(); //함수

app.use('/index', require('./index'));

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});