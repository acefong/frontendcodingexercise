(function(){
	'use strict';
	var subscribe = function() {
		//Stop popup from triggering after it's been displayed once. (Don't want to annoy the user)
		if(sessionStorage.getItem('popupflag') === "0"){
			document.getElementById('subscribe-box').style.opacity = "1";
			document.getElementById('subscribe-box').style.transform = "scale(1)";
			document.getElementById('overlay').style.width = "100%";
			document.getElementById('overlay').style.height = "100%";
			document.getElementById('overlay').style.opacity = "1";
			sessionStorage.setItem('popupflag', '1');
		}
	};
	//Close subscribe box
	var closebox = function(){
		document.getElementById('subscribe-box').style.opacity = "0";
		document.getElementById('overlay').style.width = "0";
		document.getElementById('overlay').style.height = "0";
		document.getElementById('overlay').style.opacity = "0";
	};
	//Window popup after 5 seconds 
	setTimeout(function() {	subscribe();}, 5000);
	//Setup click counts Session storage
	var clickCounter = function() {
		var count = parseInt(sessionStorage.getItem('clickcount'));
		count += 1; 
		sessionStorage.setItem("clickcount", count);
		console.log(count);
	};
	//Initialize buttons onload
	window.onload = init;
	function init() {
		//Invitation message - Only need to modify it here to change it across all pages
		var inviteMsg = "You seem to like our website! Why not sign up for our email list? We'll send you updates whenever something changes!";
		document.getElementById('subscribe-text').innerHTML= inviteMsg;
		//Set sessionStorage (clears on window/tab close)
		//Initialize only if it's the first time
		if(!sessionStorage.getItem('clickcount')){
			console.log("TEST");
			sessionStorage.setItem('clickcount','1');
			sessionStorage.setItem('popupflag', '0');
		}else {
			//Trigger subscribe window after visiting 5 pages
			if(parseInt(sessionStorage.getItem('clickcount')) === 5){
				subscribe();
			}
		}

		//Bind close function to close button
		var cl = document.getElementById('subscribe-cancel');
		cl.addEventListener('click', function() {
			closebox();
		}, false);

		//Bind submit function
		var sub = document.getElementById('subscribe-submit');
		sub.addEventListener('click', function() {
			var email = document.getElementById('subscribe-email');
			console.log(email.value);
			if(validateEmail(email.value)){
				//Submit function HERE...
				alert("Thanks for subscribing, " + email.value + "!");
				closebox();
			}else{
				email.className = email.className + " error";
				alert("Please enter a valid email.");
			}
		});

		//Bind click counter to all anchor tags to trigger subscribe popup
		var anchor = document.getElementsByTagName('a');
		for(var i=0; i < anchor.length; i++){
			anchor[i].addEventListener('click', clickCounter);
		}
	}

	function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
	}
	/*END init */
})(window); 