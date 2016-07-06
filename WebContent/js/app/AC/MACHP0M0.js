document.addEventListener('alopexready', init);

function init(){
	setDefault();
    	setEventListner();
}

var pcrID = '';
var sss = '';
$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});

function setEventListner(){
	$('#pop_certify_re').click(function(){
		if($('#pn').val() == ""){
			notiPop('확인','휴대폰번호가 입력되지 않았습니다.',true,false,null);
		}else if($('#pn').val().length < 10){
			notiPop('확인','휴대폰번호가 올바르지 않습니다.',true,false,null);
		}else if($('#pn').val().indexOf('01') != 0){
			notiPop('확인','휴대폰번호가 올바르지 않습니다.',true,false,null);
		}else{
			notiPop('인증코드 발송','다음의 휴대폰 번호로 전송하시겠습니까?<br />[<font color="blue">'+$('#pn').val()+'</font>]',false,false,{
				list : [{
					type : 2,
					id : 'pPhoneSendOK',
					name : '인증코드 전송'
				},{
					type : '',
					id : 'pPhoneSendNO',
					name : '전송 취소'
				}]
			});
			$('.pPhoneSendNO').click(function(){
	    		//공용
	    		notiPopID.close();
	    	});
			$('.pPhoneSendOK').click(function(){
				notiPopID.close();
				
				//gclee sms 서버에서 생성
				/*
    			// 난수 발생 세션 저장
    			var testNum = String(Math.floor(Math.random() * 999999) +1);
    			for(var j=0;j<6-testNum.length;j++){
    				testNum = '0'+testNum;
    			}
//    			setAlopexSession('testPwd',testNum);
    			setAlopexCookie('testPwdCookie',testNum);
    			*/
    			//gclee sms end
    			
    			
    			// test 번호저장
//    			setAlopexSession('testPn',$('#pn').val());
    			setAlopexCookie('testPnCookie',$('#pn').val());
    			
    			// sms 전송
    			//sendAccSms
    			var testNum = '01000001111';
    			
    			var param = {
		    		"phoneNum" : $('#pn').val(),
		    		"message" : "[도시가스앱] 인증번호["+testNum+"]을 입력 해 주세요.",
		    		"lsctn" : $('input[name=lsctnRadio]:checked').val()
		    	};
				logf(param);
				if(isTest){
					notiPop('인증코드 발송 TEST','고객님의 휴대폰 문자로 <br />인증코드가 발송되었습니다.(TEST 전송X)',false,false,null);
		    		$('.pNotiP2Ok').click(function(){
        	    		navigateGo('MACHP0M1');
        	    	});
				}else{
					//gclee sms
					httpSend("getAccCodeSms", param, function(Mcb){
						
						logf("Mcb:certiNo: " + Mcb.certiNo);
						setAlopexCookie('testPwdCookie', Mcb.certiNo);
			    		
			    		notiPop('인증코드 발송','고객님의 휴대폰 문자로 <br />인증코드가 발송되었습니다.',false,false,null);
			    		$('.pNotiP2Ok').click(function(){
	        	    		navigateGo('MACHP0M1');
	        	    	});
			    	}, function(errorCode, errorMessage){
			    		notiPop('확인','전송 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',true,false,null);
						if (errorCode == "9999") {
			    			loge('error :: 9999 :: main');
			    		} else {
			    			loge('error :: other :: main');
			    		}
					});  
					
				}
		    	     			
	    	});
		}
	});
};