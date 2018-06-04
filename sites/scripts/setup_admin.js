$(document).ready(function() {
		
	setupAdmin();
			
	let firstName = readCookie("firstName");
	let lastName = readCookie("lastName");
	let email = readCookie("email");
	let role = readCookie("role");
				
	$('#logout').click(function () {
		deleteAllCookies();
		window.location.replace("login.html");
	});
				
	$(document ).ready(function() {				
		if(role==="ADMIN"){
			console.log("Logged in as admin");
		}else if(role === "LECTURER"){
			window.location.replace("lecturer.html");
		}else if(role==="STUDENT"){
			window.location.replace("student.html");
		}else{
			window.location.replace("login.html");
		}
	});
});	

function setupAdmin(){	
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
			console.log("ERROR: admin site");
		},
		success: function(data, txtStatus, xhr ) {
			createCookie("firstName", data.firstName, 7);
			createCookie("lastName", data.lastName, 7);
			
			$("#userInfo").append(  readCookie("firstName")+" "+readCookie("lastName"));
		}
	});
}

$(document).ready(function() {
	
	$('#submit').click(function () {
				
		let email = readCookie("email");
		
		let dataCorrect = true;
		
		setDefaultStyle();
		
		let userEmail = document.querySelector("#email").value;
		let userPassword = document.querySelector("#password").value;
		let userFirstName = document.querySelector("#firstName").value;
		let userLastName = document.querySelector("#lastName").value;
		let userRole = $("#role").val();
		
		if(!isEmail(userEmail)){
			document.getElementById("email").style.border = "2px solid #f00";
			document.getElementById("email").style.color = "#f00";
			document.getElementById("email").style.backgroundColor = "#ffb6b6";
			dataCorrect=false;
		}
		if(userFirstName.length>50 || userFirstName.length<2){
			document.getElementById("firstName").style.border = "2px solid #f00";
			document.getElementById("firstName").style.color = "#f00";
			document.getElementById("firstName").style.backgroundColor = "#ffb6b6";
			dataCorrect=false;
		}
		if(userLastName.length>60 || userLastName.length<2){
			document.getElementById("lastName").style.border = "2px solid #f00";
			document.getElementById("lastName").style.color = "#f00";
			document.getElementById("lastName").style.backgroundColor = "#ffb6b6";
			dataCorrect=false;
		}
		if(userPassword.length>60 || userPassword.length<6){
			document.getElementById("password").style.border = "2px solid #f00";
			document.getElementById("password").style.color = "#f00";
			document.getElementById("password").style.backgroundColor = "#ffb6b6";
			dataCorrect=false;
		}
		
		if(dataCorrect){
			$.ajax({
				url: 'http://localhost:8080/api/user',
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
				crossDomain: true,
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", readCookie("token"));
				},
				error: function(){
					document.getElementById("errorInfo").style.display = "block";
					document.getElementById("successInfo").style.display = "none";
				},
				success: function(txtStatus, xhr ) {
					document.getElementById("errorInfo").style.display = "none";
					document.getElementById("successInfo").style.display = "block";
				}
			});
		}
	});  

	$('#submitCourse').click(function () {
				
		let email = readCookie("email");
		
		let dataCorrect = true;
		
		setDefaultStyleForCourse();
		
		let courseName = document.querySelector("#name").value;
		let courseDescription = document.querySelector("#description").value;
		let courseDate = document.querySelector("#date").value;
		
		courseDate = reverseDate(courseDate);
		
		if(courseName.length<5 || courseName>150){
			document.getElementById("name").style.border = "2px solid #f00";
			document.getElementById("name").style.color = "#f00";
			document.getElementById("name").style.backgroundColor = "#ffb6b6";
			dataCorrect=false;
		}
		
		if(courseDescription.length<5 || courseDescription.length>300){
			document.getElementById("description").style.border = "2px solid #f00";
			document.getElementById("description").style.color = "#f00";
			document.getElementById("description").style.backgroundColor = "#ffb6b6";
			dataCorrect=false;
		}
		
		if(courseDate.length<10){
			document.getElementById("date").style.border = "2px solid #f00";
			document.getElementById("date").style.color = "#f00";
			document.getElementById("date").style.backgroundColor = "#ffb6b6";
			dataCorrect=false;
		}
		
		if(dataCorrect){
			$.ajax({
				url: 'http://localhost:8080/api/course',
				method: 'POST',
				contentType: 'application/json',	
				data: JSON.stringify(
					{ 
						"date": courseDate,
						"name": courseName,
						"description": courseDescription
					}
				),				
				crossDomain: true,
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", readCookie("token"));
				},
				error: function(){
					document.getElementById("errorInfo").style.display = "block";
					document.getElementById("successInfo").style.display = "none";
				},
				success: function(txtStatus, xhr ) {
					document.getElementById("errorInfo").style.display = "none";
					document.getElementById("successInfo").style.display = "block";
				}
			});
		}
	});  
});

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function setDefaultStyle(){
	document.getElementById("errorInfo").style.display = "none";
	document.getElementById("successInfo").style.display = "none";
	
	document.getElementById("email").style.border = "2px solid #ddd";
	document.getElementById("email").style.color = "#666";
	document.getElementById("email").style.backgroundColor = "#efefef";
	
	document.getElementById("password").style.border = "2px solid #ddd";
	document.getElementById("password").style.color = "#666";
	document.getElementById("password").style.backgroundColor = "#efefef";
	
	document.getElementById("firstName").style.border = "2px solid #ddd";
	document.getElementById("firstName").style.color = "#666";
	document.getElementById("firstName").style.backgroundColor = "#efefef";
	
	document.getElementById("lastName").style.border = "2px solid #ddd";
	document.getElementById("lastName").style.color = "#666";
	document.getElementById("lastName").style.backgroundColor = "#efefef";
}

function setDefaultStyleForCourse(){
	document.getElementById("errorInfo").style.display = "none";
	document.getElementById("successInfo").style.display = "none";
	
	document.getElementById("name").style.border = "2px solid #ddd";
	document.getElementById("name").style.color = "#666";
	document.getElementById("name").style.backgroundColor = "#efefef";
	
	document.getElementById("description").style.border = "2px solid #ddd";
	document.getElementById("description").style.color = "#666";
	document.getElementById("description").style.backgroundColor = "#efefef";
	
	document.getElementById("date").style.border = "2px solid #ddd";
	document.getElementById("date").style.color = "#666";
	document.getElementById("date").style.backgroundColor = "#efefef";
}

function reverseDate(str){
	str = str.substr(3, 2)+"-"+str.substr(0, 2)+"-"+str.substr(6, 4);
	return str = str.split('-').reverse().join('-');	
}