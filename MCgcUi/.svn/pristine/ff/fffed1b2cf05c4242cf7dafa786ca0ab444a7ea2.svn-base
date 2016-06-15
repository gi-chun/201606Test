document.addEventListener('alopexready', mainStart);

var params = '';
var pn = '';
var pushID = '';
var device_type = '';

function mainStart(){
	params = navigation.parameters;
	pn = getAlopexCookie('uPhone');
	pushID = getAlopexCookie("pushID");
	
	if(device.osName == 'iOS'){
		device_type = 'I';
	}else{
		device_type = 'A';
	}
	
	console.log(params);
	settingLoading();
	$('.imgloading').show();
	
	$('.cgcName').html(params.bpname);
	$('.uPhone').html(viewPhoneNM(pn));
	var addrT = params.city + " " + params.sigungu + " ";
	//if(params.dong != "전역") addrT += params.dong;
	$('.addrName').html(addrT);
	
	$('.joinStart').click(function(){
		if($('[name=uAddr]').val().length < 1){
			notiPop('알림','상세주소를 입력해 주세요.',true,false,null);
		}else{
			var paramCommit = {
					"qnaSe" : "A",
					"lscSe" : params.lsc,
					"qestnCn" : "APP 가입 신청",
					"qestnerMbtlnum" : pn,
					"qestnerBp" : "",
					"qestnerCa" : "",
					"qestnerAddr" : params.city + " " + params.sigungu + " ",
					"qestnerAddrDetail" : $('.addrName').html(),
					"pushId" : pushID,
					"deviceType" : device_type
			};
//			putQnaInfo
			httpSend("putQnaInfo", paramCommit, function(Mcb){
//				alert('save');
				console.log(Mcb);
				notiPop('가입신청 완료','가입신청이 접수되었습니다.<br/>가입 완료 시 휴대폰 알림문자를 보내드립니다.',true,false,{
					list : [{
						type : '',
						id : 'pCancelOK',
						name : '확인'
					}]
				});
				
				$('.pCancelOK').click(function(){
					//alert('11');
					navigateGo('MMNPG1M0');
				});
			}, function(errorCode, errorMessage){
				if (errorCode == "9999") {
					loge('error :: 9999 :: main');
				} else {
					loge('error :: other :: main');
				}
			});
			
			
			
			
		}
	});
	
	
	completLoad();
	setDefault();
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };    
});