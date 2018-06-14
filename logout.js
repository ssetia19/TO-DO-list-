var button = document.querySelector("#logout");

button.addEventListener('click',function () {
	localStorage.removeItem('user');
	window.open("./login.html","_self");
})