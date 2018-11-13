var fs = require('fs');
console.log('1');


console.log('2')

//async
var data = fs.readFile('data.txt', {encoding:'utf8'}, function(err, data){
    console.log('3')
    console.log(data);
});

console.log('4');

//sync
//var data = fs.readFileSync('data.txt', {encoding:'utf8'});
//console.log(data)