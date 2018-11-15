console.log(exports)
module.exports.list = function(req, res){
    res.send('board listing');
};

module.exports.view = function(req, res){
    res.send('board view');
};
