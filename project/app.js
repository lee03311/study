var express = require('express'); //모듈 로드
var bodyParser = require('body-parser');
var firebase = require("firebase");
var dateFormat = require('dateformat');

var app = express(); //함수

app.locals.pretty = true;
app.set('views', './views'); //폴더명
app.set('view engine', 'pug'); //views 폴더에서 pug 확장자 파일을 찾아 결과를 뿌림
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//css 폴더에 접근할수 있음
app.use(express.static('./css'));
app.use(express.static('./js'));

app.use(bodyParser.urlencoded({extended:false}));

var config = {
    apiKey: "AIzaSyDG1mV_4yasiUJkUiyYM-nCOMra_Z3jhw4",
    authDomain: "start-moon.firebaseapp.com",
    databaseURL: "https://start-moon.firebaseio.com",
    projectId: "start-moon",
    storageBucket: "start-moon.appspot.com",
    messagingSenderId: "516803201821"
  };
firebase.initializeApp(config);

app.get('/', function(req, res){
    res.render('list');
});

app.get('/list', function(req,res){
    firebase.database().ref('data').orderByChild('date').startAt(req.query.startDate).endAt(req.query.endDate).once('value', function(snapshot) {
        var rows = [];
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();

            if(data.date){
                var date = data.date;
                data.date = dateFormat(date, 'mm/dd');
            }
            rows.push(data)
        });
        res.send({result:'success', rows:rows});
    });
});

app.get('/view', function(req, res){
    var id = req.query.id;

    firebase.database().ref('data/'+id).once('value', function(snapshot) {

        var data = snapshot.val();
        //var date = data.date;
        //data.date = dateFormat(date, 'mm/dd');

        res.send({result:'success', data:data});
    });
})


app.post('/add', function(req, res){
   var data = req.body;

   if(!data.id){
       data.id = firebase.database().ref().child('data').push().key;
   }

   if(data.id){
        firebase.database().ref('data/'+data.id).set(data);
   }

   res.redirect('/');
});

app.listen(3003, function(){
    console.log('Connected 3000 port!');
});





