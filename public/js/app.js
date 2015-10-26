// CLIENT SIDE JS
console.log('Client Side JS is connected.');

$(document).ready(function(){

	$('#newCharacter').submit(function(e){
		e.preventDefault();
		console.log('Submit Clicked!');

		var characterData = $(this).serialize();
		console.log(characterData);

		$.post('/api/characters', characterData, function(newPost){
			console.log(newPost);
			// WRITE PROPER APPEND DATA
			$('#charList').append('<li>' + newPost.name + '</li>');
		    // $('#newCharacter')[0].reset();
		});
	});

	$('.deleteBtn').click(function(e){
		console.log('Delete Clicked');
		var itemId = $(this).attr('data-id');
		console.log(itemId);
		$.delete('/api/characters/'+itemId, itemId, function(){
			// parent remove()
			this.parent.remove();
			res.json({});
		});
	});



});