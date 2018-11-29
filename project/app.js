var express = require('express'); //모듈 로드
var bodyParser = require('body-parser');
var app = express(); //함수

app.locals.pretty = true;
app.set('views', './views'); //폴더명
app.set('view engine', 'pug'); //views 폴더에서 pug 확장자 파일을 찾아 결과를 뿌림
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//css 폴더에 접근할수 있음
app.use(express.static('./css'));

app.use(bodyParser.urlencoded({extended:false}));

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});

app.get('/', function(req, res){
    res.render('list');
});