// CLIENT SIDE JS
console.log('Client Side JS is connected.');

$(document).ready(function(){

$("#newCharacter").validate();
$('#newCharacter input').on('blur keyup', function() {
    if ($("#newCharacter").valid()) {
        $('#charSubmitBtn').prop('disabled', false);  
    } else {
        $('#charSubmitBtn').prop('disabled', 'disabled');
    }
});

$("#newProject").validate();
$('#newProject input').on('blur keyup', function() {
    if ($("#newProject").valid()) {
        $('#projectSubmitBtn').prop('disabled', false);  
    } else {
        $('#projectSubmitBtn').prop('disabled', 'disabled');
    }
});

// ADD NEW CHARACTER
	$('#newCharacter').submit(function(e){
		e.preventDefault();
		console.log('Submit Clicked!');

		var characterData = $(this).serialize();
		console.log(characterData);

		$.post('/api/characters', characterData, function(newPost){
			console.log(newPost);
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

// ADD NEW PROJECT
	$('#newProject').submit(function(e){
		e.preventDefault();
		console.log('Submit Clicked!');

		var projectData = $(this).serialize();
		console.log(projectData);
		$.post('/api/projects', projectData, function(newPost){
			console.log(newPost);
		});
	});

// DELETE PROJECT-????

// CHECK AUTH
	function checkAuth() {
		$.get('/current-user', function (data) {
			//console.log(data);
			if (data.user) {
				$('.not-logged-in').hide();
				$('.logged-in').show();
			} else {
				$('.not-logged-in').show();
				$('.logged-in').hide();
			}
		});
	}
	checkAuth();

// SIGNUP FORM
	$("#signup-form").submit(function(e) {
		e.preventDefault();
		console.log('Submit Clicked');
		var user = $(this).serialize();

		$.post('/users', user, function (data) {
			console.log(data);
			checkAuth();
		});
	});

// LOGIN FORM
	$("#login-form").on('submit', function(e){
		e.preventDefault();
		console.log('Login Clicked');
		var user = $(this).serialize();

		$.ajax({
			url: '/login',
			type: 'POST',
			data: user
		})
		.done(function (data){
			console.log("user logged in");
			checkAuth();
			window.location.href='/dash';
		})
		.fail(function (data){
			console.log("failed to log in");
		});
	});

// LOGOUT
	$('#logoutBtn').click(function(e){
		e.preventDefault();
		console.log('Logout Clicked');
		$.get('/api/logout', function (data){
		})
		.done(function (data){
			console.log("user logged out");
			checkAuth();
			window.location.href='/';
		})
		.fail(function (data){
			console.log("failed to log out");
		});
	});



}); // document ready function close