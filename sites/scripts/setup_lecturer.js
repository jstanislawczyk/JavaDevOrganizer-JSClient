$(document).ready(function() {
		
	setupLecturer();
			
	let firstName = readCookie("firstName");
	let lastName = readCookie("lastName");
	let email = readCookie("email");
	let role = readCookie("role");
				
	$('#logout').click(function () {
		deleteAllCookies();
		window.location.replace("login.html");
	});
				
	$(document).ready(function() {				
		if(role==="ADMIN"){
			window.location.replace("admin.html");
		}else if(role === "LECTURER"){
			console.log("Logged in as lecturer");
		}else if(role==="STUDENT"){
			window.location.replace("student.html");
		}else{
			window.location.replace("login.html");
		}
	});
});	

function setupLecturer(){
	var id = readCookie("id");
	var url = 'http://localhost:8080/api/user/'+id;
	
	$.ajax({
		url: url,
		method: 'GET',
		contentType: 'application/json',
		crossDomain: true,
		beforeSend: function(request) {
			request.setRequestHeader("Authorization", readCookie("token"));
		},
		error: function(){
			console.log("ERROR: lecturer site");
		},
		success: function(data, txtStatus, xhr ) {
			createCookie("firstName", data.firstName, 7);
			createCookie("lastName", data.lastName, 7);
			
			$("#userInfo").append(  readCookie("firstName")+" "+readCookie("lastName"));
		}
	});
}