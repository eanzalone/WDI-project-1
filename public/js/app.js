// CLIENT SIDE JS
console.log('Client Side JS is connected.');

$(document).ready(function(){

	function toggleLogins() {

		$('#signup-form').addClass('hideForm');
			console.log('Add class to signup');
		// this adds the class to my button, which makes it not show.
		$('#login-form').removeClass('hideForm');
			console.log('Remove class from Login');
		// this adds the class to my button, which makes it show.
		$('#gotoSignup').removeClass('hideForm');
			console.log('Show Signup Button');
		$('#gotoLogin').addClass('hideForm');
			console.log('Hide Login Button');

	}

// DISABLE SUBMIT BUTTON ON FORMS
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
			window.location.href='/dash';
		});
	});

// DROPDOWN CHAR FORM
	$(".dropdown-menu li a").click(function(e){
	  e.preventDefault();
	  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
	  $('input[name=selProj]').val($(this).data('value'));
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
			window.location.href='/dash';
		});
	});

 	$('#newProjBtn').click(function(e){
 		e.preventDefault();
 		console.log('new project clicked');
 		window.location.href='/new-project';
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
		
		})
		.success(function(data) {
			console.log("new user created", data);
			window.location.href = '/dash';
		})
		.error(function(data) {
			console.log("failed to create new user");
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

// TOGGLE FORMS ON SIGNUP PAGE

	$('#gotoLogin').click(function(){
		console.log('Go To Login Clicked');
		toggleLogins();
		// $('#signup-form').addClass('hideForm');
		// 	console.log('Add class to signup');
		// // this adds the class to my button, which makes it not show.
		// $('#login-form').removeClass('hideForm');
		// 	console.log('Remove class from Login');
		// // this adds the class to my button, which makes it show.
		// $('#gotoSignup').removeClass('hideForm');
		// 	console.log('Show Signup Button');
		// $('#gotoLogin').addClass('hideForm');
		// 	console.log('Hide Login Button');
	});

	$('#gotoSignup').click(function(){
		console.log('Go To Login Clicked');
		$('#signup-form').removeClass('hideForm');
			console.log('Add class to signup');
		// this adds the class to my button, which makes it not show.
		$('#login-form').addClass('hideForm');
			console.log('Remove class from Login');
		// this adds the class to my button, which makes it show.
		$('#gotoSignup').addClass('hideForm');
			console.log('Show Signup Button');
		$('#gotoLogin').removeClass('hideForm');
			console.log('Hide Login Button');
	});

}); // document ready function close