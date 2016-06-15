var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MNTGD0M1';
var params = '';
function mainStart(){
	
	setEventListner();
	
	settingLoading();
	$('.imgloading').show();
	
	// 임의로 0.5로 딜레이
	setTimeout(function(){
		$('#container').show();
		var swiper = new Swiper('.swiper-container', {
			nextButton: '.swiper-button-next', 
			prevButton: '.swiper-button-prev',
			slidesPerView: 4,
			paginationClickable: true,
			spaceBetween: 0
		});
		completLoad();
		setDefault();
		
		clearTab(1);
		$('.swipe1').children().children().attr('src','../../images/tab_app1_on.png');
		$('#tab1').show();
	},10);
}

function setEventListner(){
	 
	 $('.viewList').click(function(){
		navigateBackToNaviGo('MNTMA0M0');
	});
};

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    	
    	
    };
    
    
});
