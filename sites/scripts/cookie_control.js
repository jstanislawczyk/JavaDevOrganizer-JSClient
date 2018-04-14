function createCookie(name,value,days) {
	 if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	 }
	 else var expires = "";
	 document.cookie = name+"="+value+expires+";";
}
				
function deleteAllCookies() {
	let cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		let eqPos = cookie.indexOf("=");
		let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}