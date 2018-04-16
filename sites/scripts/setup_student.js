function setupStudent(email, password){	
	
	$.ajax({
		url: 'http://localhost:8080/course/show_all_courses',
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
					$('.main').append(
					'<div class="course"><div class="courseName"><b>'+course.name
					+'</b><br />'+course.date+'</div>'
					+'<div class="courseDescription">'+course.description+'<input id="'+course.id+'" onclick="registerPresence(this.id)" class="registerPresenceButton" type="button" value="V"/>'
					+'</div><div style="clear: both"></div></div>');
				}else{
					$('.main').append(
					'<div class="course"><div class="courseName"><b>'+course.name
					+'</b><br />'+course.date+'</div>'
					+'<div class="courseDescription">'+course.description+'<input id="'+course.id+'" onclick="registerPresence(this.id)" class="disabledPresenceButton" type="button" value="V"  disabled/>'
					+'</div><div style="clear: both"></div></div>');	
				}		
			});
			changeButtonsStatus(readCookie("id"), readCookie("email"), readCookie("password"));
		}
	});	
}

function registerPresence(courseId){
	let userId = readCookie("id");
	let password = readCookie("password");
	let email = readCookie("email");
	let url = 'http://localhost:8080/student/registerPresence?courseId='+courseId+'&userId='+userId;

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
			document.getElementById(courseId).classList.add('registeredPresensceLabel');
			document.getElementById(courseId).classList.remove('registerPresenceButton');
			document.getElementById(courseId).disabled = true;	
		}
	});
}

function changeButtonsStatus(userId, email, password){
	
	$.ajax({
		url: 'http://localhost:8080/student/checkCoursesStatus/'+userId,
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
			$.each(data, function(index, courseId) {
				document.getElementById(courseId).classList.add('registeredPresensceLabel');
				document.getElementById(courseId).classList.remove('registerPresenceButton');
				document.getElementById(courseId).disabled = true;
			});
		}
	});
}



