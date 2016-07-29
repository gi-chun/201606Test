var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', init);
	alopexreadyRun = false;
}

nowPGCode = 'MMNST0M0';
var cb = '';
var pnLog = "";
function init(){
	
	//gclee lsc
	//check! is there lsc data before 
	//var lscDB = JSON.parse(getAlopexCookie('lscDB'));
	
	var lscDB = getAlopexCookie('lscDB');
	
	if(lscDB != 'undefined'){
		//번호인증
		popPhone('1');
		
	}else{
		
		killAllSession();
		if(device.osName == 'Android'){
			killAllCookie();
		}
		
		//서비스센터 데이터 받아오기
		var param = {
				"lsc" : "test",
			};

		var jsonResult;
		httpSend("getLscData", param, function(Mcb){
			jsonResult = JSON.stringify(Mcb.list.Results);
			logf("getLscData json data : \n");
			logf(jsonResult);
			setAlopexCookie('lscDB',jsonResult);
			//setAlopexCookie('lscDB',JSON.stringify(Mcb.list.Results));
			//setAlopexCookie('lscDB',Mcb.list.Results);
			loge('@@@@@@@@gclee \n save lscDB \n');
			
				// gclee lsc next /////////////////////////////////////////////////////////
				 param = {
						"lsc" : "test",
					};
		
				httpSend("getLscNextData", param, function(Mcb){
					jsonResult = JSON.stringify(Mcb.list.Results);
					logf("getLscNextData json data : \n");
					logf(jsonResult);
					setAlopexCookie('lscDB2',jsonResult);
					
					for(var i=0;i<Mcb.list.Results.length;i++){
						jsonResult = Mcb.list.Results[i];
//						logf("per server data : \n");
//						logf(jsonResult);
//						logf("per json data : \n");
//						logf( JSON.stringify(jsonResult));
						//gclee push
						logf('gclee MMNST0M0 LSC :' + Mcb.list.Results[i].lsc + ' DATA :' + JSON.stringify(jsonResult));
						setAlopexCookie(Mcb.list.Results[i].lsc, JSON.stringify(jsonResult) );
					}
					loge('@@@@@@@@gclee \n save lscDB2 \n');
					//gclee sms Android & iOS 모두 번호인증
					if(device.osName == 'Android'){
						jsniCaller.invoke("GetPhoneNumber.setDefault","setDefaultBadge");
						// 번호인증
						popPhone('1');
					}else{
						// 번호인증
						popPhone('1');
					}
					//gclee sms end
					
				}, function(errorCode, errorMessage){
					if (errorCode == "9999") {
						loge('error :: 9999 :: main');
					} else {
						loge('error :: other :: main');
					}
				});
				/////////////////////////////////////////////////////////////////////////////
			
		}, function(errorCode, errorMessage){
			if (errorCode == "9999") {
				loge('error :: 9999 :: main');
			} else {
				loge('error :: other :: main');
			}
		});
	}
	
	settingLoading();
	$('.imgloading').show();
}

function setDefaultBadge(rt){
	console.log(rt);
	jsniCaller.invoke("GetPhoneNumber.myPhone","popPhone");
}

function popPhone(pn){
	
	var chkPhone;
	var vPn;
	
	vPn = pn;
//	vPn = '01024183828'; //운영서버 테스트 용도 이명환대리님 전화번호
//	vPn = '01028394001'; //TST 자가검침 테스트
//	vPn = '01021283659'; //TST 자가검침 테스트
//	vPn = '01092553966'; //TST 테스트
//	vPn = '01020043999'; //TST 테스트
//	vPn = '01091901214'; //TST 보안점검팀 테스트
//	vPn = '01037625935'; //TST 청구서
//	vPn = '01066103573'; 
//  vPn = '01085289374'; //외부가입회원 로그인 프로세스 테스트
	
	//gclee login #################################################################################################
	//gclee sms
		
		chkPhone = getAlopexCookie('uPhone');
		
		vPn = chkPhone;
		if(chkPhone == 'undefined'){
			
			navigateGo('MACHP0M0');
			
		}else{
			
/////////////////////////////////////////////////
			//gclee login
					
			//인증된 전화번호로 가입여부를 확인한다.
			//처음 CIP에 요청하여 가입여부확인 (결과값 1:앱가입자, 2:SAP가입자, 3:미가입자, 4.클라이언트 vs 서버 토큰 틀린경우 )
			//API 호출은 80번 하나로 앱가입자, SAP가입자, 미가입자 서버에서 판단하여 보내줌
			//아래 사항은 서버처리 사항 참고
			//CIP에 요청결과 가입자면 아래 로그인프로세스 진행
			//CIP에 요청결과 미가입자면 다시 SAP에 요청하여 가입여부확인 (결과값 1:앱가입자, 2:SAP가입자, 3:미가입자, 4:클라이언트 vs 서버토큰 상이 -> 번호인증화면 ) 
			//SAP에 요청결과 가입자면 아래 로그인프로세스 진행
			//SAP에 요청결과 미가입자면 앱 회원가입 화면으로 이동 (MACHP1M0)
			
			//gclee login token
			//토큰이 없다면 sms인증 화면으로
//			var chkLoginToken = getAlopexCookie('loginToken');
//			logf('gclee MMNST0M0 chkLoginToken' + chkLoginToken);
//			
//			if(chkLoginToken == 'undefined' || chkLoginToken.length < 1){
//				logf('gclee MMNST0M0 chkLoginToken #2' + chkLoginToken);
//				navigateGo('MACHP0M0');
//				return;
//			}
			
//			logf('gclee MMNST0M0 chkLoginToken #3' + chkLoginToken);
			
				//gclee login 80번은 신규
				var param = {
					"phoneNum" : vPn, "gubun" : "80"
				};
				
				logf('gclee getAccInfo MMNST0M0 ' + JSON.stringify(param));
				
				httpSend("getAccInfo", param, function(cb){
							
		    		logf("getAccInfo: " + cb);
		    		logf("getAccInfo:joinCode: " + cb.joinCode);
		    		
		    		// 1: 앱가입자, 2: sap가입자, 3: 미가입자, 4: 클라이언트 vs 서버토큰 상이 -> 번호인증화면
		    		if(cb.joinCode == '3'){
		    			setAlopexCookie('loginToken', cb.token);
		    			navigateGo('MACHP1M0');
		    			
		    		}else if(cb.joinCode == '4'){ //클라이언트 vs 서버토큰 상이 -> 번호인증화면
		    			navigateGo('MACHP0M0');
		    		}else{
		    			
		    			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		    			//기존로직 로그인
		    			//gclee login token
		    			logf("getAccInfo:loginToken: " + cb.token);
		    			setAlopexCookie('loginToken', cb.token);
		    			
		    			// test
		    			if(isTest){
		    				//	console.log('1212121212#####################################ok');
		    				//	getRegistrationId('Main');
		    				var pnChk = getAlopexCookie('uPhone');
		    				if(pnChk == 'undefined'){
		    					//navigateGo('MACHP1M0');
		    					navigateGo('MACHP0M0');
		    					//console.log('111');
		    				}else{
		    					logf('222');
		    					getRegistrationId('Main');
		    				}
		    				
		    			}else{
		    				//gclee login Android & iOS 로그인프로세스 동일처리
		    				
		    				if(device.osName == 'Android'){
		    					
		    					pnLog = vPn;
		    					
		    					//jsniCaller.invoke("MarketVersionCheck.check","popVersionCheck");
		    					//popVersionCheckNo();
		    					
		    					//gclee login
		    					if(vPn == '1'){
		    						var pnChk = getAlopexCookie('uPhone');
		    						if(pnChk == 'undefined'){
		    							navigateGo('MACHP0M0');
		    						}else{
		    							if(pnChk == '1' || pnChk == '' || pnChk == 'undefined' || pnChk == 'null' || pnChk.indexOf('01') != 0){
		    								contiLogin();
		    							}else{
		    								getRegistrationId('Main');
		    								//gclee lsc
		    								contiLogin();
		    							}
		    						}
		    					}else{
		    						pnLog = vPn;
		    						if(vPn == '1' || vPn == '' || vPn == 'undefined' || vPn == 'null' || vPn.indexOf('01') != 0){
		    							contiLogin();
		    							// 번호 인증페이지
		    						}else if(vPn){
		    							setAlopexCookie('uPhone',codePhoneNM(vPn));
		    							getRegistrationId('Main');
		    							//gclee lsc
		    							contiLogin();
		    						}else{
		    							
		    						}
		    					}
		    					//gclee login end
		    					
		    				}else if(device.osName == 'iOS'){
		    					if(vPn == '1'){
		    						var pnChk = getAlopexCookie('uPhone');
		    						if(pnChk == 'undefined'){
		    							navigateGo('MACHP0M0');
		    						}else{
		    							if(pnChk == '1' || pnChk == '' || pnChk == 'undefined' || pnChk == 'null' || pnChk.indexOf('01') != 0){
		    								contiLogin();
		    							}else{
		    								getRegistrationId('Main');
		    								//gclee lsc
		    								contiLogin();
		    							}
		    						}
		    					}else{
		    						pnLog = vPn;
		    						if(vPn == '1' || vPn == '' || vPn == 'undefined' || vPn == 'null' || vPn.indexOf('01') != 0){
		    							contiLogin();
		    							// 번호 인증페이지
		    						}else if(vPn){
		    							setAlopexCookie('uPhone',codePhoneNM(vPn));
		    							getRegistrationId('Main');
		    							//gclee lsc
		    							contiLogin();
		    						}else{
		    							
		    						}
		    					}
		    					
		    				}else{
		    					//console.log('1212121212#####################################no');
		    					pnLog = vPn;
		    					if(vPn == '1' || vPn == '' || vPn == 'undefined' || vPn == 'null' || vPn.indexOf('01') != 0){
		    						contiLogin();
		    						// 번호 인증페이지
		    					}else if(vPn){
		    						setAlopexCookie('uPhone',codePhoneNM(vPn));
		    						//? test
		    						getRegistrationId('Main');
		    						contiLogin();
		    					}else{
		    						
		    					}
		    				}
		    			}
		    			
		    			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		    			//기존로직 로그인
		    			
		    		}
		    		
		    		
		    	}, function(errorCode, errorMessage){
		    		
		    		if (errorCode == "9999") {
		    			loge('error :: 9999 :: getIsMemberChk');
		    		} else {
		    			loge('error :: other :: getIsMemberChk');
		    		}
				});
			
			
			//gclee login end ############################################################################################## 
		    	

			//$('#uPhones').val(vPn);
//			var pushID = getAlopexCookie("pushID");
//			if(isNullCheck(pushID)){
//			if(true){
			
//			}else{
				//pushNotification.useImmediateForegroundNotification(true);
//				log.log('pushID :: '+pushID);
//				runDB();
//			}
			
		}

	
}

function popVersionCheck(ver){
	logf('############end check vesion1');
	var sv = JSON.parse(ver);
	if(sv.result=="true"){
		logf('############go next');
		if(pnLog == '1' || pnLog == '' || pnLog == 'undefined' || pnLog == 'null' || pnLog.indexOf('01') != 0){
			contiLogin();
			// 번호 인증페이지
		}else if(pnLog){
			setAlopexCookie('uPhone',codePhoneNM(pnLog));
			getRegistrationId('Main');
		}else{
			
		}
	}else{
		logf('############go update');
		logf('############result ::'+sv.result);
		logf('############palyCode ::'+sv.playVersion);
		logf('############localCode ::'+sv.AppVersion);
		alert('새로운 업데이트 항목이 있습니다.\n확인을 누르시면\n업데이트 페이지로 이동합니다.');
		application.startWebBrowser("https://play.google.com/store/apps/details?id="+CONSTANTS.APP_IDENTIFIER+"&hl=ko");
	}
}

function popVersionCheckNo(){
	logf('############go next');
	if(pnLog == '1' || pnLog == '' || pnLog == 'undefined' || pnLog == 'null' || pnLog.indexOf('01') != 0){
		contiLogin();
		// 번호 인증페이지
	}else if(pnLog){
		setAlopexCookie('uPhone',codePhoneNM(pnLog));
		getRegistrationId('Main');
	}else{
		
	}
}

$a.page(function(){
	this.init = function(id,param){
		logf('page on');
		setDefault();
		//runDB();
	};
});

function contiLogin(){
	var pn = getAlopexCookie('uPhone');
	if(pn == 'undefined'){
		// 원래는 휴대폰 인증
		alert('죄송합니다.\n공기계 및 해외번호 스마트폰은 사용하실 수 없습니다.\nApp을 종료합니다.');
		alopexController.exit();
		//navigateGo('MACHP1M0');
	}else{
		
		//gclee login
		var param = {
    		"phoneNum" : pn, "gubun" : "10"
    	};
		logf('gclee getAccInfo MMNST0M0 ' + JSON.stringify(param));
    	httpSend("getAccInfo", param, function(Mcb){
    		logf('cb',Mcb);
    		cb = Mcb;
    		// 계량기 여러대
    		// 일치
    		
//    		var cfl = chkFLength(cb);
//    		if(cfl == cb.list.bpCaList.length){
//    			console.log('sss');
//    			console.log(cfl);
//				navigateGo('MACHP1M0');
//			}else{
				savePushId('Main');
//    		}
				
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
    			
				$('.pPhoneSendNO').click(function(){
		    		//공용
		    		
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
	var rtCB = clopCB(cb);
	var rtCBPush = clopCBPush(cb);
	logf(rtCBPush);
	var pn = getAlopexCookie('uPhone');
	var pushID = getAlopexCookie("pushID");
	
	if(rtCB.list.bpCaList.length > 0){										// 쓸수있는 정보있는지 확인
//		if(pushID == 'undefined'){												// PushID 여부 확인
//			runMainGo(rtCB);
//		}else{
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
//				rtCBPush.push_id = pushID;
				rtCBPush.device_type = 'A';
				rtCBPush.token_key = getAlopexCookie('loginToken');
				
				httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
//					var recomendr = getAlopexSession('recomendr');
					var recomendr = '';
					if(device.osName != 'iOS'){
						recomendr = getAlopexSession('recomendr');
					}else{
						recomendr = getAlopexCookie('recomendrCookie');
					}
					
					if(recomendr == 'undefined'){
						runMainGo(rtCB);
					}else{
						var paramRec = {
			    			"phoneNum" : pn, "recomendr" : recomendr
			    		};
			    		httpSend("putRecomendr", paramRec, function(cb3){
//				    			console.log(cb);
			    			console.log(cb3);
//				    			navigateGo('MACHP1M1',cb2);
			    			runMainGo(rtCB);
			    		}, function(errorCode, errorMessage){
			    			if (errorCode == "9999") {
			    				loge('error :: 9999 :: main');
			    			} else {
			    				loge('error :: other :: main');
			    			}
			    			runMainGo(rtCB);
			    		});
					}
					
					setSessionKill('agreeProvideInfoYn');
					setCookieKill('agreeProvideInfoYnCookie');
					
				}, function(errorCode, errorMessage){
					setSessionKill('agreeProvideInfoYn');
					setCookieKill('agreeProvideInfoYnCookie');
					runMainGo(rtCB);
				});
			}else if(dType=='iOS'){
				//gclee push
//				rtCBPush.push_id = pushID;
				rtCBPush.device_type = 'I';
				rtCBPush.token_key = getAlopexCookie('loginToken');
				
				httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
//					runMainGo(rtCB);
//					var recomendr = getAlopexSession('recomendr');
					var recomendr = '';
					if(device.osName != 'iOS'){
						recomendr = getAlopexSession('recomendr');
					}else{
						recomendr = getAlopexCookie('recomendrCookie');
					}
					if(recomendr == 'undefined'){
						runMainGo(rtCB);
					}else{
						var paramRec = {
			    			"phoneNum" : pn, "recomendr" : recomendr
			    		};
			    		httpSend("putRecomendr", paramRec, function(cb3){
//				    			console.log(cb);
			    			console.log(cb3);
//				    			navigateGo('MACHP1M1',cb2);
			    			runMainGo(rtCB);
			    		}, function(errorCode, errorMessage){
			    			if (errorCode == "9999") {
			    				loge('error :: 9999 :: main');
			    			} else {
			    				loge('error :: other :: main');
			    			}
			    			runMainGo(rtCB);
			    		});
					}
					
					setSessionKill('agreeProvideInfoYn');
					setCookieKill('agreeProvideInfoYnCookie');
					
				}, function(errorCode, errorMessage){
					setSessionKill('agreeProvideInfoYn');
					setCookieKill('agreeProvideInfoYnCookie');
					runMainGo(rtCB);
				});
			}else{
//				logf(dType);
//				runMainGo(rtCB);
				
				
				// TODO
				// 추천인, 가입자, 푸시 아이디를 저장하는 로직. 테스트를 위해 주석 처리. 
				// gclee
//				runMainGo(rtCB); // 운영 배포시 주석 처리
				
				// 운영 배포시 아래 부터는 주석 해제
				//gclee push
//				rtCBPush.push_id = pushID;
				rtCBPush.device_type = 'A';
				rtCBPush.token_key = getAlopexCookie('loginToken');
				
				httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
					var recomendr = '';
					if(device.osName != 'iOS'){
						recomendr = getAlopexSession('recomendr');
					}else{
						recomendr = getAlopexCookie('recomendrCookie');
					}
					if(recomendr == 'undefined'){
						runMainGo(rtCB);
					}else{
						var paramRec = {
			    			"phoneNum" : pn, "recomendr" : recomendr
			    		};
			    		httpSend("putRecomendr", paramRec, function(cb3){
			    			console.log(cb3);
			    			runMainGo(rtCB);
			    		}, function(errorCode, errorMessage){
			    			if (errorCode == "9999") {
			    				loge('error :: 9999 :: main');
			    			} else {
			    				loge('error :: other :: main');
			    			}
			    			runMainGo(rtCB);
			    		});
					}
				}, function(errorCode, errorMessage){
					runMainGo(rtCB);
				});
				// --
				
			}
//		}
	}else{
		console.log(cb);
//		console.log(rtCB);
		navigateGo('MMNPG0M0');
	}
}

//gclee
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
	
	
	// 전에 선택했었던 bpca 값이 있다면 셋팅
	if((getGlobalPreference('selectedBp')!='undefined') && (getGlobalPreference('selectedBpCa')!='undefined')){
		for(var i=0; i<rtCB.list.bpCaList.length; i++){
			var jsonBpCa = {
					bp : String(Number(rtCB.list.bpCaList[i].bp)),
					ca : String(Number(rtCB.list.bpCaList[i].ca)),
					sernr : rtCB.list.bpCaList[i].sernr,
					anlage : String(Number(rtCB.list.bpCaList[i].anlage)),
					regiogroup : rtCB.list.bpCaList[i].regiogroup
			};
			if(getSelBP(rtCB.list.bpCaList[i].regiogroup)==getGlobalPreference('selectedBp')
					&& JSON.stringify(jsonBpCa)==getGlobalPreference('selectedBpCa')){
				setAlopexSession('SessionBP', getGlobalPreference('selectedBp'));
				setAlopexSession('SessionBPCA', getGlobalPreference('selectedBpCa'));
			}
		}
	}
	// --
	
	if(rtCB.list.bpCaList.length > 0){
//		var paramS = { 'list' : 	[{'bpCaReqList' : [] }]	};
//		var j = 0;
//		for(var i=0;i<rtCB.list.bpCaList.length;i++){
//			if(rtCB.list.bpCaList[i].controlGp == 22){
//				paramS.list[0].bpCaReqList[j] = {
//						'bp' : rtCB.list.bpCaList[i].bp,
//						'ca' : rtCB.list.bpCaList[i].ca,
//						'phoneNum' : rtCB.list.bpCaList[i].mobile,
//						'statusGp' : 21,
//						'gubun' : '50'
//				};
//				j = j+1;
//			}
//		}
//		
//		if(j > 0){
//			httpSend("putAccInfo", paramS, function(cb){
////				alert('변경');
//				navigateGo('MMNPG0M0',rtCB);
//	    	}, function(errorCode, errorMessage){
////	    		alert('변경 실패');
//	    		console.log('error');
//	    		navigateGo('MMNPG0M0',rtCB);
//	    	});
//		}else{
//			alert('변경 안함');
		//gclee push test 잠시 주석	
		navigateGo('MMNPG0M0',rtCB);
			
			//gclee push test
//			var rtMsg = {
//				    "PUSH_TYPE": "E",
//				    "BP": "16701312",
//				    "CA": "17285916",
//				    "DOC_HEADER_OPBEL": "221007358579"
//				};
//			
//			navigateGo('pushstart',rtMsg);
			
			//gclee push test end
//		}
	}else{
		console.log(rtCB);
		navigateGo('MMNPG0M0');
	}
}

function chkFLength(cb){
	var chkNo = 0;
	for(var i=0;i<cb.list.bpCaList.length;i++){
		//if(cb.list.bpCaList[i].retMsg.indexOf('검침 계량기가 여러 대 입니다.') > -1){
			//
		//}else if(cb.list.bpCaList[i].retCd == 'F'){
		if(cb.list.bpCaList[i].retCd == 'F'){
			if(cb.list.bpCaList[i].retMsg.indexOf('검침 계량기가') > 0){
			
			}else{
				chkNo++;
			}
		}
	}
	return chkNo;
}

function clopCB(cb){
	var rtCB = { 'result': "1000", 
			'resultMessage': "OK", 
			'list' : {
			           'bpCaList' : []
			}};
	logf(rtCB);
	var rtCBNo = 0;
	for(var i=0;i<cb.list.bpCaList.length;i++){
//		if(cb.list.bpCaList[i].retCd != 'F' || cb.list.bpCaList[i].retMsg.indexOf('검침 계량기가 여러 대 입니다.') > -1){
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
	var rtCB = { 'result': "1000", 
			'resultMessage': "OK", 
			'list' : [{
			           'bpCaList' : []
			}]};
	logf(rtCB);
	var rtCBNo = 0;
	for(var i=0;i<cb.list.bpCaList.length;i++){ //TODO
//		if(cb.list.bpCaList[i].retCd != 'F' || cb.list.bpCaList[i].retMsg.indexOf('검침 계량기가 여러 대 입니다.') > -1){
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