var port = process.env.PORT || 1337;
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+"/src/")).listen(port, function(){
    console.log('Server running on '+port);
});
