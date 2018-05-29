$(document).ready(function() {
	
	let password = readCookie("password");
	let email = readCookie("email");
	
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
				
				if(courseDateInMills>=todayDateInMillis){
					$('.main').append(
					'<div class="course"><div class="courseName"><b>'+course.name
					+'</b><br />'+course.date+'</div>'
					+'<div class="courseDescription">'+course.description+'<input id="'+course.id+'" onclick="deleteCourse(this.id)" class="registerPresenceButton" type="button" value="X"/>'
					+'</div><div style="clear: both"></div></div>');
				}else{
					$('.main').append(
					'<div class="course"><div class="courseName"><b>'+course.name
					+'</b><br />'+course.date+'</div>'
					+'<div class="courseDescription">'+course.description+'<input id="'+course.id+'" onclick="deleteCourse(this.id)" class="disabledPresenceButton" type="button" value="X"  disabled/>'
					+'</div><div style="clear: both"></div></div>');	
				}		
			});
		}
	});
});

function deleteCourse(courseId){
	let password = readCookie("password");
	let email = readCookie("email");
	let url = 'http://localhost:8080/api/course/'+courseId;

	$.ajax({
		url: url,
		type: 'DELETE',
		crossDomain: true,
		beforeSend: function ( xhr ) {
			xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( email+':'+password) );
		},
		error: function(){
			console.log("error");
		},
		success: function(txtStatus, xhr ) {
			location.reload();
		}
	});
}