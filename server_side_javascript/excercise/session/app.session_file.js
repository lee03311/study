var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);//파일에 세션을 저장할 때 사용
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret : 'testestesteetstsetest',
    resave : false,
    saveUninitialized : true,
    store : new FileStore()
}));


app.get('/count', function(req, res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send('Hi session');
})

app.get('/auth/login', function(req, res){
    var output = `
        <h1>LOGIN</h1>
        <form aciton ="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username"/>
            </p>
            <p>
                <input type="password" name="password" placeholder="password"/>
            </p>
            <p>
                <input type="submit"/>
            </p>
        </form>`
    res.send(output);
});

app.post('/auth/login', function(req, res){
    var user = {
        username : 'egoing',
        password : '111',
        displayName : 'Egoing'
    };

    var uname = req.body.username;
    var pwd = req.body.password;

    if(user.username === uname && user.password === pwd){
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
        //res.send('<h1>'+uname + '님, 로그인 되었습니다</h1>')
    }else{
        res.send('정보가 없습니다.');
    }
});

app.get('/welcome', function(req, res){
    if(req.session.displayName){
        res.send(`
            <h1>Hello, ${req.session.displayName}</h1>
            <a href="/auth/logout">logout</a>
        `);   
    }else{
        res.send(`
            <h1>Welcome</h1>
            <a href = "/auth/login">Login</a>
        `)
    }
});

app.get('/auth/logout', function(req, res){
    delete req.session.displayName;
    res.redirect('/welcome');
});

app.get('tmp', function(req, res){
    res.send('result : ' + req.session.count);
})

app.listen(3000, function(){
    console.log('Connected 3000 port....')
});