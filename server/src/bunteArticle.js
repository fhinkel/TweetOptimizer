
var getBunteData = require('./interfaceToBunte').getAnalysis;


exports.getHeadline = function(headline, next) {
    var headline = "Wetten, dass..?";
    var title = "Schlechteste Quote aller Zeiten!";

    getBunteData(function(error, data) {
        next( null, headline + ' ' + title);
    });

};