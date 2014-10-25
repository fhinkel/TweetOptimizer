var http = require('http');

exports.getAnalysis = function(next) {


    var username = "hackday";
    var password = "opendata";

    var options = {
        hostname: 'staging-bunte-api.bip-intern.de',
        port: 80,
        path: '/api/app/2.1/home',
        auth: username + ':' + password
    };


    var data = '';
    http.get(options, function (res) {
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            next(null, JSON.parse(data));
            //console.log(data);
        });

    }).on('error', function (e) {
        console.log("Got error: " + e.message);
        next(e);
    });


};