var username1 = document.querySelector("#user1");
var password1 = document.querySelector("#key1");
var login1 = document.querySelector("#loginbutton1");
var loc = localStorage.getItem('user');
var error = document.querySelector('#error');
var input = document.getElementsByTagName("input");
var forgot = document.querySelector('#forgot1');
var c1 = document.querySelector('#construct');
var login = document.querySelector('#login');

if (loc == undefined || loc == null || loc=='') {
	}
else{
		window.open("./to do.html","_self");
	}
	error.style.display='block';
	error.innerHTML="Connecting...";
	error.style.color='springgreen';
var connectedRef = firebase.database().ref(".info/connected");
	setTimeout(function(){
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
   error.style.display = 'block';
		  error.innerHTML="Connected to Server :)";
		  error.style.color = 'springgreen';
		  }
   if (snap.val()===false){
   error.style.display = 'block';
   error.style.color='red';
		  error.innerHTML="woah! There is some problem with your Internet Connection :(";
  }
});}, 4000);

for (var i = 0; i < input.length; i++) {
		input[i].onkeydown  = add;
	}
	
	function add(event){
			if(event.keyCode == 13){
				click();
			}
		}

forgot.onclick= verify;
function verify() {
	login.style.display = 'none';
	c1.style.display = 'block';
}

login1.onclick = click;
	function click(){
	error.innerHTML = "";
	var u1 = username1.value;
	var p1 = password1.value;
	if(u1 !== "" && p1!== "") {
		check(u1,p1);
	}
	else {

		if(u1 == ""){
			username1.style.borderColor = "red";
			username1.style.backgroundColor = "#ff0000";
		}if(p1 == ""){
			password1.style.borderColor = "red";
			password1.style.backgroundColor = "#ff0000"; 
		}
			error.style.display = 'block';
				error.style.color = 'red';
		  error.innerHTML="<b>X</b> Fields cannot be empty";
	}
}

function check (u,p){
	firebase.database()
		.ref('/users/' + u)
		.once('value')
		.then(function(snapshot){
			if(snapshot.val() === null){
				password1.value = '';
					error.style.display = 'block';
						error.style.color = 'red';
					error.innerHTML = "<b>X</b> Invalid Username/Password";	}
			 else if (snapshot.val().password == p)
			 	{
			 	loggedIn(snapshot.val().username);
				} else 
				{
					password1.value = '';
					error.style.display = 'block';
						error.style.color = 'red';
					error.innerHTML = "<b>X</b> Invalid Username/Password";
				}
			});
}

function loggedIn(username){
	localStorage.setItem('user',username);
	window.open("./to do.html","_self");
}	