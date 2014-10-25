$(document).ready(function(){
    console.log('hello tweet');

    $("#tweet").on('click', function(data) {
        console.log('tweet: ' + $("#input").val());
    });
});