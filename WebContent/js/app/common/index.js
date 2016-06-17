// 공지사항
$(function(){	
	$('.notice').easyTicker({
		visible: 1,
		interval: 4000
	});

// 배너롤링
	var swiper = new Swiper('.swiper-container', {
		//pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next', 
		prevButton: '.swiper-button-prev',
		slidesPerView: 3,
		paginationClickable: true,
		spaceBetween: 0
	});

// 자가검침 높이
//	var obj1=document.getElementById('cont1_left');
//	var obj2=document.getElementById('cont1_right');
//	
//	var obj1_height=obj1.offsetHeight;
//	var obj2_height=obj2.offsetHeight;
//
//	if(obj1_height > obj2_height){
//		obj2.style.height=obj1_height+'px';
//	} else {obj1.style.height=obj2_height-3+'px'}


});