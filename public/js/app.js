// CLIENT SIDE JS
console.log('Client Side JS is connected.');

$(document).ready(function(){

// ADD NEW CHARACTER
	$('#newCharacter').submit(function(e){
		e.preventDefault();
		console.log('Submit Clicked!');

		var characterData = $(this).serialize();
		console.log(characterData);

		$.post('/api/characters', characterData, function(newPost){
			console.log(newPost);
			// WRITE PROPER APPEND DATA
			$('#charList').append('<li>' + newPost.name + '</li>');
		    $('#newCharacter')[0].reset();
		});
	});

// DELETE CHARACTER DETAIL
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
				$('[data-id="#'+itemId+'"]').remove();
			}		
		});
	});

// SIGNUP FORM
	// breakout ver //
	// $('#newUserSubmit').click(function(e){
	// 	e.preventDefault();
	// 	console.log('User Submitted');
	// 	// select the form and serialize its data
	// 	var signupData = $("#signup-form").serialize();
	// 	console.log(signupData);
	// 	// send POST request to /users with the form data
	// 	$.post('/users', signupData, function(response){
	// 		console.log(response);
	// 	});
	// });
	
	// braus ver //
	$('#signup-form').submit(function(e){
		e.preventDefault();
		var user = $(this).serialize();
		console.log(user);

		$.post('/users', user, function (data){
			console.log(data);
		});
	});

// LOGIN FORM




}); // document ready function close