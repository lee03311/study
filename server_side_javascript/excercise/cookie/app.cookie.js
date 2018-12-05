var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser('234234@#$234234@#$'));

app.get('/count', function(req, res){
    //var count = req.cookies.count;
    var count = 0;
    if(req.signedCookies.count){
       count = parseInt(req.signedCookies.count);
    }else{
       count = 0;
    }
    count = count +1 ;
    res.cookie('count', count, {singed:true});
    res.send('count : ' + count);
})

app.listen(3003, function(){
    console.log('Connected 3003 port....');
});