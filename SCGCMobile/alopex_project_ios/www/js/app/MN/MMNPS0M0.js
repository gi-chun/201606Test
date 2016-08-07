var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', init);
	alopexreadyRun = false;
}
nowPGCode = 'MMNPS0M0';
var selfChk = false;		// 자가검침 가능여부 : 최종
var selfChkMulti = false;	// 자가검침 가능여부 : 다중 계량기
var selfChkSide = false;	// 자가검침 가능여부 : 외부 계량기
var selfChkSideOut = false; // 자가검침 가능여부 : 외부지시부
var endME = false;			// 자가검침 시행여부
var pushParams = '';

//var _cb = '';
//var _rtCB = '';

function init(){
	
	//gclee push
//	var pn = getAlopexCookie('uPhone');
//	var loginToken = getAlopexCookie('loginToken');
//	var lscDB = getAlopexCookie('lscDB');
//	var lscDB2 = getAlopexCookie('lscDB2');
//	var lscDB2All = getAlopexCookie('lscDB2All');
//	var MainBP = getAlopexCookie('MainBP');
//	var MainBPCA = getAlopexCookie('MainBPCA');
	
	killAllSession();
//	killAllCookie();
	killAllCookieAndExceptLscDb();
	
	pushParams = alopexController.parameters;  // push 파라미터 받기
	
//	setAlopexCookie('uPhone',pn);
//	setAlopexCookie('loginToken',loginToken);
//	setAlopexCookie('lscDB',lscDB);
//	setAlopexCookie('lscDB2',lscDB2);
//	setAlopexCookie('lscDB2All',lscDB2All);
//	setAlopexCookie('MainBP', MainBP);
//	setAlopexCookie('MainBPCA', MainBPCA);
	
	var lscDB2All = getAlopexCookie('lscDB2All');
	var results = JSON.parse(lscDB2All);
	var jsonResult = '';
	for(var i=0;i<results.list.Results.length;i++){
		jsonResult = results.list.Results[i];
		//logf('gclee MMNST0M0 LSC :' + Mcb.list.Results[i].lsc + ' DATA :' + JSON.stringify(jsonResult));
		setAlopexCookie(results.list.Results[i].lsc, JSON.stringify(jsonResult) );
	}	
	//gclee push test
	popPhone(1);
	
//	if(device.osName == 'Android'){
//		jsniCaller.invoke("GetPhoneNumber.setDefault","setDefaultBadge");
////		jsniCaller.invoke("GetPhoneNumber.myPhone","popPhone");
//	}else{
//		// 번호인증
//		popPhone(1);
//	}
	
	settingLoading();
	$('.imgloading').show();
}

function setDefaultBadge(rt){
	console.log(rt);
	jsniCaller.invoke("GetPhoneNumber.myPhone","popPhone");
}

function popPhone(pn){
	// pn = '';
	// test
	if(isTest){
		getRegistrationId('Main');
	}else{
		if(pn == '1' || pn == '' || pn == 'undefined' || pn == 'null' || pn.indexOf('01') != 0){
			contiLogin();
		}else if(pn){
			setAlopexCookie('uPhone',codePhoneNM(pn));
			getRegistrationId('Main');
		}else{
			// 번호 인증페이지
		}
	}
}

$a.page(function(){
	this.init = function(id,param){
		logf('page on');
		setDefault();
	};
});

function contiLogin(){
	var pn = getAlopexCookie('uPhone');
	if(pn == 'undefined'){
		// 원래는 휴대폰 인증
		alert('죄송합니다.\n공기계 및 해외번호 스마트폰은 사용하실 수 없습니다.\nApp을 종료합니다.');
		alopexController.exit();
	}else{
		
		//토큰이 없다면 sms인증 화면으로
		var loginToken = getAlopexCookie('loginToken');
		if(loginToken == 'undefined' || loginToken.length < 1){
			navigateGo('MACHP0M0');
//			return;
		}
		
		//gclee login
		var param = {
    		"phoneNum" : pn, "gubun" : "10", "token" : loginToken
    	};
		logf('gclee MMNPS0M0 ' + JSON.stringify(param));
		
    	httpSend("getAccInfo", param, function(cb){
    		logf('gclee MMNPS0M0 getAccInfo result: ', JSON.stringify(cb));
    		
//    		if(cb.isTokenTrue == 'false'){
//    			navigateGo('MACHP0M0');
//    			return;
//    		}
    		
    		var rtCB = clopCB(cb);
    		logf('gclee MMNPS0M0 getAccInfo result rtCB : ', JSON.stringify(rtCB));
    		
    			if(getAlopexCookie('MainBP') == 'undefined'){
    				
    				var Str3 = {
    						bp : String(Number(cb.list.bpCaList[0].bp)),
    						ca : String(Number(cb.list.bpCaList[0].ca)),
    						sernr : cb.list.bpCaList[0].sernr,
    						anlage : String(Number(cb.list.bpCaList[0].anlage)),
    						regiogroup : cb.list.bpCaList[0].regiogroup
    				};
    				
    				setAlopexCookie('MainBP',getSelBP(cb.list.bpCaList[0].regiogroup));
    				setAlopexCookie('MainBPCA',JSON.stringify(Str3));
    				
    				//gclee push test
    				logf('gclee MMNPS0M0 MainBP '+ getSelBP(cb.list.bpCaList[0].regiogroup));
    				logf('gclee MMNPS0M0 MainBPCA '+ JSON.stringify(Str3));
    			}
    			if(rtCB.list.bpCaList.length > 0){
    				// 공통 처리
    				setAlopexSession('loginSession',JSON.stringify(rtCB));	// 로그인 세션 생성
    				setAlopexCookie('loginCookie',JSON.stringify(rtCB));	// 로그인 세션 생성
//    				setSelfChkCode(rtCB,cb.list.bpCaList[0].bp,cb.list.bpCaList[0].ca);									// 자가검침 플래그 생성
    				
    				//gclee push test
    				logf('gclee MMNPS0M0 loginSession '+ JSON.stringify(rtCB));
    				logf('gclee MMNPS0M0 loginSession '+ JSON.stringify(rtCB));
    				
    				
    				// 분기 키 설정
//	    				var flag = 'H';
    				if(pushParams == 'undefined'){
    					logf('gclee MMNPS0M0 go MMNPG0M0 ');
    					navigateGo('MMNPG0M0',rtCB);
    				}else{
//    					_cb = cb;
//    					_rtCB = rtCB;
    					console.log('##111#');
    					logf('gclee MMNPS0M0 go setDefaultStartData ');
    					setDefaultStartData(cb,rtCB);
    				}
    				
    			}else{
    				navigateGo('MMNPG0M0');
    			}
//	    		}
    	}, function(errorCode, errorMessage){
			if (errorCode == "9999") {
				loge('error :: 9999 :: main');
    		} else {
    			loge('error :: other :: main');
    		}
		});
	}
}

function setDefaultStartData(cb,rtCB){
	console.log('##11122#');
	//gclee login token
	if(pushParams.PUSH_TYPE == 'E' || pushParams.PUSH_TYPE == 'D' || pushParams.PUSH_TYPE == 'B' || pushParams.PUSH_TYPE == 'C'){
		
		for(var j=0;j<cb.list.bpCaList.length;j++){
			
			logf('gclee setDefaultStartData MMNPS0M0 param CA value: ' + pushParams.CA + 'getAccInfo CA value: ' + String(Number(cb.list.bpCaList[j].ca)));
			
			if(String(Number(cb.list.bpCaList[j].ca)) == pushParams.CA){
				
				var rtMsg = {
						bp : String(Number(cb.list.bpCaList[j].bp)),
						ca : String(Number(cb.list.bpCaList[j].ca)),
						sernr : cb.list.bpCaList[j].sernr,
						anlage : String(Number(cb.list.bpCaList[j].anlage)),
						regiogroup : cb.list.bpCaList[j].regiogroup,
						"token" : getAlopexCookie('loginToken')
				};
				setSelfChkCode(rtCB,cb.list.bpCaList[j].bp,cb.list.bpCaList[j].ca);									// 자가검침 플래그 생성
				setAlopexSession('mainParam',JSON.stringify(rtMsg));
				setAlopexCookie('mainParamCookie',JSON.stringify(rtMsg));
				chkJAGA(rtMsg);
				return;
			}
		}
	}else{
//	}else if(pushParams.PUSH_TYPE == 'A'){
		var mainBPCA = getMainBPCA();
		var mbc = JSON.parse(mainBPCA);
		console.log(mbc);
		if(mainBPCA != 'undefined'){
			for(var j=0;j<cb.list.bpCaList.length;j++){
				if(String(Number(cb.list.bpCaList[j].ca)) == mbc.ca){
					var rtMsg = {
							bp : String(Number(cb.list.bpCaList[j].bp)),
							ca : String(Number(cb.list.bpCaList[j].ca)),
							sernr : cb.list.bpCaList[j].sernr,
							anlage : String(Number(cb.list.bpCaList[j].anlage)),
							regiogroup : cb.list.bpCaList[j].regiogroup,
							"token" : getAlopexCookie('loginToken')                                                     //gclee push - token추가 서버올라오면 확인예정
					};
					setSelfChkCode(rtCB,cb.list.bpCaList[j].bp,cb.list.bpCaList[j].ca);									// 자가검침 플래그 생성
					setAlopexSession('mainParam',JSON.stringify(rtMsg));
					setAlopexCookie('mainParamCookie',JSON.stringify(rtMsg));
					chkJAGA(rtMsg);
					return;
				}
			}
		}else{
			navigateGo('MMNPG0M0');
		}
	}
}

function chkJAGA(paramcc){
	httpSend("getMnpgInfo", paramcc, mainSetting, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
}

function mainSetting(ccb){
	logf('###jys9###');
	setAlopexSession('mainPage',JSON.stringify(ccb));
	logf(ccb);
	// 자가검침이 입력된 경우 체크
	if (ccb.custReadingresult == "0" ||ccb.custReadingresult == "null") {
		endME = false;
		setAlopexSession('endME',endME);
	}else{
		endME = true;
		setAlopexSession('endME',endME);
	}
	//대표 BP 셋팅
	//메인 로고
	//센터 전화, 명
	
	// 자가검침
	if(selfChk){
		if(ccb.v_ablhinw == "10"){ 
			selfChk = false;
			selfChkSideOut = true;
			setAlopexSession('selfChkSideOut',selfChkSideOut);
			setAlopexCookie('selfChkSideOutCookie',selfChkSideOut);
			// 자가검침이 note 10 외부지시부
			//gclee push
			logf('###gclee push #1 ###');
			
		}else if(isOverChkDate(ccb.e_adatsoll1,ccb.s_adatsoll1)){
			selfChk = true;
			setAlopexSession('selfChk',selfChk);
			setAlopexCookie('selfChkCookie',selfChk);
			//gclee push
			logf('###gclee push #2 ###');
			callBackSetGoing();
		}else{
			selfChkSideOut = false;
			setAlopexSession('selfChkSideOut',selfChkSideOut);
			setAlopexCookie('selfChkSideOutCookie',selfChkSideOut);
			selfChk = false;
			setAlopexSession('selfChk',selfChk);
			setAlopexCookie('selfChkCookie',selfChk);
			//gclee push
			logf('###gclee push #3 ###');
			callBackSetGoing();
		}
	}else{
		selfChk = false;
		setAlopexSession('selfChk',selfChk);
		setAlopexCookie('selfChkCookie',selfChk);
		//gclee push
		logf('###gclee push #4 ###');
		callBackSetGoing();
	}
	
}

function callBackSetGoing(){
	logf(JSON.stringify(pushParams));
	if(pushParams.PUSH_TYPE == 'D'){	// 자가검침
		// BP, CA, 계량기번호, 설치번호, LSC코드
		// 검침 이미 입력? 최초입력 확인?
//			var rtMsg = {
//					'bp' : pushParams.BP,
//					'ca' : pushParams.CA,
//					'regiogroup' : pushParams.regiogroup,
//					'sernr' : pushParams.sernr,
//					'anlage' : pushParams.anlage
//			};
//
//			setAlopexSession('mainParam',JSON.stringify(rtMsg));
		if(endME){
			navigateGo('MMETR0M1'); 
		}else{
			navigateGo('MMETR0M0'); 
		}
		
		// 검침 여부 체크 분기
	}else if(pushParams.PUSH_TYPE == 'E'){	// 청구서
		//gclee push
		logf('###gclee push #5 청구서 goto MBLMG0M2 ###');
		// BP, CA, 청구서번호 
		var rtMsg = {
				'bp' : pushParams.BP,
				'ca' : pushParams.CA,
				'DOC_HEADER_OPBEL' : pushParams.DOC_HEADER_OPBEL
		};
		navigateGo('MBLMG0M2',rtMsg);
	}else if(pushParams.PUSH_TYPE == 'A'){	// 공지사항 ~6/19
		// 공지사항 번호
//	        					var rtMsg = {
//	        							'bp' : bp,
//	        							'ca' : ca,
//	        							'DOC_HEADER_OPBEL' : billNo
//	        					};
//	        					navigateGo('MBLMG0M2',rtMsg);
		navigateGo('MMNPG0M0',rtCB);
	}else if(pushParams.PUSH_TYPE == 'B'){	// 설문 ~7/2
		// 설문번호
		var rtMsg = {
				'svrNo' : pushParams.seq
		};
		navigateGo('MNTSV0M2',rtMsg);
	}else if(pushParams.PUSH_TYPE == 'C'){	// QnA ~7/14
		// QnA 번호
		var rtMsg = {
				'seq' : pushParams.seq
		};
		navigateGo('MNTQA0M1',rtMsg);
	}else if(pushParams.PUSH_TYPE == 'G'){	// QnA ~7/14
		
		navigateGo('index');
		
	}else{
//	        					alert('잘못된 PUSH 입니다.');
//	        					if(device.osName == 'Android'){
//	        						alopexController.exit();
//	        					}
		logf('END #############################################');
//	        					
		navigateGo('MMNPG0M0',rtCB);
	}
}

function runMain(){
//	console.log('!!!!!');
	var rtCB = clopCB(cb);
	var rtCBPush = clopCBPush(cb);
//	log.log(rtCB);

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
				rtCBPush.device_type = 'A';
				rtCBPush.token_key = getAlopexCookie('loginToken');
				
				httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
//					console.log('push id save ok1');//
					setSessionKill('agreeProvideInfoYn');
					setCookieKill('agreeProvideInfoYnCookie');
					runMainGo(rtCB);
				}, function(errorCode, errorMessage){
//					console.log('push id save error1');
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
//					console.log('push id save ok2');
					setSessionKill('agreeProvideInfoYn');
					setCookieKill('agreeProvideInfoYnCookie');
					runMainGo(rtCB);
				}, function(errorCode, errorMessage){
//					console.log('push id save error2');
					setSessionKill('agreeProvideInfoYn');
					setCookieKill('agreeProvideInfoYnCookie');
					runMainGo(rtCB);
				});
			}else{
				logf(dType);
				runMainGo(rtCB);
			}
//		}
	}else{
		navigateGo('MMNPG0M0');
	}
}

function runMainGo(rtCB){
	if(getAlopexCookie('MainBP') == 'undefined'){
		var Str3 = {
				bp : String(Number(rtCB.list.bpCaList[0].bp)),
				ca : String(Number(rtCB.list.bpCaList[0].ca)),
				sernr : rtCB.list.bpCaList[0].sernr,
				anlage : String(Number(rtCB.list.bpCaList[0].anlage)),
				regiogroup : rtCB.list.bpCaList[0].regiogroup
		};
		
		setAlopexCookie('MainBP',getSelBP(rtCB.list.bpCaList[0].regiogroup));
		setAlopexCookie('MainBPCA',JSON.stringify(Str3));
	}
	if(rtCB.list.bpCaList.length > 0){
		navigateGo('MMNPG0M0',rtCB);
	}else{
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
	for(var i=0;i<cb.list.bpCaList.length;i++){
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
			rtCBNo++;
		}else{
			if(cb.list.bpCaList[i].retMsg.indexOf('검침 계량기가') > 0){
				rtCB.list[0].bpCaList[rtCBNo] = cb.list.bpCaList[i];
				rtCB.list[0].bpCaList[rtCBNo].bp = String(Number(rtCB.list[0].bpCaList[rtCBNo].bp));
				rtCB.list[0].bpCaList[rtCBNo].ca = String(Number(rtCB.list[0].bpCaList[rtCBNo].ca));
				rtCB.list[0].bpCaList[rtCBNo].anlage = String(Number(rtCB.list[0].bpCaList[rtCBNo].anlage));
				
				rtCB.bp = rtCB.list[0].bpCaList[rtCBNo].bp;
				rtCB.ca = rtCB.list[0].bpCaList[rtCBNo].ca;
				rtCB.anlage = rtCB.list[0].bpCaList[rtCBNo].anlage;
				rtCB.regiogroup = rtCB.list[0].bpCaList[rtCBNo].regiogroup;
				rtCB.sernr = rtCB.list[0].bpCaList[rtCBNo].sernr;
				rtCBNo++;
			}	
		}
	}
	return rtCB;
}

function setSelfChkCode(params,bp,ca){
	for(var i=0;i<params.list.bpCaList.length;i++){
		if(params.list.bpCaList[i].ca == ca){
			if(params.list.bpCaList[i].note == 'B'){
				// 계량기 외부
				selfChk = false;		// 자가검침 가능여부 : 최종
				selfChkSide = true;		// 자가검침 가능여부 : 외부 계량기
				setAlopexSession('selfChk',selfChk);
				setAlopexSession('selfChkMulti',selfChkMulti);
				setAlopexSession('selfChkSide',selfChkSide);
				setAlopexCookie('selfChkCookie',selfChk);
				setAlopexCookie('selfChkMultiCookie',selfChkMulti);
				setAlopexCookie('selfChkSideCookie',selfChkSide);
			}else if(params.list.bpCaList[i].mult == 'X'){
				// 계량기 다수
				selfChk = false;		// 자가검침 가능여부 : 최종
				selfChkMulti = true;	// 자가검침 가능여부 : 다중 계량기
				setAlopexSession('selfChk',selfChk);
				setAlopexSession('selfChkMulti',selfChkMulti);
				setAlopexSession('selfChkSide',selfChkSide);
				setAlopexCookie('selfChkCookie',selfChk);
				setAlopexCookie('selfChkMultiCookie',selfChkMulti);
				setAlopexCookie('selfChkSideCookie',selfChkSide);
			}else{
				selfChk = true;
				setAlopexSession('selfChk',selfChk);
				setAlopexSession('selfChkMulti',selfChkMulti);
				setAlopexSession('selfChkSide',selfChkSide);
				setAlopexCookie('selfChkCookie',selfChk);
				setAlopexCookie('selfChkMultiCookie',selfChkMulti);
				setAlopexCookie('selfChkSideCookie',selfChkSide);
			}
		}
	}
}
