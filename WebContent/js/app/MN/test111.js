/**
 * SAP 싱크 맞추기용 로그인 자동 프로그램
 * console 에서 runDB() 입력해야 EBPP에 등록 완료 됨. 
 */

var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', init);
	alopexreadyRun = false;
}

nowPGCode = 'MMNST0M0';
var cb = '';
var pnLog = "";

var k = 0;
var acc = ['01063327642','01024418751','01043704862','01035287574','01062358926','01065658663','01023086952','01062358926','01030519141','01096776580','01075355966','01062358926','01041114145','01026570910','01062358926','01054251671'];

var accRT = [acc.length];

function init(){
	killAllSession();
	if(device.osName == 'Android'){
		killAllCookie();
//		preference.removeAll();
	}
//	killAllCookie();
	
	if(device.osName == 'Android'){
		jsniCaller.invoke("GetPhoneNumber.setDefault","setDefaultBadge");
//		jsniCaller.invoke("GetPhoneNumber.myPhone","popPhone");
	}else{
		// 번호인증
//		popPhone(1);
		popPhone(acc[k]);
		k = k+1;
		//if(chkNum() == 'undefined'){
		//	navigateGo('MACHP0M0');
		//}
	}
	settingLoading();
	$('.imgloading').show();
//	showProgressBar();
}

function setDefaultBadge(rt){
	console.log(rt);
	jsniCaller.invoke("GetPhoneNumber.myPhone","popPhone");
}

function popPhone(pn){
	
		// test
	if(isTest){
		//	console.log('1212121212#####################################ok');
		//	getRegistrationId('Main');
		var pnChk = getAlopexCookie('uPhone');
		if(pnChk == 'undefined'){
			navigateGo('MACHP1M0');
			//console.log('111');
		}else{
			logf('222');
			getRegistrationId('Main');
		}
		
	}else{
		if(device.osName == 'Android'){
			pnLog = pn;
			jsniCaller.invoke("MarketVersionCheck.check","popVersionCheck");
		}else if(device.osName == 'iOS'){
			if(pn == 1){
				var pnChk = getAlopexCookie('uPhone');
				if(pnChk == 'undefined'){
					navigateGo('MACHP0M0');
				}else{
					if(pnChk == '1' || pnChk == '' || pnChk == 'undefined' || pnChk == 'null' || pnChk.indexOf('01') != 0){
						contiLogin();
					}else{
						getRegistrationId('Main');
					}
				}
			}else{
				pnLog = pn;
				if(pn == '1' || pn == '' || pn == 'undefined' || pn == 'null' || pn.indexOf('01') != 0){
					contiLogin();
					// 번호 인증페이지
				}else if(pn){
					setAlopexCookie('uPhone',codePhoneNM(pn));
					getRegistrationId('Main');
				}else{
					
				}
			}
			
		}else{
			//console.log('1212121212#####################################no');
			pnLog = pn;
			if(pn == '1' || pn == '' || pn == 'undefined' || pn == 'null' || pn.indexOf('01') != 0){
				contiLogin();
				// 번호 인증페이지
			}else if(pn){
				setAlopexCookie('uPhone',codePhoneNM(pn));
				contiLogin();
				//getRegistrationId('Main');
			}else{
				
			}
		}
	}
	//$('#uPhones').val(pn);
//	var pushID = getAlopexCookie("pushID");
//	if(isNullCheck(pushID)){
//	if(true){
	
//	}else{
		//pushNotification.useImmediateForegroundNotification(true);
//		log.log('pushID :: '+pushID);
//		runDB();
//	}
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
		var param = {
    		"phoneNum" : pn, "gubun" : "10"
    	};
		logf(param);
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
//				savePushId('Main');
    			runMain();
//    		}
    	}, function(errorCode, errorMessage){
			if (errorCode == "9999") {
				if(isChkDay()){
					notiPop('정기 점검 안내','- SK E&S 서버 정기점검 안내 -<br/>기간 : 매주 목요일 20:00 ~ 24:00<br/><font color="gray" size="1pt">*작업에 따라 예고없이 연장되기도 합니다.</font><br/>이용에 불편을 드려 죄송합니다.',true,false,{
						list : [{
							type : 2,
							id : 'pCloseOK',
							name : '종료'
						}]
					});
					$('.pPhoneSendNO').click(function(){
			    		//공용
			    		
			    		if(device.osName == 'Android'){
			    			alopexController.exit();
			    		}else{
			    			notiPopID.close();
			    		}
			    	});
				}
    			loge('error :: 9999 :: main');
    		} else {
    			loge('error :: other :: main');
    		}
		});
	}
}

function runMain(){
//	console.log('!!!!!');
	var rtCB = clopCB(cb);
	var rtCBPush = clopCBPush(cb);
//	log.log(rtCB);
	logf(rtCBPush);
	console.log(rtCBPush);
	var pn = getAlopexCookie('uPhone');
	var pushID = getAlopexCookie("pushID");
	if(rtCB.list.bpCaList.length > 0){										// 쓸수있는 정보있는지 확인
//		if(pushID == 'undefined'){												// PushID 여부 확인
//			runMainGo(rtCB);
//		}else{
			var dType = device.osName;
			if(dType=='Android'){
				rtCBPush.push_id = pushID;
				rtCBPush.device_type = 'A';
				httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
					var recomendr = getAlopexSession('recomendr');
					
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
				}, function(errorCode, errorMessage){
					runMainGo(rtCB);
				});
			}else if(dType=='iOS'){
				rtCBPush.push_id = pushID;
				rtCBPush.device_type = 'I';
				httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
//					runMainGo(rtCB);
					var recomendr = getAlopexSession('recomendr');
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
				}, function(errorCode, errorMessage){
					runMainGo(rtCB);
				});
			}else{
//				logf(dType);
//				runMainGo(rtCB);
				rtCBPush.push_id = pushID;
				rtCBPush.device_type = 'A';
				httpSend("putScgcMemberInfo", rtCBPush, function(Mcb){
					var recomendr = getAlopexSession('recomendr');
					console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ sava ['+acc[k-1]+']');
					accRT[k-1] = {'pn':acc[k-1],'result':'true'};
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
				}, function(errorCode, errorMessage){
					runMainGo(rtCB);
				});
			}
//		}
	}else{
		console.log(cb);
//		console.log(rtCB);
		console.log('######################################################################################### error ['+acc[k-1]+']');
		accRT[k-1] = {'pn':acc[k-1],'result':'false'};
		runMainGo();
		
//		navigateGo('MACHP1M0');
	}
}

function runMainGo(rtCB){
	//
//	for(var i=0;i<acc.length;i++){
	if(k < acc.length){
		console.log('###################################################################################################################### next ['+acc[k]+']');
		popPhone(acc[k]);
		k = k+1;
		
	}else{
		console.log('######################################################################################### end complate ################################################################');
		var ctn1 = 0;
		var ctn2 = 0;
		for(var ss = 0;ss<accRT.length;ss++){
			if(accRT[ss].result == 'false'){
				ctn2 = ctn2 + 1;
			}else{
				ctn1 = ctn1 + 1;
			}
		}
		alert('종료\n\n############\n총건수['+accRT.length+']\n\n###########\n성공['+ctn1+']\n\n###########\n실패['+ctn2+']');
	}
		
//	}
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
			var bpInfo = JSON.parse(getAlopexCookie(rtCB.list[0].bpCaList[rtCBNo].regiogroup));
			rtCB.list[0].bpCaList[rtCBNo].lsctn = bpInfo.tel;
			rtCBNo++;
		}
	}
	return rtCB;
}