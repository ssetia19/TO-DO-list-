var username2 = document.querySelector("#user2");
var password2 = document.querySelector("#key2");
var name2 = document.querySelector('#name2');
var question2 = document.querySelector('#que2');
var answer2 = document.querySelector('#ans2');
var signup2 = document.querySelector("#signupbutton2");
var loc = localStorage.getItem('user');
var error = document.querySelector('#error');
var input = document.getElementsByTagName("input");

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

if (loc == undefined || loc == null || loc=='') {
	}else{
		window.open("./to do.html","_self");
	}
	for (var i = 0; i < input.length; i++) {
		input[i].onkeydown  = add;
	}
	

	function add(event){
			if(event.keyCode == 13){
				click();
			}
		}
signup2.onclick = click;
 
function click(){
		error.innerHTML = '';
		var u2 = username2.value;
	var p2 = password2.value;
	var n2 = name2.value;
	var q2 = question2.value;
	var a2 = answer2.value;

	var connectedRef = firebase.database().ref(".info/connected");
	setTimeout(function(){
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
		  }
   if (snap.val()===false){
   error.style.display = 'block';
		  error.innerHTML="No Internet Connection.Please Reload the page <b>:(</b>";
		  
  }
});}, 1000);
	if(u2 !== "" && p2!== "" && n2!=="" && q2!=="" && a2!=="") {
		error.innerHTML = "";
		check(u2);
	}
	else {
		if(u2 == ""){
			username2.style.borderColor = "red";
			username2.style.backgroundColor = "#ff0000";
		}if(p2 == ""){
			password2.style.borderColor = "red";
			password2.style.backgroundColor = "#ff0000"; 
		}if(n2 == ""){	
			name2.style.borderColor = "red";
			name2.style.backgroundColor = "#ff0000"; 
		}if(q2 == ""){
			question2.style.borderColor = "red";
			question2.style.backgroundColor = "#ff0000"; 
		}if (a2 == ""){
			answer2.style.borderColor = "red";
			answer2.style.backgroundColor = "#ff0000"; 
		}
		error.style.display = 'block';
		error.style.color = 'red';
		  error.innerHTML="<b>X</b> Fields cannot be empty";
}
}

function check (u){
	firebase.database()
		.ref('/users/' + u)
		.once('value')
		.then(function(snapshot){
			if(snapshot.val() === null){
				signedup();}
			 else {
			 	error.style.display = 'block';
			 	username2.value = '';
			 	username2.style.borderColor = "red";
			 	username2.style.backgroundColor = "#ff0000";
			 	error.style.color = 'red';
			 	error.innerHTML="<b>X</b> Username already exists";

			 }
			});
}

function signedup() {
	var u2 = username2.value;
	var p2 = password2.value;
	var n2 = name2.value;
	var q2 = question2.value;
	var a2 = answer2.value;
	firebase.database().ref('/users/' + u2).set({
		name: n2,
		username: u2,
		password: p2,
		question: q2,
		answer: a2
	});
	localStorage.setItem('user',u2);
	window.open("./to do.html","_self");
}