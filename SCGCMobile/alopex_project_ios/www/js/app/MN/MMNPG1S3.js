document.addEventListener('alopexready', mainStart);

function mainStart(){
	setDefault();
	setEventListner();
}

function setEventListner(){
	$('.box1Call').click(function(event){
		//ss = event;
		console.log('11');
		logf(event.currentTarget.children[0].value);
		var chkMain = event.currentTarget.children[0].value;
		console.log(chkMain);
		if(chkMain == '서울특별시'){
			application.startWebBrowser("http://www.skens.com/m/kr/koone/main/index.do");
		}else if(chkMain == '부산광역시'){
			application.startWebBrowser("http://www.skens.com/m/kr/busan/main/index.do");
		}else if(chkMain == '충청도'){
			application.startWebBrowser("http://www.skens.com/m/kr/cheongju/main/index.do");
		}else if(chkMain == '구미'){
			application.startWebBrowser("http://www.skens.com/m/kr/gumi/main/index.do");
		}else if(chkMain == '포항'){
			application.startWebBrowser("http://www.skens.com/m/kr/pohang/main/index.do");
		}else if(chkMain == '전라남도'){
			application.startWebBrowser("http://www.skens.com/m/kr/jeonnam/main/index.do");
		}else if(chkMain == '강원도'){
			application.startWebBrowser("http://www.skens.com/m/kr/gangwon/main/index.do");
		}else if(chkMain == '전라북도'){
			application.startWebBrowser("http://www.skens.com/m/kr/jeonbuk/main/index.do");
		}else{
			//
		}
	});
};

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});