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
		//deleteItem(itemId);
		var btnClicked = $(this);
		$.ajax({
			url: '/api/characters/'+itemId,
			type: 'DELETE',
			success: function(response) {
				//console.log(response);
				btnClicked.closest('li').remove();
			}		
		});
	});

	// function deleteItem(context) {
	// 	console.log("context in deleteItem: ", context);
	//  	var charId = $(context).data().id;
	//  	console.log(charId);
	 		
	//  		$.ajax({
	//  			url: '/api/characters/' + charId,
	//  			type: 'DELETE',
	//  			success: function(response) {
	//  			  $(context).closest('li').remove();
	//  			}		
	//  		});
	// });





});