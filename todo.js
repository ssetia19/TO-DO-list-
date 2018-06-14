var inputBox = document.getElementById('textBox');
var username = localStorage.getItem('user');
var loc = localStorage.getItem('user');


if (loc == undefined || loc == null || loc=='') {
	window.open("./login.html","_self");
	}

	firebase.database().ref('/todo/'+username).once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
				var ch = document.createElement('li');
  		ch.setAttribute('data-value',childSnapshot.key);
			ch.innerText=childSnapshot.val().data;
			list.prepend(ch);
			ch.onclick=del;
			ch.onmouseenter=onHover;
			ch.onmouseleave=onMouseLeave;
  	})});
  	
  	inputBox.onkeydown = add;

		function add(event){
			var text = event.target.value;
			if(event.keyCode == 13){
				if(text.length){
					addToList(text);
				}
				event.target.value = '';
			}
		}
		

		function addToList(gotcha){
			
			var push = firebase.database().ref('/todo/' + username+'/').push({
			data:gotcha
		});
			var ch = document.createElement('li');
			ch.setAttribute('data-value',push.key);
			ch.innerText=gotcha;
			list.prepend(ch);
			ch.onclick=del;
			ch.onmouseenter=onHover;
			ch.onmouseleave=onMouseLeave;


		}

		function del(event){
			var data = event.target.getAttribute('data-value');
			firebase.database().ref('/todo/'+username+'/'+data).remove();
			list.removeChild(event.target);
		}
		
		var previousText = "";
		
		function onHover(event) {
			previousText = event.target.innerText;
			event.target.innerText = "Tap to Remove";
		}
		function onMouseLeave(){
			event.target.innerText = previousText;	
		}