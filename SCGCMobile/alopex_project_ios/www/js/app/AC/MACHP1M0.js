/***
 * date : 2015-05-15
 * pg : jys
 * note : 
 */
document.addEventListener('alopexready', mainStart);


var ss = '';

var view_privacy_pop = null;
var view_use_pop = null;

var agree_both_pop = null;
var agree_privacy_pop = null;
var agree_use_pop = null;

var cb2_login = null;

function mainStart(){
	setDefault();
	setEventListner();
	if(isTest){
		// 테스트
		$('#uPhones').attr('readonly',false);
	}else{
		// 운영
		popPhone();
	}
	
	var rec = getAlopexCookie('recomendrCookie');
	if(rec != 'undefined'){
		$('#recomendr').val(rec);
	}
}

function popPhone(){
	var pn = getAlopexCookie('uPhone');
	$('#uPhones').val(viewPhoneNMJoin(pn));
}

function setEventListner(){
	// 개인정보동의 팝업
	$('#view_privacy').click(function(){
		view_privacy_pop = $('.view_privacy').bPopup({
			opacity: 0.6,
			speed: 300,
		});
	});
	// 개인정보 동의
	$('#okPrivacy').click(function(){
		view_privacy_pop.close();
		$('#agree_privacy').setChecked(true);
	});
	// 이용약관 팝업
	$('#btn_terms_popup').click(function(){
		view_use_pop = $('.view_use_terms').bPopup({
			opacity: 0.6,
			speed: 300, 
		});
	});
	// 제3자 제공 동의 팝업
	$('#btn_provide_info_popup').click(function(){
		view_use_pop = $('.view_use_provide_info').bPopup({
			opacity: 0.6,
			speed: 300, 
		});
	});
	// 제3자 제공 동의 영역, 동의 클릭할 경우 거부 클릭 해제
	$('#refuse_provide_info').click(function() {
        if ($(this).is(':checked')) {
            $('#agree_provide_info').setChecked(false);
        }
    });
	// 제3자 제공 동의 영역, 거부 클릭할 경우 동의 클릭 해제
	$('#agree_provide_info').click(function() {
        if ($(this).is(':checked')) {
            $('#refuse_provide_info').setChecked(false);
        }
    });
	// 이용약관 동의
	$('#okUse').click(function(){
		view_use_pop.close();
		$('#agree_use').setChecked(true);
	});
	// 가입버튼
	$('#agree_both').click(function(){
//		var isPrivacy = $('#agree_privacy').getValues();
		var isAgreeTerms = $('#agree_terms').getValues();
		var isAgreeProvideInfo = $('#agree_provide_info').getValues();
		var isRefuseProvideInfo = $('#refuse_provide_info').getValues();
		
		if(isAgreeTerms == ""){	// 이용약관 동의 안한 경우
			agree_use_pop = $('.agree_use').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
		}else if(isAgreeProvideInfo == "" && isRefuseProvideInfo == ""){ //제3자 정보제공 선택하지 않은 경우
			agree_use_pop = $('.agree_provide_info').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
		}else{
			if(isTest){
				var pnChk = getAlopexCookie('uPhone');
				if(pnChk == 'undefined'){
					var pn = codePhoneNM($('#uPhones').val());
					setAlopexCookie('uPhone',pn);
					navigateGo('index');
				}else{
					chkUSER();
				}
				
				//navigation.goHome();
				
			}else{
				chkUSER();
			}
			
		}
	});
	// 완료 - 개인정보 누락 - 확인
	$('#apAgree').click(function(){
		$('#agree_privacy').setChecked(true);
		agree_privacy_pop.close();
	});
	// 완료 - 개인정보 누락 - 닫기
	$('#apClose').click(function(){
		agree_privacy_pop.close();
	});
	// 완료 - 이용약관 누락 - 확인
	$('#auAgree').click(function(){
		$('#agree_terms').setChecked(true);
		agree_use_pop.close();
	});
	// 완료 - 이용약관 누락 - 닫기
	$('#auClose').click(function(){
		agree_use_pop.close();
	});
	// 완료 - 제3자 제공 누락 - 닫기
	$('#apiClose').click(function(){
		agree_use_pop.close();
	});
	// 완료 - 개인정보/이용약관 누락 - 확인
	$('#abAgree').click(function(){
		$('#agree_privacy').setChecked(true);
		$('#agree_use').setChecked(true);
		agree_both_pop.close();
	});
	// 완료 - 개인정보/이용약관 누락 - 닫기
	$('#abClose').click(function(){
		agree_both_pop.close();
	});
	
	$('#disagree_both').click(function(){
		//$a.navigate('MN/MMNPG1M0');
	});
	
	$('#fail_both').click(function(){
		$a.navigate('AC/MACHP2M0');
	});
};

function chkUSER(){
//	if(isTest){
//		// 테스트
//		var pn = codePhoneNM($('#uPhones').val());
//		if(pn == ''){
//			alert('번호를 입력하세요.');
//		}else{
//			setAlopexCookie('uPhone',pn);
//			getChkUser(pn);
//		}
//	}else{
		// 운영
		//putRecomendr
		var pn = getAlopexCookie('uPhone');
//		var param = {
//			"phoneNum" : pn, "recomendr" : $('.recomendr').val()
//		};
//		httpSend("putRecomendr", param, function(cb){
//			console.log(cb);
//		}, function(errorCode, errorMessage){
//			if (errorCode == "9999") {
//				loge('error :: 9999 :: main');
//			} else {
//				loge('error :: other :: main');
//			}
//		});
		setAlopexSession('recomendr',$('.recomendr').val());
		setAlopexCookie('recomendrCookie',$('.recomendr').val());
		setAlopexSession('agreeProvideInfoYn',$('#agree_provide_info').is(':checked') ? "Y" : "N");
		setAlopexCookie('agreeProvideInfoYnCookie',$('#agree_provide_info').is(':checked') ? "Y" : "N");
		getCh,kUser(pn);
//	}
}

function getChkUser(pn){
	var param = {
		"phoneNum" : pn, "gubun" : "20"
	};
	showProgressBarMsg('고객 정보를 조회 중입니다.');
	httpSend("getAccInfo", param, httpSuccessCallback, httpErrorCallback);
}

function httpSuccessCallback(cb){
	logf(JSON.stringify(cb));
	logf(cb);
	setAlopexSession('uInfo',cb);
	setAlopexCookie('uInfoCookie',cb);

	var listDPLost = getDPCount(cb,'N');	// 대표번호 미존재
	logf("countDPLost::"+listDPLost);
	logf("countDPLost::"+listDPLost.length);
	var listDPCurrent = getDPCount(cb,'O');	// 대표번호 일치
	logf("countDPLost::"+listDPCurrent);
	logf("countDPCurrent::"+listDPCurrent.length);
	if(listDPLost.length > 0){
		logf('S :: 인증완료 :: 등록하자! ');
		// 검증
		// 2건이상
		navigateGo('MACHP1S0',cb);
		// 1건
//		setUsrCommit(listDPLost);
	}else if(listDPCurrent.length > 0){
		logf('S :: 인증완료 :: 로그인! ');
//		navigateGo('MMNPG0M0',listDPCurrent);
		navigateGo('index');
	}else{
		//console.log('F :: 인증실패 :: 인증하자!1 ');
		logf(cb.list.bpCaList);
		//console.log('F :: 인증실패 :: 인증하자! 2');
		//console.log('S :: 번호 다름');
		navigateGo('MACHP2M0',cb);
	}
}

function getDPCount(cb,type){
	logf('test111'+type,cb);
	var countDP = 0;
	var listDP = [];
	if(type=='N'){
		for(var i=0;i<cb.list.bpCaList.length;i++){
			logf('test222 :: '+cb.list.bpCaList[i].retMsg);
			if(cb.list.bpCaList[i].retMsg.indexOf('대표번호 미존재') > -1){
				listDP[countDP] = cb.list.bpCaList[i];
				countDP = countDP+1;
			}
		}
		return listDP;
	}else{
		for(var i=0;i<cb.list.bpCaList.length;i++){
			if(cb.list.bpCaList[i].retMsg.indexOf('대표번호 일치') > -1){
				listDP[countDP] = cb.list.bpCaList[i];
				countDP = countDP+1;
			}
		}
		return listDP;
	}
}

function httpErrorCallback(errorCode, errorMessage) {
	if (errorCode == "9999") {
		loge('error :: 9999');
	} else {
		loge('error :: other');
	}

}

function setUsrCommit(cb){
	showProgressBarMsg('정보를 처리중입니다.');
	logf('11111');
	logf(cb);
	var pn = getAlopexCookie('uPhone');
	var param = { "list" : [{ "bpCaReqList": []}] };
	var s = 0;
	for(var i=0;i<cb.length;i++){
		if(cb[0].retMsg.indexOf('대표번호 미존재')>-1){
			param.list[0].bpCaReqList[s] = {
				"bp" : cb[i].bp,
				"ca" : cb[i].ca,
	    		"phoneNum" : pn, 
	    		"gubun" : "30"
			};
			s++;
		}
		//console.log(cb[i]);
	}
	logf(param);
//	
	httpSend("putAccInfo", param, function(cb2){
		
		logf("httpSend putAccInfo cb2 : "+cb2);
		
		// 인증
		if(cb2.list.bpCaList[0].retCd == 'S'){
			navigateGo('MACHP1M1',cb2);
		}else{
			loge('error');
			loge(cb2);
			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
		}
		
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: hsUsrCommit');
			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
		} else {
			loge('error :: other :: hsUsrCommit');
			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
		}
	});
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});