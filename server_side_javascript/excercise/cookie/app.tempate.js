var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
app.get('/count', function(req, res){
    res.cookie('count', 1)
    res.send('count : ' + req,cookies.count);
})

app.listen(3003, function(){
    console.log('Connected 3003 port....')
});