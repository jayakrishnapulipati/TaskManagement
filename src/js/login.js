$(function() {
	var userInformation = {
		userName: 'admin',
		password: 'Design_20'
	};
	localStorage.setItem('user', JSON.stringify(userInformation));

    //Login button action
    $('#submit ').click(function(e){
        e.preventDefault();
    	var user = $('input[name=username]').val();
    	var pwd = $('input[name=password]').val();
        var userInfo = JSON.parse(localStorage.getItem('user'));
    	if(userInfo.userName === user && userInfo.password === pwd) {
    		window.location.href = 'home.html';
    	}
    	else{
    		alert('Please check your credentials');
    	}
    });
});