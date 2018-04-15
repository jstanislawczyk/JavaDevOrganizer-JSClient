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
			$.each(data, function(index, course) {
				$('.main').append(
					'<div class="course"><div class="courseName"><b>'+course.name
					+'</b><br />'+course.date+'</div>'
					+'<div class="courseDescription">'+course.description+'</div><div style="clear: both"></div></div>');
			});
		}
	});	
}