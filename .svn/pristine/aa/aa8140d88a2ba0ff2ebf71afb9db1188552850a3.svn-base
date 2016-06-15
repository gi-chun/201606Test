var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MNTQA0M2';
var params = '';
var pn = '';
var aAddr = '';
var BPCA = '';
var pushID = '';
var device_type = '';
var bpInfo = '';

function mainStart(){
	settingLoading();
	$('.imgloading').show();
	
	params = navigation.parameters;
	pn = getAlopexCookie('uPhone');
	var lc = '';
	if(device.osName != 'iOS'){
		lc = JSON.parse(getAlopexSession('loginSession'));
	}else{
		lc = JSON.parse(getAlopexCookie('loginCookie'));
	}
	//console.log(lc);
	BPCA = JSON.parse(getAlopexCookie('MainBPCA'));
	pushID = getAlopexCookie("pushID");
	
	var mbp = getMainBP();
	bpInfo = JSON.parse(getAlopexCookie(mbp));
	
	for(var i=0;i<lc.list.bpCaList.length;i++){
		if(lc.list.bpCaList[i].ca == BPCA.ca){
			aAddr = lc.list.bpCaList[i].addr;
		}
	}
	
	if(device.osName == 'iOS'){
		device_type = 'I';
	}else{
		device_type = 'A';
	}

	doPage();
}

function doPage(){
	$('.topLogoDiv').html(getTitleBp());

	$('.uPhone').html(viewPhoneNM(pn));
	
	$('.addrName').html(aAddr);
	
	$('.uBP').html(bpInfo.bpname);
	
	$('.exitStart').click(function(){
		var paramCommit = {
				"qnaSe" : 'B',
				"lscSe" : BPCA.regiogroup,
				"qestnCn" : '전출 신청',
				"qestnerMbtlnum" : pn,
				"qestnerBp" : BPCA.bp,
				"qestnerCa" : BPCA.ca,
				"qestnerAddr" : aAddr,
				"qestnerAddrDetail" : '',
				"pushId" : pushID,
				"deviceType" : device_type
		};
	
		httpSend("putQnaInfo", paramCommit, function(Mcb){
//			alert('save');
			console.log(Mcb);
			notiPop('전출 신청','전출신청이 접수되었습니다.<br/>담당자 확인 후 알림문자를 보내드립니다.',true,false,{
				list : [{
					type : '',
					id : 'pCancelOK',
					name : '확인'
				}]
			});
			
			$('.pCancelOK').click(function(){
				//alert('11');
				navigateGo('MMNPG0M0');
			});
		}, function(errorCode, errorMessage){
			if (errorCode == "9999") {
				loge('error :: 9999 :: main');
			} else {
				loge('error :: other :: main');
			}
		});
	});
	
	completLoad();
	setDefault();
}


$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});
