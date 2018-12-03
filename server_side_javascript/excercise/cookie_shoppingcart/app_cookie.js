var express=require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());

var products= {
    1:{title:'The history of Web1'},
    2:{title:'The next web'}
}
app.get('/product', function(req, res){
    var output = '';
    for(var name in products){
        output += `<li><a href="/cart/${name}">${products[name].title}</a></li>` ;   
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});


app.get('/cart/:id', function(req, res){
    if(req.cookies.cart){
        var cart = req.cookies.cart
    }else{
        cart = {};
    }

    if(!cart[id]){
        cart[id] = 0;
    }

    cart[i] = parseInt(card[i])+1;
    res.cookie('cart', cart);
    res.redirect('/cart')
    res.send(req.params.id);


})

app.listen(3000, function(req, res){
    console.log('connected 3000 port....')
})