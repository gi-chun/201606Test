(function($) {
	$a.request.setup({
		platform : 'NEXCORE.J2EE',
		url : function(id, option) {
			return '../../demo/patterns/basic/dummy/' +id + '.json';
		},
		method : 'GET',
		before : function(id, option) {
		},
		after : function(res) {
		},
		fail : function(res) {
			alert('서버오류');
		},
		error : function(err) {
			alert('현재 네트상태를 확인하십시요.');
		}
	});
	$a.setup('grid', {
		rowPadding : 5,
		rowClickSelect : false,
		rowInlineEdit : true
	});
	$a.setup('dateinput', {
		format: 'yyyy-MM-dd'
	});
})(jQuery);


//아코디언메뉴
$(function(){
	$('.Accordion_menu li div').hide();
	$('.Accordion_menu li .tit').click(function(){
		if($(this).next().is(':hidden')){
			$('.Accordion_menu li .tit').removeClass('active').next().slideUp("fast");
			$(this).toggleClass('active').next().slideDown("fast");
		}else{
			$('.Accordion_menu li div').slideUp("");
		}
		return false;
	});
});