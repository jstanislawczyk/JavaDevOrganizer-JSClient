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
			window.location.replace("admin.html");
		}else if(role === "LECTURER"){
			window.location.replace("lecturer.html");
		}else if(role==="STUDENT"){
			setupStudent(email, password);
		}else{
			window.location.replace("login.html");
		}
	});
});

function setupStudent(email, password){	

	var userId = readCookie("id");

	var coursesStatus = new Map();
	
	$.ajax({
		url: 'http://localhost:8080/student/'+userId+'/courses/',
		method: 'GET',
		contentType: 'application/json',				
		dataType: 'json',
		crossDomain: true,
		beforeSend: function ( xhr ) {
			xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( email+':'+password) );
		},
		error: function(){
			console.log("error");
		},
		success: function(data, txtStatus, xhr) {	
			$.each(data, function(courseId, present) {
				coursesStatus.set(parseInt(courseId), present);
			});
		}
	});
	
	$.ajax({
		url: 'http://localhost:8080/api/courses',
		method: 'GET',
		contentType: 'application/json',				
		dataType: 'json',
		crossDomain: true,
		beforeSend: function ( xhr ) {
			xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( email+':'+password) );
		},
		error: function(){
			console.log("error");
		},
		success: function( data, txtStatus, xhr ) {		
			
			let date = new Date();
			let todayDateInMillis = date.getTime();
							
			$.each(data, function(index, course) {
				
				let courseDate = new Date(course.date);
				let courseDateInMills = courseDate.getTime();
				
				if(courseDateInMills<=todayDateInMillis){			
					if(coursesStatus.has(course.id)){
						if(coursesStatus.get(parseInt(course.id))){
							$('.main').append(
							'<div class="course"><div class="courseName"><b>'+course.name
							+'</b><br />'+course.date+'</div>'
							+'<div class="courseDescription">'+course.description+'<input id="'+course.id+'-presence" class="registeredPresenceLabel" type="button" value="V" disabled/>'
							+'</div><div style="clear: both"></div></div>');
						}else{
							$('.main').append(
							'<div class="course"><div class="courseName"><b>'+course.name
							+'</b><br />'+course.date+'</div>'
							+'<div class="courseDescription">'+course.description+'<input id="'+course.id+'-absence" class="registeredAbsenceLabel" type="button" value="X" disabled/>'
							+'</div><div style="clear: both"></div></div>');
						}
					}else{
						$('.main').append(
						'<div class="course"><div class="courseName"><b>'+course.name
						+'</b><br />'+course.date+'</div>'
						+'<div class="courseDescription">'+course.description+'<input id="'+course.id+'-presence" onclick="registerPresence('+course.id+')" class="unregisteredPresenceButton" type="button" value="V"/>'
						+'<input id="'+course.id+'-absence" onclick="registerAbsence('+course.id+')" class="unregisteredAbsenceButton" type="button" value="X"/>'
						+'</div><div style="clear: both"></div></div>');
					}
				}else{
					
					$('.main').append(
					'<div class="course"><div class="courseName"><b>'+course.name
					+'</b><br />'+course.date+'</div>'
					+'<div class="courseDescription">'+course.description+'<input id="'+course.id+'" class="disabledPresenceButton" type="button" value="V"  disabled/>'
					+'<input id="'+course.id+'" class="disabledPresenceButton" type="button" value="X"  disabled/>'
					+'</div><div style="clear: both"></div></div>');	
				}		
			});	
		}
	});	
}

function registerPresence(courseId){
	let userId = readCookie("id");
	let password = readCookie("password");
	let email = readCookie("email");
	let url = 'http://localhost:8080/student/'+userId+'/courses/'+courseId+'?present=true';

	$.ajax({
		url: url,
		method: 'POST',
		crossDomain: true,
		beforeSend: function ( xhr ) {
			xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( email+':'+password) );
		},
		error: function(){
			console.log("error");
		},
		success: function(txtStatus, xhr ) {
			document.getElementById(courseId+"-presence").classList.add('registeredPresenceLabel');
			document.getElementById(courseId+"-presence").classList.remove('unregisteredPresenceButton');
			$( "#"+courseId+"-absence" ).remove();
			document.getElementById(courseId).disabled = true;	
		}
	});
}


function registerAbsence(courseId){
	let userId = readCookie("id");
	let password = readCookie("password");
	let email = readCookie("email");
	let url = 'http://localhost:8080/student/'+userId+'/courses/'+courseId+'?present=false';

	$.ajax({
		url: url,
		method: 'POST',
		crossDomain: true,
		beforeSend: function ( xhr ) {
			xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( email+':'+password) );
		},
		error: function(){
			console.log("error");
		},
		success: function(txtStatus, xhr ) {
			document.getElementById(courseId+"-absence").classList.add('registeredAbsenceLabel');
			document.getElementById(courseId+"-absence").classList.remove('unregisteredAbsenceButton');
			$( "#"+courseId+"-presence" ).remove();
			document.getElementById(courseId).disabled = true;	
		}
	});
}




