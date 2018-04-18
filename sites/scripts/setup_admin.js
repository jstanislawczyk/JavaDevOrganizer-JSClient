$(document).ready(function() {
			
	let firstName = readCookie("firstName");
	let lastName = readCookie("lastName");
	let password = readCookie("password");
	let email = readCookie("email");
	let role = readCookie("role");
				
	$('#logout').click(function () {
		deleteAllCookies();
		window.location.replace("login.html");
	});
				
	$(document ).ready(function() {
		$("#userInfo").append( firstName+" "+lastName);
					
		if(role==="ADMIN"){
			setupAdmin(email, password);
		}else if(role === "LECTURER"){
			window.location.replace("lecturer.html");
		}else if(role==="STUDENT"){
			window.location.replace("student.html");
		}else{
			window.location.replace("login.html");
		}
	});
});	

function setupAdmin(email, password){	

}

$(document).ready(function() {
	
	$('#submit').click(function () {
				
		let password = readCookie("password");
		let email = readCookie("email");
		
		
		let userEmail = document.querySelector("#email").value;
		let userPassword = document.querySelector("#password").value;
		let userFirstName = document.querySelector("#firstName").value;
		let userLastName = document.querySelector("#lastName").value;
		let userRole = document.querySelector("#role").value;
					
		$.ajax({
			url: 'http://localhost:8080/admin_control/create_user',
			method: 'POST',
			contentType: 'application/json',	
			data: JSON.stringify(
				{ 
					"email": userEmail,
					"password": userPassword,
					"firstName": userFirstName,
					"lastName": userLastName,
					"role": userRole
				}
			),				
			dataType: 'json',
			crossDomain: true,
			beforeSend: function ( xhr ) {
				xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( email+':'+password) );
			},
			error: function(){
				document.getElementById("errorInfo").style.display = "block";
				document.getElementById("successInfo").style.display = "none";
			},
			success: function( data, txtStatus, xhr ) {
				document.getElementById("errorInfo").style.display = "none";
				document.getElementById("successInfo").style.display = "block";
			}
		});
	});    
});