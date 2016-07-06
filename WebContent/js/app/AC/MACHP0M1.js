document.addEventListener('alopexready', init);

var testPn = '';
var testPwd = '';

function init(){
	setDefault();
	setEventListner();
	testPn = getAlopexCookie('testPnCookie');
	testPwd = getAlopexCookie('testPwdCookie');
//	testPn = getAlopexSession('testPn');
//	testPwd = getAlopexSession('testPwd');
	if(testPn == 'undefined'){
		loge('testpn error');
	}else if(testPwd == 'undefined'){
		loge('testpwd error');
	}else{
		// 성공
		$('#hp').val(testPn);
		if(isTest){
			$('#code').val(testPwd);
		}
	}
}

function setEventListner(){
	// 확인
	$('#pop_certify_ok').click(function(){
		var testCode = $('#code').val();
		
		logf('gclee sms test force pass #0');
		
		//gclee sms 
		if(testCode.length < 6){
			
			notiPop('인증코드 오류','인증코드가 올바르지 않습니다.',true,false,null);
			
		}else if(testCode != testPwd){
			//gclee sms test를 위해 임시비밀번호 입력시 패스
			
			logf('gclee sms test force pass #1');
			
			if(testCode == '201607'){
				
				logf('gclee sms test force pass #2');
				
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
				notiPop('인증코드 오류','입력하신 인증코드가 맞지 않습니다.',true,false,null);
			}
			
		}else{
//			alert('ok');
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
		}
		//gclee sms end
		
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