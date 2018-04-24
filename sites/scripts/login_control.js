$(document).ready(function() {
				
				deleteAllCookies();
				
				$('#submit').click(function () {
				
					let email = document.querySelector("#email").value;
					let password = document.querySelector("#password").value;
					
					deleteAllCookies();
					
					$.ajax({
						url: 'http://localhost:8080/auth/user/data/check',
						method: 'POST',
						contentType: 'application/json',	
						data: JSON.stringify({ "email": email}),				
						dataType: 'json',
						crossDomain: true,
						beforeSend: function ( xhr ) {
							xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( email+':'+password) );
						},
						error: function(){
							 document.getElementById("errorInfo").style.display = "block";
						},
						success: function( data, txtStatus, xhr ) {
							createCookie("id", data.id, 7);	
							createCookie("email", email, 7);		
							createCookie("role", data.role, 7);	
							createCookie("password", password, 7);
							createCookie("firstName", data.firstName, 7);	
							createCookie("lastName", data.lastName, 7);	
							
							if(data.role==="ADMIN"){
								window.location.replace("admin.html");
							}else if(data.role === "LECTURER"){
								window.location.replace("lecturer.html");
							}else if(data.role==="STUDENT"){
								window.location.replace("student.html");
							}else{
								window.location.replace("login.html");
							}
						}
					});
				});    
			});