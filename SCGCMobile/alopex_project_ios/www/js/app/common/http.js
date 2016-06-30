/** * Alopex Runtime의 HTTP 모듈을 이용한 통신 시 사용.
 * 
 * 공통 http 호출 함수, 성공 콜백함수, 에러 콜백함수로 구성
 * 
 */
var http;
var user_successCallback;
var user_errorCallback;
var push_successCallback;
var push_errorCallback;

/**
 * http 공통 호출 함수(Alopex Runtime)
 * 
 * @param (string)serviceId
 * @param (json)jsonParam
 * @param (function)_successCallback
 * @param (function)_errorCallback */
function httpSend(serviceId, jsonParam, _successCallback, _errorCallback){

	//gclee
	logf("\n\nSERVICE ID: >>>>>>>>>>>>>>>>>>>>>>>>\n" + serviceId + "\n>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n");
	
	http = new Http();
	
//	//프로그레스 다이얼로그 실행
//	var progress_option = {
//			"message" : "Loading....",
//			"cancelCallback" : "",
//			"cancelable" : false,
//			"color" : "grey"
//	};
//	nativeUI.showProgressDialog(progress_option);

	//사용자 정의 콜백 함수 등록
	user_successCallback = _successCallback;
	user_errorCallback = _errorCallback;
	
	var entity = {
		"url" : CONSTANTS.CIP_URL,	
//		"url" : CONSTANTS.CIP_TEST_URL,
//		"url" : "http://192.9.112.127:8090/scgc/services/nmp",
		"method" : "POST",
		"onBody" : true,
		"content" : JSON.stringify(jsonParam)
	};
	
	logf("$$request json:" + JSON.stringify(entity));
	
	//헤더 설정
	http.setRequestHeader("service", serviceId);		// 서비스 종류
	http.setRequestHeader("app_id", CONSTANTS.APP_ID);			// 앱 ID
	//http.setRequestHeader("screen_id", CONSTANTS.SCREEN_ID);	// 화면 ID
	
//	var loginId = jsonParam.ZLOGIN;
//	log.log("loginId :: " + loginId);
//	http.setRequestHeader("user_id", loginId);	// 사용자 ID
	
	// 단말 imei값(not available in simulator)
//	if(isAndroid){
//		http.setRequestHeader("imei", device.mobileEquipmentId);	
//	}
	
	http.setTimeout(CONSTANTS.HTTP_TIMEOUT); // HTTP timeout 값 설정 (optional)
	
	http.request(entity, successCallback, errorCallback);
}

/**
 * push(Alopex Runtime)
 * 
 * @param (string)serviceId
 * @param (json)jsonParam
 * @param (function)_successCallback
 * @param (function)_errorCallback
 */
function pushSend(serviceId, jsonParam, _successCallback, _errorCallback){
	
	http = new Http();
	
//	//프로그레스 다이얼로그 실행
//	var progress_option = {
//			"message" : "Loading....",
//			"cancelCallback" : "",
//			"cancelable" : false,
//			"color" : "grey"
//	};
//	nativeUI.showProgressDialog(progress_option);
	
	//사용자 정의 콜백 함수 등록
	push_successCallback = _successCallback;
	push_errorCallback = _errorCallback;
	
	var entity = {
		"url" : CONSTANTS.PUSH_URL,
//		"url" : "http://168.154.182.107:9084/push/services/nmp",
		"method" : "POST",
		"onBody" : true,
		"content" : JSON.stringify(jsonParam)
	};
	
	logf("$$pushSend request json:" + JSON.stringify(entity));
	
	//헤더 설정
	http.setRequestHeader("service", serviceId);		// 서비스 종류
	http.setRequestHeader("app_id", CONSTANTS.PUSH_APP_ID);			// 앱 ID
	//http.setRequestHeader("screen_id", CONSTANTS.SCREEN_ID);	// 화면 ID
	
//	var loginId = jsonParam.ZLOGIN;
//	log.log("loginId :: " + loginId);
//	http.setRequestHeader("user_id", loginId);	// 사용자 ID
	
	// 단말 imei값(not available in simulator)
//	if(isAndroid){
//		http.setRequestHeader("imei", device.mobileEquipmentId);	
//	}
	
	http.setTimeout(CONSTANTS.HTTP_TIMEOUT); // HTTP timeout 값 설정 (optional)
	
	http.request(entity, push_successCallback, push_errorCallback);
}

/**
 * 공통 SuccessCallback 함수
 * @param http
 */
function successCallback(http) {
	
	try{
		var responseData=null;
		
		//프로그레스 다이얼로그 중지
//		nativeUI.dismissProgressDialog();
		
		logf("$$success response:" + http.response);
		
		responseData = JSON.parse(http.response);
		
		//CIP와 인터페이스 정의 필요
		var returnCode = responseData.result;
		var returnMessage = responseData.resultMessage;
		
		//약속된 정상 리턴 코드 명시
		if(returnCode == "1000"){
			user_successCallback(responseData);
		}else{
			logf("Logical Error \nreturnCode :: " + returnCode + "\nreturnMessage :: " + returnMessage); // 임시
			
			// 에러 코드와 에러 메세지를 리턴
			user_errorCallback(returnCode, returnMessage);
		}
	
	}catch(e){
//		nativeUI.dismissProgressDialog();

		var bp;
		var ca;
		try{
			var bpcaInfo = JSON.parse(getMainBPCA());
			bp = bpcaInfo.bp;
			ca = bpcaInfo.ca;
		}catch(e){}
		
		var param = {
    		"mbtlnum" : getAlopexCookie('uPhone'),
    		"bp" : bp,
    		"ca" : ca,
    		"code" : e.code,
    		"message" : e.message,
    		"stack" : e.stack
		};

		httpSend("putJsErrorLog", param, function(response){
			
		}, function(errorCode, errorMessage){});
	}
	
}
/**
 * 공통 ErrorCallback 함수
 * @param http
 */
function errorCallback(http) {
	
	try{
		//프로그레스 다이얼로그 중지
//		nativeUI.dismissProgressDialog();
		
		var errorCode = http.errorCode;
		var errorMessage = http.errorMessage;
		
		loge("errorCode :: " + errorCode + " , errorMessage :: " + errorMessage);
		
		// 에러 코드와 에러 메세지를 리턴
		user_errorCallback(errorCode, errorMessage);
		
	}catch(e){
//		nativeUI.dismissProgressDialog();
		loge("$$ http ErrorCallback error :: " + e);
	}
	
}

var _userDefinedSuccessCallback = null;  // 콜백 함수
var _userDefinedErrorCallback = null;
/**
 * file upload
 * @param customerId 파일 등록해야할 고객 ID
 * @param filePath 파일 경로 
 * @param successCallback HTTP 요청 성공 시 호출되는 콜백함수 
 * @param errorCallback HTTP 요청 실패 시 호출되는 콜백함수 
 */
function httpUploadImage(customerId, filePath, successCallback, errorCallback) {
	_userDefinedSuccessCallback = successCallback;
	_userDefinedErrorCallback = errorCallback;
	
	if(http == null){ // http 오브젝트가 선언되어 있지 않은 경우에만 오브젝트 선언
		http = new Http();
	}
	// 프로그래스 바 로드 
	var progress_option = {
			"message" : "파일 등록중...",
			"cancelCallback" : "progressCancelCallback",
			"cancelable" : true,
			"color" : "grey"
	};
	nativeUI.showProgressDialog(progress_option);
	
	// 서버 URL 설정 및 parameter 설
	var entity = {
			 "url" : CONSTANTS.UPLOAD_URL,
			 "filePath" : filePath
			};
	
	// HTTP 헤더 값 설정 
	http.setRequestHeader("customerId", customerId);
	http.setRequestHeader("device_id", device.deviceId);
	
	// 파일 업로드 // 4번쨰, 5번쨰 인자는 프로그래스 진행 보여주는 콜백함수이나 여기서는 사용하지 않음. 
	http.upload(entity, _httpUploadSuccessCallback, _httpErrorCallback, function(){}, function(){});
}

function _httpUploadSuccessCallback() {
	nativeUI.dismissProgressDialog();
	_userDefinedSuccessCallback();
}

/**
 * 프로그래스 바 로딩 중 "취소" 버튼 클릭 시 처리해주는 함수 
 * 기능 : 프로그래스 언로드, HTTP 요청 취
 */
function progressCancelCallback() {
	nativeUI.dismissProgressDialog();
	http.cancelRequest();
}

/**
 * 각 화면에 정의된 error 콜백함수 실행 전 처리 
 * 기능 : 에러 메세지를 출력하고, 유저가 정의한 에러콜백을 호출한다.
 * @param errorObj (json type)
 */
function _httpErrorCallback(errorObj) { 
	_httpErrorMsgProcess(errorObj);
	_userDefinedErrorCallback();
	nativeUI.dismissProgressDialog();
}

/**
 * 에러메세지 처리해 주는 함수 
 * @param errorObj (json type) 에러 정보를 가지고 있는 오브젝트 
 */
function _httpErrorMsgProcess(errorObj) {
	if( errorObj.resultMessage ) {
		alert("서버 처리 중 오류가 발생하였습니다\n\n" + errorObj.resultMessage);
	} else {
		alert("서버와 통신중 오류가 발생하였습니다");
	}
}
