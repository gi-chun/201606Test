/***
 * date : 2015-05-15
 * pg : jys
 * note : 
 * 1. 가입완료 처리 남음
 */

document.addEventListener('alopexready', mainStart);


var cgLists = [];
var params = '';
var uPhone = '';
var pop_rep_pop = '';
var beforeSummit = false;

function mainStart(){
	params = navigation.parameters;
//	console.log(JSON.stringify(params));
	uPhone = getAlopexCookie('uPhone');
	//gclee login
	beforeSummit = false;
	
	setBoxList(params);
//	console.log(viewPhoneNM(uPhone));
	setEventListner();
	setDefault();
	
	
}


function setBoxList(cbr){
	cb = cbr.list.bpCaList;
//	console.log(cb);
	$('.uPhone').html(viewPhoneNM(uPhone));
	var caList = '<p class="pb10">모바일 청구서를 신청하시면, 도시가스 앱에서 언제라도 1년간의 청구서를 조회하실 수 있으며,  푸시알림으로 청구서 발행 메시지도 받으실 수 있습니다.</p><p class="join_txt col_red"> 회원가입시 청구서는 도시가스 앱 또는 문자메시지(MMS)로만 확인이 가능합니다.(청구서는 납입자 번호별로 발행)</p>';

	for(var i=0;i<cb.length;i++){
		caList += '<div class="bill">'+
		'<input type="hidden" value="'+Number(cb[i].bp)+','+Number(cb[i].ca)+'"/>'+
		'<p><strong>납입자 번호</strong><span class="bold"><label for="chkc'+i+'" class="af-checkbox-text">'+Number(cb[i].ca)+'</label></span><span class="check"><input class="Checkbox" name="chkc0" value="'+Number(cb[i].ca)+'" checked="checked" id="chkc'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></span></p>'+
		'<p><strong>가입주소</strong><span class="txt">'+cb[i].addr+'&nbsp;</span></p>'+
		'</div>';
		cgLists[i] = {
				'bp' : Number(cb[i].bp),
				'ca' : Number(cb[i].ca),
				'sdType' : 22
		};
	}
	$('.box_CaList').html(caList);
}

function setEventListner(){
	$('#pop_test_1').click(function(){
		$('#bill_n').css('display','none');
		$('#fbp_div').css('display','none');
	});
	
	$('#pop_test_n').click(function(){
		$('#bill_n').css('display','block');
		$('#fbp_div').css('display','block');
	});
		
	$('#pop_rep').click(function(){
		//gclee login 
		
		if(beforeSummit){
		   logf('gclee MACHP1S0 pop_rep already click');
		   return;
		}
		
		if($('[name=chkc0]:checked').length > 0){
			logf('go join');
			logf($('[name=chkc0]:checked').length);
			
			var param = {'list' : 		[{'bpCaReqList' : []	}]  			};
			for(var i=0;i<$('[name=chkc0]:checked').length;i++){
				var s1 = $('[name=chkc0]:checked')[i].parentNode.parentNode.parentNode.children[0].value;
				var s2 = s1.split(',');
				var pn = uPhone;
				param.list[0].bpCaReqList[i] = {
						'bp' : s2[0],
						'ca' : s2[1],
						'phoneNum' : pn,
						'gubun' : '30'
				};
			}

			console.log('gclee putAccInfo MACHP1S0' + param);
			
			$('.imgloading').show();
			$('#pop_rep').hide();
			
			beforeSummit = true;
			
	    	httpSend("putAccInfo", param, function(cb2){
//	    		console.log(cb);
	    		if(cb2.list.bpCaList[0].retCd == 'S'){
	    			var recomendr = '';
	    			if(device.osName != 'iOS'){
	    				recomendr = getAlopexSession('recomendr');
	    			}else{
	    				recomendr = getAlopexCookie('recomendrCookie');
	    			}
	    			var param = {
		    			"phoneNum" : uPhone, "recomendr" : recomendr
		    		};
		    		httpSend("putRecomendr", param, function(cb){
			    		cb2_login = cb2;
			    		contiLogin();
//		    			navigateGo('MACHP1M1',cb2);
		    			
		    		}, function(errorCode, errorMessage){
		    			if (errorCode == "9999") {
		    				loge('error :: 9999 :: main');
		    			} else {
		    				loge('error :: other :: main');
		    			}
		    		});
		    		
	    		}else{
	    			loge('error');
	    			loge(cb2);
	    			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
	    		}
	    	}, function(errorCode, errorMessage){
	    		//gclee login
	    		beforeSummit = false;
	    		
	    		if (errorCode == "9999") {
	    			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
	    			loge('error :: 9999 :: hsUsrCommit');
	    		} else {
	    			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
	    			loge('error :: other :: hsUsrCommit');
	    		}
	    	});
		}else{
			
			//gclee login
    		beforeSummit = false;
    		
    		
			loge('non selected');
			pop_rep_pop = $('.pop_rep').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
		}
	});   	
	
	$('.okpop_rep_pop').click(function(){
		pop_rep_pop.close();
	});
};


function contiLogin(){
	var pn = getAlopexCookie('uPhone');
	logf("contiLogin() pn : "+pn);
			
	if(pn == 'undefined'){
		// 원래는 휴대폰 인증
		alert('죄송합니다.\n공기계 및 해외번호 스마트폰은 사용하실 수 없습니다.\nApp을 종료합니다.');
		alopexController.exit();
		//navigateGo('MACHP1M0');
	}else{
		
		//토큰이 없다면 sms인증 화면으로
		var loginToken = getAlopexCookie('loginToken');
		if(loginToken == 'undefined' || loginToken.length < 1){
//			navigateGo('MACHP0M0');
			loginToken = '';
			return;
		}
		
		//gclee login
		var param = {
    		"phoneNum" : pn, "gubun" : "10", "token" : loginToken
    	};
		logf('gclee getAccInfo MACHP1S0 ' + JSON.stringify(param));
		
    	httpSend("getAccInfo", param, function(Mcb){
    		logf('cb',Mcb);
    		cb = Mcb;
    		
//    		if(cb.isTokenTrue == 'false'){
//    			navigateGo('MACHP0M0');
//    			return;
//    		}
    		
    		// 계량기 여러대
    		// 일치
    		
    		savePushId('Main');
				
    	}, function(errorCode, errorMessage){
    		if(isChkDay()){
    			
    			var now = new Date();
    			
    			var month = now.getMonth()+1;
    			var day = now.getDate();
    			var year = now.getFullYear();
    			
    			if(year == 2016 && month == 1 && day == 28){
    				if(now.getHours() >= 22){	// 9시 이후
    					notiPop('시스템 점검 안내','- 시스템 점검 안내 -<br/>기간 : 1월 28일(목) 22:00 ~ 1월 29일(금) 05:30<br/><font color="gray" size="1pt">*작업에 따라 점검 시간이 연장될 수 있습니다.</font><br/>이용에 불편을 드려 죄송합니다.',true,false,{
        					list : [{
        						type : 2,
        						id : 'pCloseOK',
        						name : '종료'
        					}]
        				});
    				}
    			}else if(year == 2016 && month == 1 && day == 29){
    				if(now.getHours() < 6){	// 6시 이전
    					notiPop('시스템 점검 안내','- 시스템 점검 안내 -<br/>기간 : 1월 28일(목) 22:00 ~ 1월 29일(금) 05:30<br/><font color="gray" size="1pt">*작업에 따라 점검 시간이 연장될 수 있습니다.</font><br/>이용에 불편을 드려 죄송합니다.',true,false,{
        					list : [{
        						type : 2,
        						id : 'pCloseOK',
        						name : '종료'
        					}]
        				});
    				} 
    			}else{
    				notiPop('정기 점검 안내','- 서버 정기점검 안내 -<br/>기간 : 매주 목요일 21:00 ~ 24:00<br/><font color="gray" size="1pt">*작업에 따라 예고없이 연장될 수 있습니다.</font><br/>이용에 불편을 드려 죄송합니다.',true,false,{
    					list : [{
    						type : 2,
    						id : 'pCloseOK',
    						name : '종료'
    					}]
    				});
    			}

				$('.pPhoneSendNO').click(function(){ //공용
		    		
		    		if(device.osName == 'Android'){
		    			alopexController.exit();
		    		}else{
		    			notiPopID.close();
		    		}
		    	});
			}
			if (errorCode == "9999") {
    			loge('error :: 9999 :: main');
    		} else {
    			loge('error :: other :: main');
    		}
		});
	}
}

function runMain(){
	
	logf("runMain() cb2_login : "+cb2_login);
	logf("runMain() cb : "+cb);
	
	var rtCB = clopCB(cb);
	var rtCBPush = clopCBPush(cb);
	logf(rtCBPush);
	console.log(rtCBPush);
	var pn = getAlopexCookie('uPhone');
	var pushID = getAlopexCookie("pushID");
	if(rtCB.list.bpCaList.length > 0){ // 쓸수있는 정보있는지 확인
		var dType = device.osName;
		
		if(device.osName != 'iOS'){
			if(getAlopexSession('agreeProvideInfoYn')!='undefined'){
				rtCBPush.agree_provide_info_yn = getAlopexSession('agreeProvideInfoYn');
			}
		}else{
			if(getAlopexCookie('agreeProvideInfoYnCookie')!='undefined'){
				rtCBPush.agree_provide_info_yn = getAlopexCookie('agreeProvideInfoYnCookie');
			}
		}
		
		//gclee card push id
		var pn = getAlopexCookie('uPhone');
		var option = {
			      "phoneno" : pn
		};
			      
	   if(device.osName != 'iOS'){                                                                
		   jsniCaller.invoke("GcmPushManager.setPushToken", JSON.stringify(option), "popCardResult"); 
	   }else{                                                                                     
		   jsniCaller.invoke("PaymentJSNI.setPushToken", JSON.stringify(option), "popCardResult"); 
	   }
	   //gclee card push id end
	   
		
		if(dType=='Android'){
			//gclee push
			//rtCBPush.push_id = pushID;
			rtCBPush.token_key = getAlopexCookie('loginToken');
			rtCBPush.device_type = 'A';
			httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
				var recomendr = '';
				if(device.osName != 'iOS'){
					recomendr = getAlopexSession('recomendr');
				}else{
					recomendr = getAlopexCookie('recomendrCookie');
				}
				
				if(recomendr == 'undefined'){
//					runMainGo(rtCB);
					navigateGo('MACHP1M1',cb2_login);
				}else{
					var paramRec = {
		    			"phoneNum" : pn, "recomendr" : recomendr
		    		};
		    		httpSend("putRecomendr", paramRec, function(cb3){
		    			console.log(cb3);
//		    			runMainGo(rtCB);
		    			navigateGo('MACHP1M1',cb2_login);
		    		}, function(errorCode, errorMessage){
		    			if (errorCode == "9999") {
		    				loge('error :: 9999 :: main');
		    			} else {
		    				loge('error :: other :: main');
		    			}
//		    			runMainGo(rtCB);
		    			// 오류 처리
		    		});
				}
				
				setSessionKill('agreeProvideInfoYn');
				setCookieKill('agreeProvideInfoYnCookie');
				
			}, function(errorCode, errorMessage){
//				runMainGo(rtCB);
				// 오류 처리
				setSessionKill('agreeProvideInfoYn');
				setCookieKill('agreeProvideInfoYnCookie');
			});
		}else if(dType=='iOS'){
			//gclee push
			//rtCBPush.push_id = pushID;
			rtCBPush.token_key = getAlopexCookie('loginToken');
			rtCBPush.device_type = 'I';
			if(device.osName != 'iOS'){
				rtCBPush.agree_provide_info_yn = getAlopexSession('agreeProvideInfoYn');
			}else{
				rtCBPush.agree_provide_info_yn = getAlopexCookie('agreeProvideInfoYnCookie');
			}
			
			httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
				var recomendr = '';
				if(recomendr == 'undefined'){
//					runMainGo(rtCB);
					navigateGo('MACHP1M1',cb2_login);
				}else{
					var paramRec = {
		    			"phoneNum" : pn, "recomendr" : recomendr
		    		};
		    		httpSend("putRecomendr", paramRec, function(cb3){
		    			console.log(cb3);
//		    			runMainGo(rtCB);
		    			navigateGo('MACHP1M1',cb2_login);
		    		}, function(errorCode, errorMessage){
		    			if (errorCode == "9999") {
		    				loge('error :: 9999 :: main');
		    			} else {
		    				loge('error :: other :: main');
		    			}
//		    			runMainGo(rtCB);
		    			// 오류 처리
		    		});
				}
				
				setSessionKill('agreeProvideInfoYn');
				setCookieKill('agreeProvideInfoYnCookie');
				
			}, function(errorCode, errorMessage){
//				runMainGo(rtCB);
				// 오류 처리
				setSessionKill('agreeProvideInfoYn');
				setCookieKill('agreeProvideInfoYnCookie');
			});
		}else{
			//gclee push
//			rtCBPush.push_id = pushID;
			rtCBPush.device_type = 'A';
			rtCBPush.token_key = getAlopexCookie('loginToken');
			if(device.osName != 'iOS'){
				if(getAlopexSession('agreeProvideInfoYn')!='undefined'){
					rtCBPush.agree_provide_info_yn = getAlopexSession('agreeProvideInfoYn');
				}
			}else{
				if(getAlopexCookie('agreeProvideInfoYnCookie')!='undefined'){
					rtCBPush.agree_provide_info_yn = getAlopexCookie('agreeProvideInfoYnCookie');
				}
			}
			
			httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
				var recomendr = '';
				if(recomendr == 'undefined'){
//					runMainGo(rtCB);
					navigateGo('MACHP1M1',cb2_login);
				}else{
					var paramRec = {
		    			"phoneNum" : pn, "recomendr" : recomendr
		    		};
		    		httpSend("putRecomendr", paramRec, function(cb3){
		    			console.log(cb3);
//		    			runMainGo(rtCB);
		    			navigateGo('MACHP1M1',cb2_login);
		    		}, function(errorCode, errorMessage){
		    			if (errorCode == "9999") {
		    				loge('error :: 9999 :: main');
		    			} else {
		    				loge('error :: other :: main');
		    			}
//		    			runMainGo(rtCB);
		    			// 오류 처리
		    		});
				}
				
				setSessionKill('agreeProvideInfoYn');
				setCookieKill('agreeProvideInfoYnCookie');
				
			}, function(errorCode, errorMessage){
//				runMainGo(rtCB);
				// 오류 처리
				setSessionKill('agreeProvideInfoYn');
				setCookieKill('agreeProvideInfoYnCookie');
			});
		}
	}else{
		console.log(cb);
		//navigateGo('MACHP1M0');
		// 오류 처리
	}
}

function clopCB(cb){
	var rtCB = {'result': "1000", 
				'resultMessage': "OK", 
				'list' : {
					'bpCaList' : []
				}};
	logf(rtCB);
	var rtCBNo = 0;
	for(var i=0;i<cb.list.bpCaList.length;i++){
		if(cb.list.bpCaList[i].retCd == 'F'){
			if(cb.list.bpCaList[i].retMsg.indexOf('검침 계량기가') > 0){
				rtCB.list.bpCaList[rtCBNo] = cb.list.bpCaList[i];
				rtCBNo++;
			}
		}else{
			rtCB.list.bpCaList[rtCBNo] = cb.list.bpCaList[i];
			rtCBNo++;
		}
	}
	return rtCB;
}

function clopCBPush(cb){
	var rtCB = {'result': "1000", 
				'resultMessage': "OK", 
				'list' : [{
					'bpCaList' : []
				}]};
	logf(rtCB);
	var rtCBNo = 0;
	for(var i=0;i<cb.list.bpCaList.length;i++){
		if(cb.list.bpCaList[i].retCd != 'F'){
			rtCB.list[0].bpCaList[rtCBNo] = cb.list.bpCaList[i];
			rtCB.list[0].bpCaList[rtCBNo].bp = String(Number(rtCB.list[0].bpCaList[rtCBNo].bp));
			rtCB.list[0].bpCaList[rtCBNo].ca = String(Number(rtCB.list[0].bpCaList[rtCBNo].ca));
			rtCB.list[0].bpCaList[rtCBNo].anlage = String(Number(rtCB.list[0].bpCaList[rtCBNo].anlage));
			
			rtCB.bp = rtCB.list[0].bpCaList[rtCBNo].bp;
			rtCB.ca = rtCB.list[0].bpCaList[rtCBNo].ca;
			rtCB.anlage = rtCB.list[0].bpCaList[rtCBNo].anlage;
			rtCB.regiogroup = rtCB.list[0].bpCaList[rtCBNo].regiogroup;
			rtCB.sernr = rtCB.list[0].bpCaList[rtCBNo].sernr;
			
			var bpInfo;
			bpInfo = JSON.parse(getAlopexCookie(rtCB.list[0].bpCaList[rtCBNo].regiogroup));
								
			rtCB.list[0].bpCaList[rtCBNo].lsctn = bpInfo.tel;
			
			rtCBNo++;
		}
	}
	return rtCB;
}

function runMainGo(rtCB){
	var Str3 = {
			bp : String(Number(rtCB.list.bpCaList[0].bp)),
			ca : String(Number(rtCB.list.bpCaList[0].ca)),
			sernr : rtCB.list.bpCaList[0].sernr,
			anlage : String(Number(rtCB.list.bpCaList[0].anlage)),
			regiogroup : rtCB.list.bpCaList[0].regiogroup
	};
	logf("@@@@@@@@@@@");
	logf(JSON.stringify(Str3));
	logf("@@@@@@@@@@@");
	setAlopexCookie('MainBP',getSelBP(rtCB.list.bpCaList[0].regiogroup));
	setAlopexCookie('MainBPCA',JSON.stringify(Str3));
	
	if(rtCB.list.bpCaList.length > 0){
		navigateGo('MMNPG0M0',rtCB);
	}else{
		console.log(rtCB);
		navigateGo('MMNPG0M0');
	}
}


$a.page(function(){
    this.init = function(id,param){
    	logf('page on');   	
    	
    };
});