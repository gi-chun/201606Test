document.addEventListener('alopexready', mainStart);
nowPGCode = 'MMNPG1M0';
var params = '';
var pn = '';
var pushID = '';
var device_type = '';
var intVar = ''; 
var chkCount = 0;

//var ss = '';
function mainStart(){
	setDefault();
	setEventListner();
	pn = getAlopexCookie('uPhone');
	pushID = getAlopexCookie("pushID");
	if(device.osName == 'iOS'){
		device_type = 'I';
	}else{
		device_type = 'A';
	}
	
	chkNoUser();
	intVar = setInterval("chkNoUser()",60000);
}

function chkNoUser(){
	chkCount = chkCount+1;
	if(chkCount > 2){
		clearInterval(intVar);
		console.log('exit');
	}
	
	//gclee login
	var param = {
		"phoneNum" : pn, "gubun" : "20"
	};
	console.log('gclee MMNPG1M0 ' + param);
	
	httpSend("getAccInfo", param, function(Mcb){
		console.log(Mcb);
		// 계량기 여러대
		// 일치   		
//		ss = Mcb;
		var cfl = chkFLength(Mcb);
		if(cfl < Mcb.list.bpCaList.length){
			console.log('sss-1');
				notiPop('알림','가입처리가 완료 되었습니다.<br/>로그인을 시도합니다.',true,false,null);
				$('.pNotiP2Ok').click(function(){
					navigateGo('index');
				});
				clearInterval(intVar);
		}else if(chkOkResult(Mcb)){
			console.log('sss-2');
			notiPop('알림','사전가입처리가 완료 되었습니다.<br/>인증화면으로 이동합니다.',true,false,null);
				$('.pNotiP2Ok').click(function(){
					navigateGo('MACHP1M0');
				});
				clearInterval(intVar);
		}else{
			console.log('eee');
//			notiPop('알림','현재 도시가스 고객이 아닌 상태입니다.<br>(만약, 신규 전입자인 경우)<br> 도시가스 고객등록이 진행중이므로<br/>잠시 후  다시 시도 해주시기 바랍니다.<br/>(고객등록은 약 10분이내 반영됨)',true,false,null);
			var paramNon = {
				"mobile" : pn, 
				"push_id" : pushID,
				"device_type" : device_type
			};
			httpSend("putNmbrInfo", paramNon, function(Mcb){
				console.log('비회원 정보 서버 저장 완료!');
				var recomendr = '';
				if(device.osName != 'iOS'){
					recomendr = getAlopexSession('recomendr');
				}else{
					recomendr = getAlopexCookie('recomendrCookie');
				}
    			var param = {
	    			"phoneNum" : pn, "recomendr" : recomendr
	    								//recomendr
	    		};
	    		httpSend("putRecomendr", param, function(cb3){
//	    			console.log(cb);
	    			console.log(cb3);
//	    			navigateGo('MACHP1M1',cb2);
	    		}, function(errorCode, errorMessage){
	    			if (errorCode == "9999") {
	    				loge('error :: 9999 :: main');
	    			} else {
	    				loge('error :: other :: main');
	    			}
	    		});
			}, function(errorCode, errorMessage){
				if (errorCode == "9999") {
					loge('error :: 9999 :: main');
				} else {
					loge('error :: other :: main');
				}
			});
			// 오류
			//savePushId('Main');
		}
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
}

function setEventListner(){
	// 전화 가입	 - end
	$('.noMemCallJoin').click(function(){
		navigateBackToNaviGo('MMNPG1S1');
	});
	// 게시판 가입
	$('.noMemBoardJoin').click(function(){
		navigateBackToNaviGo('MMNPG1S2');
//		notiPop('알림','해당 기능이 준비중입니다.',true,false,null);
	});
	// 전화번호 인증
	$('#noMemPhone').click(function(){
		//navigateBackToNaviGo('MBLMG0M0');
		//전화번호 가입 테스트
		
		//gclee login
		var param = {
    		"phoneNum" : pn, "gubun" : "20"
    	};
		logf('gclee MMNPG1M0 ' + param);
		
    	httpSend("getAccInfo", param, function(Mcb){
    		console.log(Mcb);
    		// 계량기 여러대
    		// 일치   		
//    		ss = Mcb;
    		var cfl = chkFLength(Mcb);
    		if(cfl < Mcb.list.bpCaList.length){
    			console.log('sss-1');
   				notiPop('알림','가입처리가 완료 되었습니다.<br/>로그인을 시도합니다.',true,false,null);
   				$('.pNotiP2Ok').click(function(){
   					navigateGo('index');
   				});
    		}else if(chkOkResult(Mcb)){
    			console.log('sss-2');
    			notiPop('알림','사전가입처리가 완료 되었습니다.<br/>인증화면으로 이동합니다.',true,false,null);
   				$('.pNotiP2Ok').click(function(){
   					navigateGo('MACHP1M0');
   				});
			}else{
				console.log('eee');
				notiPop('알림','현재 도시가스 고객이 아닌 상태입니다.<br>(만약, 신규 전입자인 경우)<br> 도시가스 고객등록이 진행중이므로<br/>잠시 후  다시 시도 해주시기 바랍니다.<br/>(고객등록은 약 10분이내 반영됨)',true,false,null);
				// 오류
				//savePushId('Main');
    		}
    	}, function(errorCode, errorMessage){
			if (errorCode == "9999") {
    			loge('error :: 9999 :: main');
    		} else {
    			loge('error :: other :: main');
    		}
		});
	});
	// 납입자번호 인증
	$('#noMemBpca').click(function(){
		setAlopexSession('bePGID',nowPGCode);
		navigateBackToNaviGo('MACHP2M3');
	});
	// 바코드 인증
	$('#noMemBarcode').click(function(){
		setAlopexSession('bePGID',nowPGCode);
		navigateBackToNaviGo('MACHP2M2');
	});
	// 이용가이드 - end
	$('.noMemGuide').click(function(){
		navigateBackToNaviGo('MNTGD0M2');
	});
	// 도시가스 소개	- end
	$('.noMemBP').click(function(){
		navigateBackToNaviGo('MMNPG1S3');
	});
	// 청구서
	$('#noMemBill').click(function(){
		notiPop('미인증 고객','인증이 완료된 이후 사용이 가능하십니다.',true,false,null);
	});
	// 자가검침
	$('#noMemSelf').click(function(){
		notiPop('미인증 고객','인증이 완료된 이후 사용이 가능하십니다.',true,false,null);
	});
};

function chkFLength(cb){
	var chkNo = 0;
	for(var i=0;i<cb.list.bpCaList.length;i++){
		if(cb.list.bpCaList[i].retCd == 'F'){
			chkNo++;
		};
	}
	return chkNo;
}

function chkOkResult(cb){
	//var chkNo = 0;
	try{
		var resultS = false;
		for(var i=0;i<cb.list.bpCaList.length;i++){
			if(cb.list.bpCaList[i].retMsg.indexOf('대표번호 미존재') > -1){
				resultS = true;
				return resultS;
			};
		}
		return resultS;
	}catch(e){
		return false;
	}
}

$a.page(function(){
	this.init = function(id,param){
		logf('page on');
    };
});