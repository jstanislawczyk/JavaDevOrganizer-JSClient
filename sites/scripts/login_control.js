$(document).ready(function() {
				
				deleteAllCookies();
				
				$('#submit').click(function () {
				
					let email = document.querySelector("#email").value;
					let password = document.querySelector("#password").value;
					
					deleteAllCookies();
					
					$.ajax({
						url: 'http://localhost:8080/auth/token',
						method: 'POST',
						contentType: 'application/json',	
						data: JSON.stringify(
							{ 
								"email": email,
								"password": password
							}),				
						dataType: 'text',
						crossDomain: true,
						error: function(){
							document.getElementById("errorInfo").style.display = "block";
						},
						success: function( data, txtStatus, xhr ) {
							createCookie("token", "Token "+data, 7);	
							createCookie("email", email, 7);
													
							$.ajax({
								url: 'http://localhost:8080/api/me',
								method: 'GET',
								contentType: 'application/json',			
								dataType: 'json',
								crossDomain: true,
								beforeSend: function(request) {
									request.setRequestHeader("Authorization", readCookie("token"));
								},
								error: function(){
									 document.getElementById("errorInfo").style.display = "block";
								},
								success: function(data, txtStatus, xhr ) {	
									var role = data.authorities[0].authority;
									var id = data.id;
									
									createCookie("role", role, 7);	
									createCookie("id", id, 7);
									
									if(role==="ADMIN"){
										window.location.replace("admin.html");
									}else if(role === "LECTURER"){
										window.location.replace("lecturer.html");
									}else if(role==="STUDENT"){
										window.location.replace("student.html");
									}else{
										window.location.replace("login.html");
									}
								}
							});
						}
					});
				});    
			});