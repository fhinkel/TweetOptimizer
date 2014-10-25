$.ready(function() {
  console.log('helloo');
});

$('#input').keyup(function(e){
  $('#character-count').html(e.target.value.length);
});
