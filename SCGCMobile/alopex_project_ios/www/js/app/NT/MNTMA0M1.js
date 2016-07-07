var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MNTMA0M1';
var params = '';
function mainStart(){
	params = navigation.parameters;
	settingLoading();
	$('.imgloading').show();
	
	setEventListner();
	doPage();
}

function setEventListner(){
	 
	 $('.viewListNOTI').click(function(){
		 navigateGo('MNTMA0M0');
	});
};

function doPage(){
	$('.topLogoDiv').html(getTitleBpPush());

	var param = {
		"seq" : params.noti_no
	};

	httpSend("getNtBdDetail", param, function(Mcb){	
		$('.noti_title').html(Mcb.sj);
		$('.noti_dt').html(Mcb.rgs_de);
		$('.noti_cont').html(addImgSrc(Mcb.cn));
		completLoad();
		setDefault();
	}, function(errorCode, errorMessage){
		completLoad();
		setDefault();
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
	//setDefault();
}

function addImgSrc(sc){
	sc = replaceAll(sc,'\\/upload\\/','http://www.skens.com/upload/');
	return sc;
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});
