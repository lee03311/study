var express=require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser('234234@#$234234@#$'));

var products= {
    1:{title:'The history of Web1'},
    2:{title:'The next web'}
}

app.get('/count', function(req, res){
    //var count = req.cookies.count;
    if(req.signedCookies.count){
       var count = parseInt(req.signedCookies.count);
    }else{
       var count = 0;
    }
    count = count +1 ;
    res.cookie('count', count, {signed:true});
    res.send('count : ' + count);
})

app.get('/product', function(req, res){
    var output = '';
    for(var name in products){
        output += `<li><a href="/cart/${name}">${products[name].title}</a></li>` ;   
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});


app.get('/cart/:id', function(req, res){
    var id = req.params.id;

    var cart = {}
    if(req.signedCookies.cart){
        cart = req.signedCookies.cart;
    }

    if(!cart[id]){
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id])+1;

    res.cookie('cart', cart ,{signed:true});
    res.redirect('/cart');
});

app.get('/cart', function(req, res){
    var cart = req.signedCookies.cart;

    if(!cart){
        res.send('Empty!!!');
    }

    var output = '';
    for(var id in cart){
        output += `<li> ${products[id].title} (${cart[id]}) </li>`;
    }
    res.send(`<ul>${output}</ul><a href='/product'>products list</a>`);
});

app.listen(3000, function(req, res){
    console.log('connected 3000 port....')
});