$(function(){
	compatibleBody(winWidthAndHight());
	$(window).resize(function(){
		compatibleBody(winWidthAndHight());
	})
	function winWidthAndHight(){
		return {w:$(window).width(),h:$(window).height()};
	}
	function compatibleBody(o){
		var w=o.w;
		var h=o.h;
		if(w<=1366){
			$('.report-form-header,.focus-ul,.report-form-body table').addClass('table1366');
			$('.re-container').addClass('table1366 re-container1366');
		}else{
			$('.report-form-header,.focus-ul,.report-form-body table').removeClass('table1366');
			$('.re-container').removeClass('table1366');
		}
		
		if(w<1500){
			$('.nav').css('width','1500px');
		}else{
			$('.nav').css('width','100%');
		}
		
		
		if(h<150){
			$('.re-container').addClass('re-container40 re-container1366');
		}else{
			$('.re-container').removeClass('re-container40');
		}
		
		if(h>149&&h<499){
			$('.re-container').addClass('re-container499 re-container1366');
		}else{
			$('.re-container').removeClass('re-container499');
		}
		
		if(h>500){
			$('.re-container').addClass('re-container500 re-container1366');
		}else{
			$('.re-container').removeClass('re-container500');
		}
		
	}
	
})