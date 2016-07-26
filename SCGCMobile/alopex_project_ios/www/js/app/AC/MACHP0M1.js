document.addEventListener('alopexready', init);

var testPn = '';
var testPwd = '';
//gclee login token
var checkTimerCount = 180; //3분 180초
var refreshIntervalId;

function init(){
	setDefault();
	setEventListner();
	setUpdateViewTimeOut();
	
	testPn = getAlopexCookie('testPnCookie');
	testPwd = getAlopexCookie('testPwdCookie');
//	testPn = getAlopexSession('testPn');
//	testPwd = getAlopexSession('testPwd');
	if(testPn == 'undefined'){
		loge('testpn error');
	}else if(testPwd == 'undefined'){
		//loge('testpwd error');
		// gclee login
		// 성공
		$('#hp').val(testPn);
	}else{
		// 성공
		$('#hp').val(testPn);
		//gclee login - test 릴리즈시 주석처리요망
		$('#code').val(testPwd);
		
		if(isTest){
			$('#code').val(testPwd);
		}
	}
}

//gclee login token
function setUpdateViewTimeOut(){
	refreshIntervalId = setInterval("reDrawTimeCount()", 1000); // 매 1000ms(1초)가 지날 때마다 ozit_timer_test() 함수를 실행합니다.
}

function reDrawTimeCount(){
	
	checkTimerCount -= 1;
	
	if(checkTimerCount == 0){
		
		clearInterval(refreshIntervalId);
		
		checkTimerCount = 180; //180
		$('#timeOutDesc').text("인증코드 타임아웃 " + checkTimerCount + "초");
		
		notiPop('인증코드 인증시간 초과', '인증코드 신청을 다시해 주세요.',false, false, {
		list : [ {
			type : 2,
			id : 'pViewTimerOk',
			name : '인증코드 재 요청'
			} ]
		});

		$('.pViewTimerOk').click(function() {
			notiPopID.close();
			navigateGo('MACHP0M0');
		});
		
	}else{
		$('#timeOutDesc').text("인증코드 타임아웃 " + checkTimerCount + "초");
	}
}

function setEventListner(){
	// 확인
	$('#pop_certify_ok').click(function(){
		var testCode = $('#code').val();
		
		logf('gclee sms test force pass #0');
		
		//gclee login token
		//이명환대리님 전화번호 바로 인증성공 - iOS review를 위해
//		if(testPn == '01024183828' && testCode == '201607'){
//			notiPop('인증코드 확인','정확한 인증코드가 입력되었습니다.',false,false,{
//				list : [{
//					name : '회원가입 계속',
//					id : 'pJoinCont',
//					type : ''
//				}]
//			});
//			// local 저장소 저장, 가입 페이지 이어 하기
//			$('.pJoinCont').click(function(){
//				setAlopexCookie('uPhone',codePhoneNM(testPn));
//	    		navigateGo('index');
//	    	});
//			return;
//		}
//		//test 번호 차후 배포시 주석처리 해야함
//		if(testPn == '01028394001' && testCode == '201607'){
//			notiPop('인증코드 확인','정확한 인증코드가 입력되었습니다.',false,false,{
//				list : [{
//					name : '회원가입 계속',
//					id : 'pJoinCont',
//					type : ''
//				}]
//			});
//			// local 저장소 저장, 가입 페이지 이어 하기
//			$('.pJoinCont').click(function(){
//				setAlopexCookie('uPhone',codePhoneNM(testPn));
//	    		navigateGo('index');
//	    	});
//			return;
//		}
		//////////////////////////////////////////////////////////////////////////////////////////
		
		//gclee sms 
		if(testCode.length < 6){
			
			notiPop('인증코드 오류','인증코드가 올바르지 않습니다.',true,false,null);
			return;
			
		}
		
		//gclee login token 성공했다 가정 패스 - 서버작업 완료후 처리 
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//gclee login token
		var param = {
    		"phoneNum" : testPn,
    		"code" : testCode
    	};
	
//		response:
//			"isSuccess": "true",
//			"token":"122388sdfsdfjlkdjflkj"
		
		logf('gclee MACHP0M1 ' + JSON.stringify(param));
				
		httpSend("getCheckAccCodeSms", param, function(Mcb){
			
			logf("Mcb:isSuccess: " + Mcb.isSuccess);
			logf("Mcb:loginToken: " + Mcb.token);
			
			if(Mcb.isSuccess == 'true'){
				
				setAlopexCookie('loginToken', Mcb.token);
				
				notiPop('인증코드 확인','정확한 인증코드가 입력되었습니다.',false,false,{
				list : [{
					name : '회원가입 계속',
					id : 'pJoinCont',
					type : ''
				}]
				});
				// local 저장소 저장, 가입 페이지 이어 하기
				$('.pJoinCont').click(function(){
					setAlopexCookie('uPhone',codePhoneNM(testPn));
		    		navigateGo('index');
		    	});
				
			}else{
				//실패시
				notiPop('인증코드 오류','입력하신 인증코드가 맞지 않습니다.',true,false,null);
			}
    		
    	}, function(errorCode, errorMessage){
    		notiPop('확인','전송 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',true,false,null);
			if (errorCode == "9999") {
    			loge('error :: 9999 :: main');
    		} else {
    			loge('error :: other :: main');
    		}
		});
		
		//gclee login token 성공했다 가정 패스 - 서버작업 완료후 처리 
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		//gclee login token 임시 
//		notiPop('인증코드 확인','정확한 인증코드가 입력되었습니다.',false,false,{
//			list : [{
//				name : '회원가입 계속',
//				id : 'pJoinCont',
//				type : ''
//			}]
//			});
//			// local 저장소 저장, 가입 페이지 이어 하기
//			$('.pJoinCont').click(function(){
//				setAlopexCookie('uPhone',codePhoneNM(testPn));
//	    		navigateGo('index');
//	    	});
			
       //gclee login token 임시 			
		
	});
	
	// 재전송
	$('#pop_certify_re').click(function(){
		notiPop('전화번호 인증','인증번호 재요청을 위해<br/> 휴대폰번호 입력 화면으로 돌아하시겠습니까?',false,false,{
			list : [{
				type : '',
				id : 'pPhoneSendOK',
				name : '이전페이지로'
			},{
				type : 2,
				id : 'pPhoneSendNO',
				name : '취소'
			}]
		});
		
		$('.pPhoneSendOK').click(function(){
			notiPopID.close();
			navigateGo('MACHP0M0');
		});
		
		$('.pPhoneSendNO').click(function(){
    		//공용
    		notiPopID.close();
    	});
	});
};

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    	
    	
    };
    
    
});