/**
 * PUSH ID 생성
 * @param flag 요청페이지별 분기
 */
var pushFlag = '';

function getRegistrationId(flag){
	pushFlag = flag;
	if(device.platformName == "Android"){
		pushNotification.register(CONSTANTS.senderId);
		if(flag == 'Main'){
			//gclee lsc
//			runDB();
		}
	}else if(device.osName == "iOS"){
		jsniCaller.invoke("PushService.usePushService","usePushServiceCallBack");
	}else{
		if(flag == 'Main'){
			//gclee lsc
//			runDB();
		}
	}
}

function usePushServiceCallBack(flag){
	logf("###################usePushServiceCallBack");
	logf(flag);
	jsniCaller.invoke("PushService.getPushToken","getPushTokenCallBack");
	if(pushFlag == 'Main'){
		//gclee lsc
//		runDB();
	}
}

function getPushTokenCallBack(flag){
	logf("###################getPushTokenCallBack");
	logf(flag);
}

function savePushId(flag){
	pushNotification.getRegistrationId(function(regId){
		logf("Registration Id : " + regId);
		logf("Registration Id : " + regId);
		var pushID = '';
		if(regId != null) {
			logf("획득한 Registration Id(Device token)를 3rd-party Server에 등록합니다.  : " + regId);
			pushID = regId;
			setAlopexCookie("pushID",regId);
			var pn = getAlopexCookie('uPhone');
			if(pn == 'undefined'){
				if(flag == 'Main'){
					runMain();
				}
			}else{
				var dType = device.osName;
				if(dType=='Android'){
					pushRegister(pn,'A',pushID, flag);
				}else if(dType=='iOS'){
					//gclee ios
					//pushRegister(pn,'I',pushID, flag);
					if(flag == 'Main'){
						runMain();
					}
				}else{
					logf('###기타');
				}
			}
		} else {
			pushID = getAlopexCookie("pushID");
			if(isNullCheck(pushID)){
				logf("pushID가 없습니다.");
				pushID = "";
			}
			if(flag == 'Main'){
				runMain();
			}
		}
		logf('pushID :: '+pushID);
	});
}

/**
 * PUSH ID 서버에 저장하기
 * @param deviceId
 * @param os
 * @param pushId
 */
function pushRegister(deviceId, os, pushId, flag) {	
	var param = {
		"appIdentifier" : CONSTANTS.APP_IDENTIFIER,
		"deviceId" : deviceId,
		"os" : os,
		"pushId": pushId
	};

	pushSend("pushRegister", param, function(event){
		logf('ok pushRegister');
		if(flag == 'Main'){
			runMain();
		}
	}, function(event){
		loge('error pushRegister');
		if(flag == 'Main'){
			runMain();
		}
	});
}

/**
 * 서버에서 삭제
 * @param deviceId
 */
function pushUnregister(deviceId) {	
	var param = {
		"appIdentifier" : CONSTANTS.APP_IDENTIFIER,
		"deviceId" : deviceId,
		"os" : os
	};

	pushSend("pushUnregister", param, httpSuccessCallback_push, httpErrorCallback_push);
	
}

/**
 * 푸위 ON / OFF
 * @param deviceId
 * @param useYN
 * @param os
 */
function pushSwitch(deviceId,useYN,os) {	
	var param = {
		"appIdentifier" : CONSTANTS.APP_IDENTIFIER,
		"deviceId" : deviceId,
		"useYN": useYN, 
		"os" : os
			
	};

	pushSend("pushSwitch", param, httpSuccessCallback_push, httpErrorCallback_push);
	
}

/**
 * SuccessCallBack 공통
 * @param calb
 */
function httpSuccessCallback_push(calb){
	logf("push $$success response:" + calb.response);
}

/**
 * ErrorCallBack 공통
 * @param calb
 */
function httpErrorCallback_push(calb){
	var errorCode = calb.errorCode;
	var errorMessage = calb.errorMessage;
	
	loge("push errorCode :: " + errorCode + " , errorMessage :: " + errorMessage);
}